import { getBodyData } from "./getBodyData";
import { RequestBody, store } from "../store";
import { validate as uuidValidate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { endResponse } from "./endResponse";
import { HEADERS } from "./constants";
import { isAValidBody } from "./requestBodyCheck";

export function updateUser(req: IncomingMessage, res: ServerResponse): void {
  const userID: string = req.url?.split("/")[3] as string;
  if (!uuidValidate(userID)) {
    endResponse(res, HEADERS.INVALID_ID);
    return;
  }

  const indexOfUserToBeChanged: number = store.findIndex((userData) => userData.id === userID);

  if (indexOfUserToBeChanged !== -1) {
    changeUser(indexOfUserToBeChanged);
  } else {
    endResponse(res, HEADERS.USER_NOT_FOUND);
  }

  async function changeUser(indexInStore: number): Promise<void> {
    try {
      const bodyData: string = (await getBodyData(req)) as string;
      const newUserData: RequestBody = JSON.parse(bodyData);
      const propsCheck = isAValidBody(newUserData);
      if (propsCheck) {
        const oldUserDataInStore = store[indexInStore];
        const newUserDataInStore = Object.assign(oldUserDataInStore, newUserData);
        endResponse(res, HEADERS.UPDATE_USER_SUCCESS, newUserDataInStore);
      } else {
        throw new Error("Not a valid request body");
      }
    } catch (error) {
      endResponse(res, HEADERS.BAD_REQUEST);
    }
  }
}
