"use server";

import { validateLead, type LeadState } from "@/lib/leads";
import { site } from "@/content/site";

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

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error(
      "[optech:lead] email delivery is not configured; set RESEND_API_KEY and RESEND_FROM_EMAIL",
    );

    return {
      status: "error",
      message: "",
      errors: {
        form: `We couldn't send your message right now. Please email ${site.email} directly.`,
      },
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [site.email],
        reply_to: data.email,
        subject: "New contact form submission — OPTECH",
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "Not provided"}`,
          `Project type: ${data.projectType || "Not provided"}`,
          `Budget: ${data.budget || "Not provided"}`,
          "",
          "Message:",
          data.message,
          "",
          `Submitted at: ${data.submittedAt}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Resend responded ${response.status}`);
    }
  } catch (error) {
    console.error("[optech:lead] email delivery failed", error);

    return {
      status: "error",
      message: "",
      errors: {
        form: `We couldn't send your message right now. Please email ${site.email} directly.`,
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
