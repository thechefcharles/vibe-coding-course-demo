import { Client } from "@/types/client";
import { Invoice } from "@/types/invoice";

// Mock data for the local (pre-Supabase) build. Modules 6+ swap these for
// live, per-user database queries.
export const clients: Client[] = [
  { id: "1", name: "Acme Co", email: "hi@acme.com" },
  { id: "2", name: "Globex", email: "team@globex.com" },
  { id: "3", name: "Initech", email: "ap@initech.com" },
];

export const invoices: Invoice[] = [
  { id: "1001", clientId: "1", amount: 1200, status: "paid", dueDate: "2026-05-01" },
  { id: "1002", clientId: "2", amount: 800, status: "sent", dueDate: "2026-07-15" },
  { id: "1003", clientId: "1", amount: 450, status: "overdue", dueDate: "2026-06-10" },
  { id: "1004", clientId: "3", amount: 2600, status: "draft", dueDate: "2026-08-01" },
];

export function getClient(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}
