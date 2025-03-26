import { Hono } from "hono";
import { coil } from "./routes/coil";
const app = new Hono();

// app.basePath = 
app.get("/", (c) => c.text("Hono!"));
app.route("/coil" ,coil);

export default app;
