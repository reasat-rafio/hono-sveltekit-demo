import { todos } from "$lib/todos";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { BadRequest } from "../exceptions";

export const todo = new Hono()
  .get("/", async (c) => {
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
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const index = todos.findIndex((todo) => todo.id === Number(id));
      if (index !== -1) {
        todos.splice(index, 1);
      }

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
