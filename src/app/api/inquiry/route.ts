/**
 * Receives the patient / surgeon inquiry forms.
 *
 * Delivery is intentionally pluggable: set INQUIRY_WEBHOOK_URL to any endpoint
 * that accepts JSON (Zapier, Make, Formspree, a CRM, an email service, …).
 * Until it is set this returns 503, and the form shows the phone/WhatsApp
 * fallback instead of pretending the message was sent.
 */

const MAX_FIELD_LENGTH = 5000;

type Payload = {
  form: "patient" | "surgeon";
  fields: Record<string, string | string[]>;
};

function isPayload(value: unknown): value is Payload {
  if (!value || typeof value !== "object") return false;
  const { form, fields } = value as Record<string, unknown>;
  if (form !== "patient" && form !== "surgeon") return false;
  if (!fields || typeof fields !== "object") return false;
  return Object.values(fields).every((v) =>
    Array.isArray(v)
      ? v.every((s) => typeof s === "string" && s.length <= MAX_FIELD_LENGTH)
      : typeof v === "string" && v.length <= MAX_FIELD_LENGTH,
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (!isPayload(body)) {
    return Response.json({ ok: false, error: "Invalid inquiry." }, { status: 400 });
  }

  const email = body.fields.email;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      { ok: false, error: "Inquiry delivery is not configured." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...body, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
