import { Hono } from "hono";
import { hc } from "hono/client";
import { todo } from "./routes/todo";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(prettyJSON());

const routes = app
  .route("/todo", todo)
  .get("/", (c) => c.json({ message: "server is healthy" }));

export default app;
export type AppType = typeof routes;

export const client = hc<AppType>("/");
export type ClientType = typeof client;
