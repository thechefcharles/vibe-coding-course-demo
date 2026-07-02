import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, statusStyles } from "@/lib/format";

describe("formatCurrency", () => {
  it("formats whole dollars with no decimals", () => {
    expect(formatCurrency(1200)).toBe("$1,200");
    expect(formatCurrency(0)).toBe("$0");
  });
});

describe("formatDate", () => {
  it("formats an ISO date without timezone drift", () => {
    // June 10 must stay June 10 regardless of the runner's timezone.
    expect(formatDate("2026-06-10")).toBe("Jun 10, 2026");
  });
});

describe("statusStyles", () => {
  it("has a style for every invoice status", () => {
    expect(Object.keys(statusStyles).sort()).toEqual([
      "draft",
      "overdue",
      "paid",
      "sent",
    ]);
  });
});
