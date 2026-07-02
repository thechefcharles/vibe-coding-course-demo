import { describe, it, expect } from "vitest";
import {
  getOverdueInvoices,
  draftReminder,
  buildReminderQueue,
} from "@/lib/reminders";
import { invoices, getClient } from "@/lib/mock-data";

describe("getOverdueInvoices", () => {
  it("returns only overdue invoices", () => {
    const overdue = getOverdueInvoices();
    expect(overdue.length).toBeGreaterThan(0);
    expect(overdue.every((i) => i.status === "overdue")).toBe(true);
  });
});

describe("draftReminder", () => {
  it("addresses the client and mentions the amount", () => {
    const inv = invoices.find((i) => i.status === "overdue")!;
    const client = getClient(inv.clientId)!;
    const draft = draftReminder(inv, client);
    expect(draft.body).toContain(client.name);
    expect(draft.subject).toContain(`#${inv.id}`);
    expect(draft.clientEmail).toBe(client.email);
  });
});

describe("buildReminderQueue", () => {
  it("builds one resolvable draft per overdue invoice", () => {
    const queue = buildReminderQueue();
    expect(queue.length).toBe(getOverdueInvoices().length);
    expect(queue.every((d) => d.clientName && d.clientEmail)).toBe(true);
  });
});
