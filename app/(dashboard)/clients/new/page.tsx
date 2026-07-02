"use client";

import Link from "next/link";
import { useState } from "react";

type Errors = { name?: string; email?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // Mock persistence — Module 6 wires this to Supabase.
    setSaved(true);
  }

  if (saved) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">New client</h1>
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/30">
          <p className="text-sm text-green-700 dark:text-green-300">
            Saved <strong>{name}</strong> ({email}). In this local build the data
            isn’t persisted yet — Module 6 connects Supabase.
          </p>
          <Link
            href="/clients"
            className="mt-4 inline-block text-sm font-medium underline"
          >
            Back to clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">New client</h1>
      <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-5">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            placeholder="Acme Co"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            placeholder="hi@acme.com"
          />
        </Field>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
          >
            Save client
          </button>
          <Link href="/clients" className="text-sm text-gray-500 hover:text-foreground">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
