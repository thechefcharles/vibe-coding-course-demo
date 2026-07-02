"use client";

import { useState } from "react";
import { ReminderDraft } from "@/lib/reminders";

type Decision = "pending" | "sent" | "skipped";

export function ApprovalQueue({ drafts }: { drafts: ReminderDraft[] }) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    () => Object.fromEntries(drafts.map((d) => [d.invoiceId, "pending"])),
  );

  function decide(id: string, decision: Decision) {
    // Mock send — nothing leaves the app. Module 12 wires a real send behind
    // this same human-approval gate.
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  }

  if (drafts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/15 p-10 text-center dark:border-white/15">
        <h2 className="text-base font-medium">Nothing to chase</h2>
        <p className="mt-1 text-sm text-gray-500">
          No overdue invoices right now. 🎉
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {drafts.map((d) => {
        const decision = decisions[d.invoiceId];
        return (
          <li
            key={d.invoiceId}
            className="rounded-lg border border-black/10 p-5 dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{d.subject}</p>
                <p className="text-xs text-gray-500">
                  To {d.clientName} &lt;{d.clientEmail}&gt;
                </p>
              </div>
              {decision === "pending" ? (
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => decide(d.invoiceId, "sent")}
                    className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
                  >
                    Approve &amp; send
                  </button>
                  <button
                    onClick={() => decide(d.invoiceId, "skipped")}
                    className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    Skip
                  </button>
                </div>
              ) : (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    decision === "sent"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {decision === "sent" ? "Sent (mock)" : "Skipped"}
                </span>
              )}
            </div>
            <pre className="mt-3 whitespace-pre-wrap rounded-md bg-black/5 p-3 text-xs text-gray-700 dark:bg-white/5 dark:text-gray-300">
              {d.body}
            </pre>
          </li>
        );
      })}
    </ul>
  );
}
