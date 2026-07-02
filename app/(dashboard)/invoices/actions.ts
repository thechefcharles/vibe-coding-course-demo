"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InvoiceStatus } from "@/types/invoice";

export async function createInvoiceAction(input: {
  clientId: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("invoices").insert({
    client_id: input.clientId,
    amount: input.amount,
    status: input.status,
    due_date: input.dueDate,
    user_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/invoices");
  redirect("/invoices");
}
