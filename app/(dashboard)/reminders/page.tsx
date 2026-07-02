import { createClient } from "@/lib/supabase/server";
import { buildReminderQueue } from "@/lib/reminders";
import { Invoice } from "@/types/invoice";
import { Client } from "@/types/client";
import { ApprovalQueue } from "./approval-queue";

// Module 10 — agent workflow: fetch overdue invoices (tool), draft a reminder
// (AI step), then require human approval before anything is "sent". Now runs on
// the signed-in user's live invoices/clients (RLS-scoped).
export default async function RemindersPage() {
  const supabase = await createClient();

  const [{ data: invoiceRows }, { data: clientRows }] = await Promise.all([
    supabase
      .from("invoices")
      .select("id, clientId:client_id, amount, status, dueDate:due_date"),
    supabase.from("clients").select("id, name, email"),
  ]);

  const invoices = (invoiceRows ?? []) as unknown as Invoice[];
  const clients = (clientRows ?? []) as Client[];
  const drafts = buildReminderQueue(invoices, (id) =>
    clients.find((c) => c.id === id),
  );

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Overdue reminders
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Drafted automatically from overdue invoices. Nothing is sent without your
        approval.
      </p>
      <ApprovalQueue drafts={drafts} />
    </div>
  );
}
