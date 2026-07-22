"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SECTORS, STAGES } from "@/lib/constants";

type FieldErrors = Record<string, string[] | undefined>;

export function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      startupName: String(data.get("startupName") ?? ""),
      tagline: String(data.get("tagline") ?? ""),
      sector: String(data.get("sector") ?? ""),
      description: String(data.get("description") ?? ""),
      impact: String(data.get("impact") ?? ""),
      traction: String(data.get("traction") ?? ""),
      stage: String(data.get("stage") ?? ""),
      fundingGoal: String(data.get("fundingGoal") ?? ""),
      location: String(data.get("location") ?? ""),
      website: String(data.get("website") ?? ""),
      founderName: String(data.get("founderName") ?? ""),
      founderEmail: String(data.get("founderEmail") ?? ""),
    };

    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        const { idea } = await res.json();
        router.push(`/ideas/${idea.id}?welcome=1`);
        return;
      }

      if (res.status === 422) {
        const body = await res.json();
        setFieldErrors(body.details?.fieldErrors ?? {});
        setError("Please fix the highlighted fields and try again.");
      } else {
        setError("Something went wrong submitting your idea. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Field
        label="Startup name *"
        name="startupName"
        placeholder="e.g. SolarLeaf"
        errors={fieldErrors.startupName}
      />
      <Field
        label="Tagline *"
        name="tagline"
        placeholder="One sentence that captures your idea"
        errors={fieldErrors.tagline}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Sector *"
          name="sector"
          options={SECTORS}
          errors={fieldErrors.sector}
        />
        <SelectField
          label="Stage *"
          name="stage"
          options={STAGES}
          errors={fieldErrors.stage}
        />
      </div>

      <TextAreaField
        label="Description *"
        name="description"
        rows={5}
        placeholder="What are you building? What problem does it solve, and for whom? (min. 40 characters)"
        errors={fieldErrors.description}
      />

      <TextAreaField
        label="Impact & edge *"
        name="impact"
        rows={3}
        placeholder="What measurable impact will this have — environmental, social, or market — and what makes it defensible?"
        errors={fieldErrors.impact}
      />

      <TextAreaField
        label="Traction (optional)"
        name="traction"
        rows={2}
        placeholder="Revenue, users, pilots, LOIs, growth rate — whatever shows real momentum. Strongly recommended for early-stage raises."
        errors={fieldErrors.traction}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Funding sought (USD) *"
          name="fundingGoal"
          type="number"
          placeholder="e.g. 750000"
          errors={fieldErrors.fundingGoal}
        />
        <Field
          label="Location *"
          name="location"
          placeholder="City, Country"
          errors={fieldErrors.location}
        />
      </div>

      <Field
        label="Website (optional)"
        name="website"
        type="url"
        placeholder="https://…"
        errors={fieldErrors.website}
      />

      <hr className="border-brand-100" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Founder name *"
          name="founderName"
          placeholder="Your full name"
          errors={fieldErrors.founderName}
        />
        <Field
          label="Founder email *"
          name="founderEmail"
          type="email"
          placeholder="you@startup.com"
          errors={fieldErrors.founderEmail}
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Registering…" : "Register idea"}
        </button>
        <p className="text-xs text-brand-500">
          Your email is shown to investors who want to reach out.
        </p>
      </div>
    </form>
  );
}

function ErrorText({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="field-input"
      />
      <ErrorText errors={errors} />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  rows,
  placeholder,
  errors,
}: {
  label: string;
  name: string;
  rows: number;
  placeholder?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="field-input"
      />
      <ErrorText errors={errors} />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  errors,
}: {
  label: string;
  name: string;
  options: readonly string[];
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <select id={name} name={name} defaultValue="" className="field-input">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorText errors={errors} />
    </div>
  );
}
