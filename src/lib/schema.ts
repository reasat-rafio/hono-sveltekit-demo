import { z } from "zod";

export const formSchema = z.object({
  todo: z.string().min(2).max(250),
});

export type FormSchema = typeof formSchema;
