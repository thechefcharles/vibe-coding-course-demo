import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Client } from "@/types/client";
import { InvoiceForm } from "./invoice-form";

export default async function NewInvoicePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clients")
    .select("id, name, email")
    .order("name", { ascending: true });

  const clients = (data ?? []) as Client[];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">New invoice</h1>
      {clients.length === 0 ? (
        <div className="max-w-md rounded-lg border border-dashed border-black/15 p-6 text-sm dark:border-white/15">
          You need a client first.{" "}
          <Link href="/clients/new" className="font-medium underline">
            Add a client
          </Link>{" "}
          to create an invoice.
        </div>
      ) : (
        <InvoiceForm clients={clients} />
      )}
    </div>
  );
}
