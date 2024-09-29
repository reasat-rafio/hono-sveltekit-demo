import app from "$lib/api";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ request }) => app.fetch(request);
export const PUT: RequestHandler = ({ request }) => app.fetch(request);
export const DELETE: RequestHandler = ({ request }) => app.fetch(request);
export const POST: RequestHandler = ({ request }) => app.fetch(request);
export const PATCH: RequestHandler = ({ request }) => app.fetch(request);
export const OPTIONS: RequestHandler = ({ request }) => app.fetch(request);
export const HEAD: RequestHandler = ({ request }) => app.fetch(request);
export const fallback: RequestHandler = ({ request }) => app.fetch(request);
