import { store } from "../store.js";
import { v4 as uuidv4 } from 'uuid';
import { getBodyData } from "./getBodyData.js";

export async function createNewUser(req, res) {
  try {
    const bodyData = await getBodyData(req)
    const body = JSON.parse(bodyData);
    const propsCheck = body.hasOwnProperty('username') && 
    body.hasOwnProperty('age') && 
    body.hasOwnProperty('hobbies');

    if(propsCheck) {
      const newUserID = uuidv4();
      const newUserData = { id: newUserID, ...body };
      store.push(newUserData);
      res.writeHead(201, 'New user created', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUserData));
    } else {
      res.writeHead(400, 'Body does not contain all the necessary fields', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Body does not contain all the necessary fields'));
    }
  } catch (error) {
    console.log(error)
  }
}

