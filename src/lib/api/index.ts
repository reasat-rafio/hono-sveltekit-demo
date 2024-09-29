import { Hono } from "hono";
import { hc } from "hono/client";
import { todo } from "./routes/todo";
import { logger } from "hono/logger";
import { test } from "./routes/test";

const app = new Hono().basePath("/api");
app.use(logger());

const routes = app
  .route("/todo", todo)
  .route("/test", test)
  .get("/", (c) => c.json({ message: "server is healthy" }));

export default app;
export type AppType = typeof routes;

export const client = hc<AppType>("/");
export type ClientType = typeof client;
