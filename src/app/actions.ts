"use server";

import { validateLead, type LeadState } from "@/lib/leads";

/**
 * Very small in-memory rate limiter.
 *
 * Enough to blunt casual abuse of a public Server Action in a single-instance
 * deployment. A multi-region deployment should swap this for a shared store
 * (Upstash/Redis) — the interface below is intentionally easy to replace.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: a field hidden from humans. Bots fill it, so we fail silently
  // with a success response rather than telling them what gave them away.
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.trim() !== "") {
    return {
      status: "success",
      message: "Thanks — we'll be in touch within one business day.",
      errors: {},
      values,
    };
  }

  if (rateLimited(values.email.trim().toLowerCase() || "anonymous")) {
    return {
      status: "error",
      message: "",
      errors: {
        form: "Too many submissions in a short window. Please try again in a minute.",
      },
      values,
    };
  }

  const { errors, data } = validateLead(values);

  if (!data) {
    return {
      status: "error",
      message: "",
      errors,
      values,
    };
  }

  try {
    // Delivery. A webhook keeps this deployment-agnostic — point
    // LEAD_WEBHOOK_URL at Slack, Zapier, a CRM, or your own endpoint.
    const webhook = process.env.LEAD_WEBHOOK_URL;

    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded ${response.status}`);
      }
    } else {
      // No webhook configured (e.g. local dev): log so the lead is never lost.
      console.info("[optech:lead]", JSON.stringify(data));
    }
  } catch (error) {
    console.error("[optech:lead] delivery failed", error);

    return {
      status: "error",
      message: "",
      errors: {
        form: "Something went wrong on our end. Please email hello@optechlabs.com and we'll pick it up straight away.",
      },
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll be in touch within one business day.",
    errors: {},
    values,
  };
}
