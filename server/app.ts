import { Hono } from "hono";
import { coil } from "./routes/coil";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { order } from "./routes/order";

const app = new Hono();
app.use(logger());
// app.basePath =
const route = app.basePath("/api").route("/coil", coil).route("/order", order);
// app.use("*", serveStatic({ root: "./frontend/dist" }));
// // app.use('*', serveStatic({ path: './frontend/dist/index.html' }));
// app.get("*", (c) => {
//   return c.html(Bun.file("./frontend/dist/index.html").text());
// });

export default app;
export type AppType = typeof route;
