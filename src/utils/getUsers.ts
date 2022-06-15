import { store, User } from "../store.js";
import { validate as uuidValidate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { endResponse } from "./endResponse.js";
import { HEADERS } from "./constants.js";

export function getAllUsers(res: ServerResponse): void {
  res.end(JSON.stringify(store));
}

export function getUser(req: IncomingMessage, res: ServerResponse): void {
  const userID: string = req.url?.split("/")[3] || "";

  if (uuidValidate(userID) === false) {
    endResponse(res, HEADERS.INVALID_ID);
  } else {
    const userData: User | undefined = store.find((storedUser) => storedUser.id === userID);
    if (userData === undefined) {
      endResponse(res, HEADERS.USER_NOT_FOUND);
    } else {
      endResponse(res, HEADERS.GET_SUCCESS, userData);
    }
  }
}
