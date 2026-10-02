import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { deliverLead, leadsConfigured } from "@/lib/leads";

// Simple per-instance rate limit. Cloud Run may run several instances, so this is a soft guard only.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled: pretend success so bots learn nothing.
    if ((body as { website?: string })?.website) return NextResponse.json({ ok: true });
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return NextResponse.json({ error: "Please check the form", fieldErrors }, { status: 422 });
  }

  if (!leadsConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[dev] quote lead (no delivery configured):", parsed.data);
      return NextResponse.json({ ok: true });
    }
    console.error("Lead delivery is not configured");
    return NextResponse.json({ error: "We could not take your request. Please call us." }, { status: 503 });
  }

  const ok = await deliverLead(parsed.data);
  if (!ok) return NextResponse.json({ error: "We could not take your request. Please call us." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
