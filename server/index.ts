import app from "./app";

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("Server started at http://localhost:3000");
