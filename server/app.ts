import { Hono } from "hono";
import { coil } from "./routes/coil";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());
// app.basePath =
app.get("/", (c) => c.text("Hono!"));
app.route("/coil", coil);

export default app;
