import http from 'http';
import dotenv from 'dotenv';
import { getAllUsers, getUser } from './utils/getUsers.js';
import { createNewUser } from './utils/createUser.js';
import { updateUser } from './utils/updateUser.js';
import { deleteUser } from './utils/deleteUser.js';

dotenv.config();
const env = process.env;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  if(req.url.match(/^\/api\/users\/?$/) && req.method === 'GET') { 
    getAllUsers(res);
  } else if(req.url.match(/^\/api\/users\/[\d\w-]+\/?$/) && req.method === 'GET') {
    getUser(req, res);
  } else if(req.url.match(/^\/api\/users\/?$/) && req.method === 'POST') {
    createNewUser(req, res);
  } else if(req.url.match(/^\/api\/users\/[\d\w-]+\/?$/) && req.method === 'PUT') {
    updateUser(req, res);
  } else if(req.url.match(/^\/api\/users\/[\d\w-]+\/?$/) && req.method === 'DELETE') {
    deleteUser(req, res);
  } else {
    res.writeHead(404, 'Non-existing endpoint', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Non-existing endpoint'));
  }
});

server.listen(env.MY_PORT, env.MY_HOSTNAME, () => {
  console.log(`Server running at http://${env.MY_HOSTNAME}:${env.MY_PORT}/`);
});