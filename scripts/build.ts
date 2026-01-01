import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const SRC_DIR = "./src";
const DIST_DIR = "./dist";
const MAX_SIZE_BYTES = 10240; // 10kb

async function minifyCSS(css: string): Promise<string> {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([{}:;,>+~])\s*/g, "$1") // Remove space around operators
    .replace(/;}/g, "}") // Remove last semicolon
    .trim();
}

async function minifyJS(js: string): Promise<string> {
  // Use Bun's bundler for JS minification
  const result = await Bun.build({
    entrypoints: [`${SRC_DIR}/main.js`],
    minify: true,
    target: "browser",
  });

  if (!result.success) {
    throw new Error("JS minification failed: " + result.logs.join("\n"));
  }

  return await result.outputs[0].text();
}

async function minifyHTML(html: string): Promise<string> {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/>\s+</g, "><") // Remove space between tags
    .replace(/\s+>/g, ">") // Remove space before >
    .trim();
}

async function build() {
  console.log("🔨 Building...");

  // Ensure dist directory exists
  if (!existsSync(DIST_DIR)) {
    await mkdir(DIST_DIR, { recursive: true });
  }

  // Read source files
  const [htmlTemplate, cssContent, jsContent] = await Promise.all([
    readFile(`${SRC_DIR}/index.html`, "utf-8"),
    readFile(`${SRC_DIR}/styles.css`, "utf-8"),
    readFile(`${SRC_DIR}/main.js`, "utf-8"),
  ]);

  // Minify CSS and JS
  const [minifiedCSS, minifiedJS] = await Promise.all([
    minifyCSS(cssContent),
    minifyJS(jsContent),
  ]);

  // Inline CSS and JS into HTML
  let html = htmlTemplate
    .replace(
      '<link rel="stylesheet" href="styles.css">',
      `<style>${minifiedCSS}</style>`
    )
    .replace(
      '<script src="main.js"></script>',
      `<script>${minifiedJS}</script>`
    );

  // Minify final HTML
  html = await minifyHTML(html);

  // Write output
  const outputPath = `${DIST_DIR}/index.html`;
  await writeFile(outputPath, html);

  // Check size
  const size = Buffer.byteLength(html, "utf-8");
  const sizeKB = (size / 1024).toFixed(2);

  console.log(`📦 Output: ${outputPath}`);
  console.log(`📏 Size: ${size} bytes (${sizeKB} KB)`);

  if (size > MAX_SIZE_BYTES) {
    console.error(`❌ Build exceeds ${MAX_SIZE_BYTES / 1024}KB limit!`);
    process.exit(1);
  }

  console.log(`✅ Build successful! Under ${MAX_SIZE_BYTES / 1024}KB limit.`);
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
