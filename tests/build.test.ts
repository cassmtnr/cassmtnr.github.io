import { describe, test, expect, beforeAll } from "bun:test";
import { readFile, stat } from "fs/promises";
import { existsSync } from "fs";
import { $ } from "bun";

const MAX_SIZE_BYTES = 10240; // 10kb
const DIST_FILE = "./dist/index.html";

describe("Build Process", () => {
  beforeAll(async () => {
    // Run the build before tests
    await $`bun run build`;
  });

  test("build creates dist/index.html", () => {
    expect(existsSync(DIST_FILE)).toBe(true);
  });

  test("build output is under 10kb", async () => {
    const { size } = await stat(DIST_FILE);
    expect(size).toBeLessThan(MAX_SIZE_BYTES);
  });
});

describe("Output Validation", () => {
  let html: string;

  beforeAll(async () => {
    html = await readFile(DIST_FILE, "utf-8");
  });

  test("contains valid HTML doctype", () => {
    expect(html).toMatch(/^<!DOCTYPE html>/i);
  });

  test("contains required meta charset", () => {
    expect(html).toContain('charset="UTF-8"');
  });

  test("contains viewport meta tag", () => {
    expect(html).toContain("viewport");
  });

  test("contains page title", () => {
    expect(html).toMatch(/<title>.+<\/title>/);
  });

  test("CSS is inlined (no external stylesheet link)", () => {
    expect(html).not.toContain('rel="stylesheet"');
    expect(html).toContain("<style>");
  });

  test("JS is inlined (no external script src)", () => {
    expect(html).not.toMatch(/<script src=/);
    expect(html).toContain("<script>");
  });

  test("no external CDN dependencies", () => {
    expect(html).not.toMatch(/https?:\/\/cdn\./);
    expect(html).not.toMatch(/https?:\/\/unpkg\.com/);
    expect(html).not.toMatch(/https?:\/\/cdnjs\./);
  });
});

describe("Size Budget", () => {
  test("build has remaining size budget", async () => {
    const { size } = await stat(DIST_FILE);
    const remaining = MAX_SIZE_BYTES - size;
    console.log(`\n📏 Build size: ${size} bytes`);
    console.log(`💡 Remaining budget: ${remaining} bytes (${(remaining / 1024).toFixed(2)} KB)`);
    expect(remaining).toBeGreaterThan(0);
  });
});
