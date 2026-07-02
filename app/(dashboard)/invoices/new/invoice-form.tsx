"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Client } from "@/types/client";
import { InvoiceStatus } from "@/types/invoice";
import { createInvoiceAction } from "../actions";

type Errors = { clientId?: string; amount?: string; dueDate?: string };

const STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];

export function InvoiceForm({ clients }: { clients: Client[] }) {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<InvoiceStatus>("draft");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

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
    setServerError(null);
    startTransition(async () => {
      const result = await createInvoiceAction({
        clientId,
        amount: Number(amount),
        status,
        dueDate,
      });
      if (result?.error) setServerError(result.error);
    });
  }

  return (
    <>
      {serverError && (
        <div className="mb-4 max-w-md rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {serverError}
        </div>
      )}
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
            disabled={pending}
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save invoice"}
          </button>
          <Link href="/invoices" className="text-sm text-gray-500 hover:text-foreground">
            Cancel
          </Link>
        </div>
      </form>
    </>
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
