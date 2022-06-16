import { Payload } from "./constants";
import { ServerResponse } from "http";
import { User } from "../store";

export function endResponse(
  res: ServerResponse,
  { statusCode, message }: Payload,
  data?: User
): void {
  res.writeHead(statusCode, message, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data ? data : message));
}
