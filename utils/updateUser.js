import { getBodyData } from "./getBodyData.js";
import { store } from "../store.js";
import { validate as uuidValidate } from 'uuid';

export function updateUser(req, res) {
  const userID = req.url.split('/')[3];
  if(!uuidValidate(userID)) {
    res.writeHead(400, 'Not a valid ID', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Not a valid ID'));
    return;
  }
  
  const indexOfUserToBeChanged = store.findIndex((userData) => userData.id === userID);
  if (indexOfUserToBeChanged !== -1) {
    changeUser(indexOfUserToBeChanged);
  } else {
    res.writeHead(404, 'User does not exist', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('User does not exist'));
  }

  async function changeUser(indexInStore) {
    try {
      const bodyData = await getBodyData(req)
      const body = JSON.parse(bodyData);

      for(let prop in body) {
        store[indexInStore][prop] = body[prop];
      }

      res.writeHead(200, 'User updated', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('User updated'));
    } catch (error) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Body does not contain all the necessary fields or is not valid'));
    }
  }
}