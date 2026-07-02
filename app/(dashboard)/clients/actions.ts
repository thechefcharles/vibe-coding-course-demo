"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createClientAction(input: { name: string; email: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("clients").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    user_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/clients");
  redirect("/clients");
}
