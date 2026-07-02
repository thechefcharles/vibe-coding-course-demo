import { Invoice } from "@/types/invoice";
import { Client } from "@/types/client";
import { invoices, getClient } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";

export type ReminderDraft = {
  invoiceId: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  body: string;
};

/** Step 1 — the "tool": fetch invoices that need chasing. */
export function getOverdueInvoices(all: Invoice[] = invoices): Invoice[] {
  return all.filter((inv) => inv.status === "overdue");
}

/**
 * Step 2 — the "AI draft" step. This is a deterministic template for the local
 * build (no API key needed). Module 10's lesson swaps this for a real call to
 * the Claude API — the signature stays the same so the approval-queue UI and
 * tests don't change.
 */
export function draftReminder(invoice: Invoice, client: Client): ReminderDraft {
  const amount = formatCurrency(invoice.amount);
  const due = formatDate(invoice.dueDate);
  return {
    invoiceId: invoice.id,
    clientName: client.name,
    clientEmail: client.email,
    subject: `Payment reminder: invoice #${invoice.id} (${amount})`,
    body:
      `Hi ${client.name},\n\n` +
      `Our records show invoice #${invoice.id} for ${amount} was due on ${due} ` +
      `and is now overdue. When you have a moment, could you arrange payment?\n\n` +
      `If you've already paid, please disregard this note.\n\n` +
      `Thanks,\nInvoice Tracker`,
  };
}

/**
 * Build the full approval queue: one draft per overdue invoice.
 * `resolveClient` defaults to the mock lookup (used by tests); the live
 * reminders page passes a resolver built from Supabase-fetched clients.
 */
export function buildReminderQueue(
  all: Invoice[] = invoices,
  resolveClient: (id: string) => Client | undefined = getClient,
): ReminderDraft[] {
  return getOverdueInvoices(all)
    .map((inv) => {
      const client = resolveClient(inv.clientId);
      return client ? draftReminder(inv, client) : null;
    })
    .filter((d): d is ReminderDraft => d !== null);
}
