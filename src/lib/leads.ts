import type { QuoteInput } from "./quote";

type Lead = Omit<QuoteInput, "website" | "consent"> & { receivedAt: string; source: string };

export function leadsConfigured() {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL) || process.env.SHEETS_WEBHOOK_URL,
  );
}

async function sendEmail(lead: Lead) {
  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_TO_EMAIL || !LEAD_FROM_EMAIL) return null;
  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL,
      to: LEAD_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: lead.email || undefined,
      subject: `New quote request: ${lead.name} (${lead.city})`,
      text: rows,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  return true;
}

async function appendToSheet(lead: Lead) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain" }, // Apps Script web apps accept this without a CORS preflight
    body: JSON.stringify({ ...lead, secret: process.env.SHEETS_WEBHOOK_SECRET }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Sheets ${res.status}`);
  return true;
}

// Succeeds if at least one channel stored the lead.
export async function deliverLead(input: QuoteInput) {
  const { website: _w, consent: _c, ...rest } = input;
  void _w;
  void _c;
  const lead: Lead = { ...rest, receivedAt: new Date().toISOString(), source: "website-quote-form" };
  const results = await Promise.allSettled([sendEmail(lead), appendToSheet(lead)]);
  const ok = results.some((r) => r.status === "fulfilled" && r.value === true);
  results.forEach((r) => r.status === "rejected" && console.error("Lead delivery failed:", r.reason));
  return ok;
}
