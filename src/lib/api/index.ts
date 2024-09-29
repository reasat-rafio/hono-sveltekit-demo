import { Hono, type ErrorHandler } from "hono";
import { hc } from "hono/client";
import { todo } from "./routes/todo";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from "hono/http-exception";

const errorHandler: ErrorHandler = (err, c) => {
  console.error(`Error on ${c.req.method} ${c.req.url}`);
  console.error(err?.message);
  console.error(err?.stack);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return new Response("Internal Error", {
    status: 500,
    statusText: err?.message || "Internal Error",
  });
};

const app = new Hono().basePath("/api");
app.use(logger());
app.use(prettyJSON());

const routes = app
  .route("/todo", todo)
  .get("/", (c) => c.json({ message: "server is healthy" }))
  .onError(errorHandler);

export default app;
export type AppType = typeof routes;

export const client = hc<AppType>("/");
export type ClientType = typeof client;
