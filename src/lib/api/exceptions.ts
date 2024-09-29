import { StatusCodes } from "$lib/constants";
import { HTTPException } from "hono/http-exception";

export function TooManyRequests(message: string = "Too many requests") {
  throw new HTTPException(StatusCodes.TOO_MANY_REQUESTS, { message });
}

export function Forbidden(message: string = "Forbidden") {
  throw new HTTPException(StatusCodes.FORBIDDEN, { message });
}

export function Unauthorized(message: string = "Unauthorized") {
  throw new HTTPException(StatusCodes.UNAUTHORIZED, { message });
}

export function NotFound(message: string = "Not Found") {
  throw new HTTPException(StatusCodes.NOT_FOUND, { message });
}

export function BadRequest(message: string = "Bad Request") {
  return new HTTPException(StatusCodes.BAD_REQUEST, { message });
}

export function InternalError(message: string = "Internal Error") {
  throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, { message });
}
