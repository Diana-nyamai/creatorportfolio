import { deliverInquiry } from "@/lib/deliver-inquiry";
import { validateInquiry, type InquiryResponse } from "@/lib/inquiry";
import { productionOrigin } from "@/lib/origin";

function reply(data: InquiryResponse, status: number) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function acceptsOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin || origin === new URL(request.url).origin || origin === productionOrigin()) return true;

  try {
    // Next may normalize the request URL to localhost when running on loopback.
    const caller = new URL(origin);
    return ["https:", "http:"].includes(caller.protocol) &&
      origin === caller.origin && caller.host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function readInquiry(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing request body");

  const decoder = new TextDecoder();
  let size = 0;
  let json = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 24_000) {
      await reader.cancel();
      throw new Error("Request body too large");
    }
    json += decoder.decode(value, { stream: true });
  }
  return JSON.parse(json + decoder.decode()) as unknown;
}

export async function POST(request: Request) {
  if (!acceptsOrigin(request)) {
    return reply({ ok: false, message: "Please submit your inquiry from the portfolio." }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return reply({ ok: false, message: "The form data could not be read." }, 415);
  }

  let body: unknown;
  try {
    body = await readInquiry(request);
  } catch {
    return reply({ ok: false, message: "The form data could not be read." }, 400);
  }

  const { values, errors, trap } = validateInquiry(body);
  if (trap) return reply({ ok: false, message: "The form could not be submitted. Please email me directly." }, 400);
  if (Object.keys(errors).length) return reply({ ok: false, errors, message: "Check the highlighted fields." }, 422);

  const submissionId = request.headers.get("x-submission-id") ?? "";
  if (!/^[a-f\d-]{36}$/i.test(submissionId)) {
    return reply({ ok: false, message: "Please reload the form and try again." }, 400);
  }

  const result = await deliverInquiry(values, submissionId);
  if (result === "unconfigured") return reply({ ok: false, message: "Web delivery isn’t set up yet. Please email me directly." }, 503);
  if (result === "failed") return reply({ ok: false, message: "Your inquiry couldn’t be sent. Try again or email me directly." }, 502);
  return reply({ ok: true, message: "Thanks, your inquiry was sent! I’ll get back to you by email." }, 200);
}
