import { services } from "@/data/site-config";

export const inquiryFields = {
  name: { label: "Name", min: 2, max: 100 },
  email: { label: "Email", min: 3, max: 254 },
  company: { label: "Brand / Company", min: 2, max: 120 },
  type: { label: "Collaboration type", min: 1, max: 80 },
  details: { label: "Project details", min: 10, max: 3000 },
  budget: { label: "Budget (optional)", min: 0, max: 100 },
} as const;

export type InquiryField = keyof typeof inquiryFields;
export type Inquiry = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;
export const collaborationTypes = [...services, "Something else"];

export function validateInquiry(input: unknown) {
  const fields = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const values = {} as Inquiry;
  const errors: InquiryErrors = {};

  for (const key of Object.keys(inquiryFields) as InquiryField[]) {
    const { min, max, label } = inquiryFields[key];
    const field = fields[key];
    const value = typeof field === "string" ? field.trim() : "";
    values[key] = value;

    if (!value && min) errors[key] = `Enter your ${label.toLowerCase()}.`;
    else if (value.length < min) errors[key] = `Enter at least ${min} characters.`;
    else if (value.length > max) errors[key] = `Use ${max} characters or fewer.`;
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!errors.type && !collaborationTypes.some((type) => type === values.type)) errors.type = "Choose a collaboration type.";
  return { values, errors, trap: fields.website };
}

export type InquiryResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: InquiryErrors };
