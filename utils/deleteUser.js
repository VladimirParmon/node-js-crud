import { store } from "../store.js";
import { validate as uuidValidate } from 'uuid';

export function deleteUser(req, res) {
  const userID = req.url.split('/')[3];
  if(!uuidValidate(userID)) {
    res.writeHead(400, 'Not a valid ID', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Not a valid ID'));
    return;
  }
  const indexOfUserToBeChanged = store.findIndex((userData) => userData.id === userID);
  if (indexOfUserToBeChanged !== -1) {
    proceedWithDeletion(indexOfUserToBeChanged);
  } else {
    res.writeHead(404, 'User does not exist', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('User does not exist'));
  }

  function proceedWithDeletion(indexInStore) {
    store.splice(indexInStore, 1);
    res.writeHead(204, 'User found and deleted', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('User found and deleted'));
  }
}