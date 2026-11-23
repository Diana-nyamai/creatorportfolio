import "server-only";
import { createHash } from "node:crypto";
import { site } from "@/data/site-config";
import type { Inquiry } from "./inquiry";

function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  return apiKey && from ? { apiKey, from, to } : null;
}

export function hasEmailDelivery() {
  return Boolean(emailConfig());
}

export async function deliverInquiry(inquiry: Inquiry, submissionId: string) {
  const configuration = emailConfig();
  if (!configuration) return "unconfigured";

  const { name, email, company, type, details, budget } = inquiry;
  const key = createHash("sha256").update(submissionId + JSON.stringify(inquiry)).digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-contact/${key}`,
      },
      body: JSON.stringify({
        from: configuration.from,
        to: [configuration.to],
        reply_to: email,
        subject: `Portfolio inquiry · ${type}`,
        text: [`Name: ${name}`, `Email: ${email}`, `Brand / Company: ${company}`, `Collaboration type: ${type}`, `Budget: ${budget || "Not provided"}`, "", details].join("\n"),
      }),
      signal: AbortSignal.timeout(7_000),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
