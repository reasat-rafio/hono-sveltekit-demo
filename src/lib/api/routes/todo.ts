import { todos } from "$lib/todos";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const todo = new Hono()
  .get("/", (c) => {
    return c.json({ todos });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        id: z.number(),
        task: z.string(),
        completed: z.boolean(),
      })
    ),
    async (c) => {
      const todo = c.req.valid("json");
      todos.push(todo);

      return c.json({ todos });
    }
  )
  .get("/:id", (c) => {
    return c.json({
      params: c.req.param("id"),
    });
  });

export default todo;
export type TodoType = typeof todo;
