import { Hono } from "hono";

export const test = new Hono()
  .get("/", (c) => {
    return c.json({ message: "TEST" });
  })
  .get("/:id", (c) => {
    return c.json({
      message: "TEST",
      params: c.req.param("id"),
    });
  });
export default test;
export type TestType = typeof test;
