import { stat } from "fs/promises";

const MAX_SIZE_BYTES = 10240; // 10kb

async function checkSize() {
  try {
    const { size } = await stat("./dist/index.html");
    const sizeKB = (size / 1024).toFixed(2);

    console.log(`📏 Current build size: ${size} bytes (${sizeKB} KB)`);

    if (size > MAX_SIZE_BYTES) {
      console.error(`❌ Size exceeds ${MAX_SIZE_BYTES / 1024}KB limit!`);
      process.exit(1);
    }

    console.log(`✅ Size is under ${MAX_SIZE_BYTES / 1024}KB limit.`);
    console.log(`💡 Remaining budget: ${((MAX_SIZE_BYTES - size) / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error("❌ Could not read dist/index.html. Run 'bun run build' first.");
    process.exit(1);
  }
}

checkSize();
