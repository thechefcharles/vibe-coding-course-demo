"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where you'd report to Sentry / logging.
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/50 dark:bg-red-950/30">
      <h2 className="text-base font-medium text-red-700 dark:text-red-300">
        Something went wrong
      </h2>
      <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
        An unexpected error occurred. You can try again.
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/40"
      >
        Try again
      </button>
    </div>
  );
}
