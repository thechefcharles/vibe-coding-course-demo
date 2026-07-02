import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-full">
      <header className="border-b border-black/10 dark:border-white/10">
        <nav className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4">
          <Link href="/clients" className="text-sm font-semibold tracking-tight">
            Invoice Tracker
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/clients" className="hover:text-foreground">
              Clients
            </Link>
            <Link href="/invoices" className="hover:text-foreground">
              Invoices
            </Link>
            <Link href="/reminders" className="hover:text-foreground">
              Reminders
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm">
            {user && (
              <span className="hidden text-gray-500 sm:inline">{user.email}</span>
            )}
            <form action={signOut}>
              <button className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
    </div>
  );
}
