import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

describe("Source Files", () => {
  test("src/index.html exists", () => {
    expect(existsSync("./src/index.html")).toBe(true);
  });

  test("src/styles.css exists", () => {
    expect(existsSync("./src/styles.css")).toBe(true);
  });

  test("src/main.js exists", () => {
    expect(existsSync("./src/main.js")).toBe(true);
  });
});

describe("HTML Structure", () => {
  let html: string;

  test("HTML has proper structure", async () => {
    html = await readFile("./src/index.html", "utf-8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("<head>");
    expect(html).toContain("<body>");
    expect(html).toContain("</html>");
  });

  test("HTML links to styles.css", async () => {
    html = await readFile("./src/index.html", "utf-8");
    expect(html).toContain('href="styles.css"');
  });

  test("HTML links to main.js", async () => {
    html = await readFile("./src/index.html", "utf-8");
    expect(html).toContain('src="main.js"');
  });
});

describe("CSS Validity", () => {
  test("CSS file is not empty", async () => {
    const css = await readFile("./src/styles.css", "utf-8");
    expect(css.trim().length).toBeGreaterThan(0);
  });

  test("CSS has no @import statements (for size)", async () => {
    const css = await readFile("./src/styles.css", "utf-8");
    expect(css).not.toContain("@import");
  });
});

describe("JavaScript Validity", () => {
  test("JavaScript file is not empty", async () => {
    const js = await readFile("./src/main.js", "utf-8");
    expect(js.trim().length).toBeGreaterThan(0);
  });

  test("JavaScript has no module imports (vanilla only)", async () => {
    const js = await readFile("./src/main.js", "utf-8");
    expect(js).not.toMatch(/^import\s/m);
  });
});
