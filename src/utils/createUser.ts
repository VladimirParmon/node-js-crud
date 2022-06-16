import { RequestBody, store, User } from "../store";
import { v4 as uuidv4 } from "uuid";
import { getBodyData } from "./getBodyData";
import { IncomingMessage, ServerResponse } from "http";
import { endResponse } from "./endResponse";
import { HEADERS } from "./constants";
import { isAValidBody } from "./requestBodyCheck";

export async function createNewUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const bodyData: string = (await getBodyData(req)) as string;
    const body: RequestBody = JSON.parse(bodyData);

    const propsCheck: boolean = isAValidBody(body);

    if (propsCheck) {
      const newUserID: string = uuidv4();
      const newUserData: User = { ...body, id: newUserID };
      store.push(newUserData);
      endResponse(res, HEADERS.CREATE_USER_SUCCESS, newUserData);
    } else {
      throw new Error("Not a valid request body");
    }
  } catch (err) {
    endResponse(res, HEADERS.BAD_REQUEST);
  }
}
