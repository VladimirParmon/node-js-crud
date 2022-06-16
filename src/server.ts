import * as http from "http";
import * as dotenv from "dotenv";
import { getAllUsers, getUser } from "./utils/getUsers";
import { createNewUser } from "./utils/createUser";
import { updateUser } from "./utils/updateUser";
import { deleteUser } from "./utils/deleteUser";
import { HEADERS, HTTP_METHODS, URLS } from "./utils/constants";
import { endResponse } from "./utils/endResponse";
import { IncomingMessage, ServerResponse } from "http";

dotenv.config();
const env: NodeJS.ProcessEnv = process.env;
const HOSTNAME: number = env.MY_HOSTNAME ? +env.MY_HOSTNAME : 3000;

const server: http.Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  const queryOptions = {
    getAll: req.url?.match(URLS.WITHOUT_ID) && req.method === HTTP_METHODS.GET,
    getUser: req.url?.match(URLS.WITH_ID) && req.method === HTTP_METHODS.GET,
    createNewUser: req.url?.match(URLS.WITHOUT_ID) && req.method === HTTP_METHODS.POST,
    updateUser: req.url?.match(URLS.WITH_ID) && req.method === HTTP_METHODS.PUT,
    deleteUser: req.url?.match(URLS.WITH_ID) && req.method === HTTP_METHODS.DELETE,
  };

  if (queryOptions.getAll) {
    getAllUsers(res);
  } else if (queryOptions.getUser) {
    getUser(req, res);
  } else if (queryOptions.createNewUser) {
    createNewUser(req, res);
  } else if (queryOptions.createNewUser) {
    updateUser(req, res);
  } else if (queryOptions.deleteUser) {
    deleteUser(req, res);
  } else {
    endResponse(res, HEADERS.BAD_ENDPOINT);
  }
});

server.listen(env.MY_PORT, HOSTNAME, () => {
  console.log(`Server running at http://${env.MY_HOSTNAME}:${env.MY_PORT}/`);
});
