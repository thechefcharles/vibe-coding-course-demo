import { buildReminderQueue } from "@/lib/reminders";
import { ApprovalQueue } from "./approval-queue";

// Module 10 — agent workflow: fetch overdue invoices (tool), draft a reminder
// (AI step), then require human approval before anything is "sent".
export default function RemindersPage() {
  const drafts = buildReminderQueue();
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
