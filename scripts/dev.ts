const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;

    const filePath = `./src${path}`;
    const file = Bun.file(filePath);

    if (await file.exists()) {
      const contentType = path.endsWith(".css")
        ? "text/css"
        : path.endsWith(".js")
          ? "application/javascript"
          : "text/html";

      return new Response(file, {
        headers: { "Content-Type": contentType },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Dev server running at http://localhost:${server.port}`);
