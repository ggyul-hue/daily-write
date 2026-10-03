import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.DAILY_WRITE_SMOKE_PORT) || 43179;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" || request.headers.host !== `127.0.0.1:${port}`) {
    response.writeHead(404).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (pathname === "/") pathname = "/index.html";

  const filename = resolve(root, `.${pathname}`);
  if (filename !== root && !filename.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end();
    return;
  }

  try {
    if (!(await stat(filename)).isFile()) throw new Error("not a file");
    const body = await readFile(filename);
    response.writeHead(200, {
      "content-type": mimeTypes[extname(filename).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    }).end(body);
  } catch {
    response.writeHead(404).end();
  }
});

server.listen(port, "127.0.0.1");
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
