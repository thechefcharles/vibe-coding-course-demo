import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
    </div>
  );
}
