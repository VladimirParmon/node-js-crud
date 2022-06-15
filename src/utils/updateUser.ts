import { getBodyData } from "./getBodyData.js";
import { RequestBody, store, User } from "../store.js";
import { validate as uuidValidate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { endResponse } from "./endResponse.js";
import { HEADERS } from "./constants.js";

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  const userID: string = req.url?.split("/")[3] as string;
  if (!uuidValidate(userID)) {
    endResponse(res, HEADERS.INVALID_ID);
    return;
  }

  const indexOfUserToBeChanged: number = store.findIndex(
    (userData) => userData.id === userID
  );

  if (indexOfUserToBeChanged !== -1) {
    changeUser(indexOfUserToBeChanged);
  } else {
    endResponse(res, HEADERS.USER_NOT_FOUND);
  }

  async function changeUser(indexInStore: number) {
    try {
      const bodyData: string = (await getBodyData(req)) as string;
      const newUserData: RequestBody = JSON.parse(bodyData);
      const oldUserDataInStore = store[indexInStore];

      const newUserDataInStore = Object.assign(oldUserDataInStore, newUserData);
      endResponse(res, HEADERS.UPDATE_USER_SUCCESS, newUserDataInStore);
    } catch (error) {
      endResponse(res, HEADERS.BAD_REQUEST);
    }
  }
}
