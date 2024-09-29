import { hc } from "hono/client";
import type { AppType } from "$lib/api";
import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // HONO STUFF
  const { api } = hc<AppType>("/", { fetch: event.fetch });
  event.locals.api = api;

  // SEND
  return resolve(event);
};
