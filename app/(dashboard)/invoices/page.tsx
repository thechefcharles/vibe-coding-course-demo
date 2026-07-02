import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate, statusStyles } from "@/lib/format";
import { InvoiceStatus } from "@/types/invoice";

type InvoiceRow = {
  id: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  client: { name: string } | null;
};

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("id, amount, status, dueDate:due_date, client:clients(name)")
    .order("due_date", { ascending: true });

  const invoices = (data ?? []) as unknown as InvoiceRow[];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
        <Link
          href="/invoices/new"
          className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          New invoice
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-red-600">Couldn’t load invoices.</p>
      ) : invoices.length === 0 ? (
        <div className="rounded-lg border border-dashed border-black/15 p-10 text-center dark:border-white/15">
          <h2 className="text-base font-medium">No invoices yet</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create an invoice for one of your clients.
          </p>
        </div>
      ) : (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-black/10 text-gray-500 dark:border-white/10">
              <th className="py-2 font-medium">Client</th>
              <th className="py-2 font-medium">Amount</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-black/5 dark:border-white/5">
                <td className="py-3">{inv.client?.name ?? "Unknown"}</td>
                <td className="py-3">{formatCurrency(inv.amount)}</td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">
                  {formatDate(inv.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
