import { store } from "../store";
import { validate as uuidValidate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { endResponse } from "./endResponse";
import { HEADERS } from "./constants";

export function deleteUser(req: IncomingMessage, res: ServerResponse): void {
  const userID: string = req.url?.split("/")[3] as string;
  if (!uuidValidate(userID)) {
    endResponse(res, HEADERS.INVALID_ID);
    return;
  }
  const indexOfUserToBeChanged: number = store.findIndex((userData) => userData.id === userID);
  if (indexOfUserToBeChanged !== -1) {
    proceedWithDeletion(indexOfUserToBeChanged);
  } else {
    endResponse(res, HEADERS.USER_NOT_FOUND);
  }

  function proceedWithDeletion(indexInStore: number) {
    store.splice(indexInStore, 1);
    endResponse(res, HEADERS.DELETE_USER_SUCCESS);
  }
}
