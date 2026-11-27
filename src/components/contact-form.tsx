"use client";

import { useRef, useState, type FormEvent } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { collaborationTypes, inquiryFields, validateInquiry, type InquiryErrors, type InquiryField, type InquiryResponse } from "@/lib/inquiry";
import { SpringButton } from "./motion/spring-action";
import { site } from "@/data/site-config";

function draftUrl(values: ReturnType<typeof validateInquiry>["values"]) {
  const body = [
    `Name: ${values.name}`, `Email: ${values.email}`, `Brand / Company: ${values.company}`,
    values.budget ? `Budget: ${values.budget}` : "", "", values.details,
  ].join("\r\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Collaboration inquiry · ${values.type}`)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ available }: { available: boolean }) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [result, setResult] = useState<InquiryResponse | null>(null);
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const submission = useRef<string>(null);
  const sending = useRef(false);

  function focusError(form: HTMLFormElement, fieldErrors: InquiryErrors) {
    const key = (Object.keys(inquiryFields) as InquiryField[]).find((name) => fieldErrors[name]);
    if (key) (form.elements.namedItem(key) as HTMLElement | null)?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const { values, errors: fieldErrors, trap } = validateInquiry(Object.fromEntries(new FormData(form)));
    setErrors(fieldErrors);
    setResult(null);
    setDraft(null);

    if (Object.keys(fieldErrors).length) {
      setResult({ ok: false, message: "Check the highlighted fields." });
      focusError(form, fieldErrors);
      return;
    }

    if (!available) {
      setDraft(draftUrl(values));
      return;
    }

    sending.current = true;
    setPending(true);
    try {
      submission.current ??= crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Submission-Id": submission.current },
        body: JSON.stringify({ ...values, website: trap }),
      });
      const next: InquiryResponse = await response.json();
      setResult(next);
      if (response.ok && next.ok) {
        form.reset();
        submission.current = null;
      } else if (!next.ok && next.errors) {
        setErrors(next.errors);
        focusError(form, next.errors);
      }
    } catch {
      setResult({ ok: false, message: "Your inquiry couldn’t be sent. Try again or email me directly." });
    } finally {
      sending.current = false;
      setPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} onChange={() => setDraft(null)} noValidate>
      <div className="form-grid">
        {(Object.keys(inquiryFields) as InquiryField[]).map((key) => {
          const field = inquiryFields[key];
          const props = {
            id: `inquiry-${key}`, name: key, required: field.min > 0,
            "aria-invalid": Boolean(errors[key]), "aria-describedby": errors[key] ? `error-${key}` : undefined,
          };
          return (
            <div className={`form-field ${key === "details" || key === "budget" ? "form-wide" : ""}`} key={key}>
              <label htmlFor={props.id}>{field.label}</label>
              {key === "type" ? <div className="select-wrap">
                <select {...props} defaultValue=""><option value="" disabled>Choose one</option>
                  {collaborationTypes.map((type) => <option key={type}>{type}</option>)}
                </select><ChevronDown size={17} aria-hidden="true" /></div> :
                key === "details" ? <textarea {...props} maxLength={field.max} rows={4} /> :
                <input {...props} maxLength={field.max} type={key === "email" ? "email" : "text"}
                  autoComplete={{ name: "name", email: "email", company: "organization", budget: "off" }[key]} />}
              {errors[key] && <p className="field-error" id={`error-${key}`}>{errors[key]}</p>}
            </div>
          );
        })}
      </div>
      <div hidden><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-actions">
        <SpringButton className="button button-primary" disabled={pending}>{pending ? "Sending…" : available ? "Send inquiry" : "Prepare email"} <Heart size={15} aria-hidden="true" /></SpringButton>
        {!available && <p className="delivery-note">Web delivery is pending setup. <a href={`mailto:${site.email}`}>Email me directly</a>.</p>}
      </div>
      {draft && <p className="form-feedback" data-ok="true" role="status"><a href={draft}>Open your email draft</a> to send the inquiry.</p>}
      {result && <p className="form-feedback" data-ok={result.ok} role={result.ok ? "status" : "alert"}>{result.message}</p>}
    </form>
  );
}
