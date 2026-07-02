"use client";

import Link from "next/link";
import { useState } from "react";
import { clients } from "@/lib/mock-data";
import { InvoiceStatus } from "@/types/invoice";

type Errors = { clientId?: string; amount?: string; dueDate?: string };

const STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];

export default function NewInvoicePage() {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<InvoiceStatus>("draft");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!clientId) next.clientId = "Choose a client.";
    const amt = Number(amount);
    if (!amount.trim()) next.amount = "Amount is required.";
    else if (Number.isNaN(amt) || amt <= 0) next.amount = "Enter a positive amount.";
    if (!dueDate) next.dueDate = "Due date is required.";
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
    const clientName = clients.find((c) => c.id === clientId)?.name ?? "client";
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">New invoice</h1>
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/30">
          <p className="text-sm text-green-700 dark:text-green-300">
            Created a <strong>${amount}</strong> {status} invoice for{" "}
            <strong>{clientName}</strong>. Not persisted in this local build —
            Module 6 connects Supabase.
          </p>
          <Link
            href="/invoices"
            className="mt-4 inline-block text-sm font-medium underline"
          >
            Back to invoices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">New invoice</h1>
      <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-5">
        <Field label="Client" error={errors.clientId}>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
          >
            <option value="">Select a client…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Amount (USD)" error={errors.amount}>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
            placeholder="1200"
          />
        </Field>

        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm capitalize outline-none focus:border-foreground dark:border-white/15"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Due date" error={errors.dueDate}>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/15"
          />
        </Field>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
          >
            Save invoice
          </button>
          <Link href="/invoices" className="text-sm text-gray-500 hover:text-foreground">
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
