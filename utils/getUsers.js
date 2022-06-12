import { store } from "../store.js";
import { validate as uuidValidate } from 'uuid';

export function getAllUsers(res) {
  res.end(JSON.stringify(store));
}

export function getUser(req, res) {
  const userID = req.url.split('/')[3];

  if (uuidValidate(userID) === false) {
    res.writeHead(400, 'Invalid user ID', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Invalid user ID'));
  } else {
    const userData = store.find((storedUser) => storedUser.id === userID);
    if(userData === undefined) {
      res.writeHead(404, 'User not found', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('User not found'));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(userData));
    }
  }
}