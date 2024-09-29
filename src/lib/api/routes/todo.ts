import { Hono } from "hono";

export const todo = new Hono()
  .get("/", (c) => {
    return c.json({ message: "TODO" });
  })
  .get("/:id", (c) => {
    return c.json({
      message: "TEST",
      params: c.req.param("id"),
    });
  });

export default todo;
export type TodoType = typeof todo;
