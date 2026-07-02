import { describe, it, expect } from "vitest";
import { clients, getClient } from "@/lib/mock-data";

describe("getClient", () => {
  it("returns the matching client", () => {
    expect(getClient("1")?.name).toBe("Acme Co");
  });

  it("returns undefined for an unknown id", () => {
    expect(getClient("does-not-exist")).toBeUndefined();
  });

  it("has unique client ids", () => {
    const ids = clients.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
