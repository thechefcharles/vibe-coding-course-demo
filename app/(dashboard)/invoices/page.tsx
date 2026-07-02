import Link from "next/link";
import { invoices, getClient } from "@/lib/mock-data";
import { formatCurrency, formatDate, statusStyles } from "@/lib/format";

export default function InvoicesPage() {
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
              <td className="py-3">{getClient(inv.clientId)?.name ?? "Unknown"}</td>
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
    </div>
  );
}
