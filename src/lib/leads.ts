import { projectTypes, budgetRanges } from "@/content/site";

export type LeadFieldErrors = Partial<
  Record<"name" | "email" | "projectType" | "budget" | "message" | "form", string>
>;

export type LeadState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: LeadFieldErrors;
  /** Echoed back so the form can repopulate after a failed submit. */
  values: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    message: string;
  };
};

export const emptyLeadState: LeadState = {
  status: "idle",
  message: "",
  errors: {},
  values: {
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  },
};

/**
 * Pragmatic email check.
 *
 * Deliberately not RFC 5322 — over-strict patterns reject valid addresses and
 * cost real leads. This catches typos and obvious junk; genuine verification
 * happens when the confirmation email is delivered.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type ValidatedLead = LeadState["values"] & { submittedAt: string };

export function validateLead(raw: LeadState["values"]): {
  errors: LeadFieldErrors;
  data?: ValidatedLead;
} {
  const errors: LeadFieldErrors = {};

  const name = raw.name.trim();
  const email = raw.email.trim();
  const company = raw.company.trim();
  const message = raw.message.trim();

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (name.length > 100) {
    errors.name = "That name is unusually long — please shorten it.";
  }

  if (!email) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL.test(email) || email.length > 200) {
    errors.email = "That email address does not look right.";
  }

  if (raw.projectType && !projectTypes.includes(raw.projectType as never)) {
    errors.projectType = "Please choose one of the listed options.";
  }

  if (raw.budget && !budgetRanges.includes(raw.budget as never)) {
    errors.budget = "Please choose one of the listed options.";
  }

  if (message.length < 10) {
    errors.message = "Tell us a little more — at least a sentence.";
  } else if (message.length > 4000) {
    errors.message = "Please keep this under 4000 characters.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors: {},
    data: {
      name,
      email,
      company,
      projectType: raw.projectType,
      budget: raw.budget,
      message,
      submittedAt: new Date().toISOString(),
    },
  };
}
