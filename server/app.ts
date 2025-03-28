import { Hono } from "hono";
import { coil } from "./routes/coil";
import { logger } from "hono/logger";
import { serveStatic } from 'hono/bun'

const app = new Hono();
app.use(logger());
// app.basePath =
const route = app.basePath("/api").route("/coil", coil);
app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ path: ' ./frontend/dist/index.html' }));


export default app;
export type AppType = typeof route;
