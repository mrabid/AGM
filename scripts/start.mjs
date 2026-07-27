import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

if (!existsSync(join(dist, "index.html"))) {
  console.error(`ERROR: ${join(dist, "index.html")} not found. Run npm run build first.`);
  process.exit(1);
}

function resolveFile(urlPath) {
  const safePath = decodeURIComponent(urlPath.split("?")[0]);
  const relative = safePath === "/" ? "index.html" : safePath.replace(/^\//, "");
  const filePath = join(dist, relative);

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }

  return join(dist, "index.html");
}

const server = createServer((req, res) => {
  try {
    const filePath = resolveFile(req.url || "/");
    const data = readFileSync(filePath);
    const type = MIME[extname(filePath)] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": filePath.includes("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    res.end(data);
  } catch (err) {
    console.error("Request error:", req.url, err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Serving ${dist} at http://${host}:${port}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
