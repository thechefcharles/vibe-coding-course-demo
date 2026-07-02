import Link from "next/link";
import { clients } from "@/lib/mock-data";
import { Client } from "@/types/client";

// The `?state=` query param lets the course demo show each UI state without a
// backend: loading (skeleton), empty (no rows yet), error (fetch failed).
// The default renders the mock data table.
type State = "loading" | "empty" | "error" | "default";

function parseState(value: string | undefined): State {
  if (value === "loading" || value === "empty" || value === "error") return value;
  return "default";
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { state: rawState } = await searchParams;
  const state = parseState(rawState);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Link
          href="/clients/new"
          className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          New client
        </Link>
      </div>

      {state === "loading" && <ClientsSkeleton />}
      {state === "error" && <ClientsError />}
      {state === "empty" && <ClientsEmpty />}
      {state === "default" && <ClientsTable clients={clients} />}
    </div>
  );
}

function ClientsTable({ clients }: { clients: Client[] }) {
  if (clients.length === 0) return <ClientsEmpty />;
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-black/10 text-gray-500 dark:border-white/10">
          <th className="py-2 font-medium">Name</th>
          <th className="py-2 font-medium">Email</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c.id} className="border-b border-black/5 dark:border-white/5">
            <td className="py-3">{c.name}</td>
            <td className="py-3 text-gray-600 dark:text-gray-400">{c.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ClientsSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading clients">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-10 animate-pulse rounded-md bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

function ClientsEmpty() {
  return (
    <div className="rounded-lg border border-dashed border-black/15 p-10 text-center dark:border-white/15">
      <h2 className="text-base font-medium">No clients yet</h2>
      <p className="mt-1 text-sm text-gray-500">
        Add your first client to start sending invoices.
      </p>
      <Link
        href="/clients/new"
        className="mt-4 inline-block rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
      >
        Add your first client
      </Link>
    </div>
  );
}

function ClientsError() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/50 dark:bg-red-950/30">
      <h2 className="text-base font-medium text-red-700 dark:text-red-300">
        Couldn’t load clients
      </h2>
      <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
        Something went wrong fetching your clients. Please try again.
      </p>
      <Link
        href="/clients"
        className="mt-4 inline-block rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/40"
      >
        Retry
      </Link>
    </div>
  );
}
