export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type Invoice = {
  id: string;
  clientId: string;
  /** Amount in whole US dollars (mock data keeps it simple). */
  amount: number;
  status: InvoiceStatus;
  /** ISO date string, e.g. "2026-06-15". */
  dueDate: string;
};
