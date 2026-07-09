import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const src = path.join(root, process.argv[2] ?? "outputs/bilibili-geying-s3-finals-combined-playground-v13-dark.html");
const distDir = path.join(root, "dist");
const index = path.join(distDir, "index.html");
const redirects = path.join(distDir, "_redirects");

fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(src, index);
fs.writeFileSync(redirects, "/api/wallet /.netlify/functions/wallet 200\n", "utf8");

console.log(JSON.stringify({
  dist: distDir,
  index,
  redirects,
  bytes: fs.statSync(index).size,
}, null, 2));