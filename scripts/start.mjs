import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

const server = createServer((req, res) =>
  handler(req, res, {
    public: dist,
    rewrites: [{ source: "**", destination: "/index.html" }],
  })
);

server.listen(port, host, () => {
  console.log(`Serving ${dist} at http://${host}:${port}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
