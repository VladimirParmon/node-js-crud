This is a simple CRUD server based on vanilla NODE JS  
It has only one route, which is "users"  
Each user has `username`, `age` and `hobbies` fields in store as well as a unique `id`

To run the server:

- in development mode: `npm run start:dev` (uses nodemon and ts-node);
- in production mode: `npm run start:prod` (compiles a bundle using webpack and runs the server).

To test the server (PUT, POST) please send data as a **JSON string**.  
Sample payload:

```
{
  "username": "Pablo",
  "age": 23,
  "hobbies": ["kittens", "sport"],
}
```

All fields are required.

```
    username: string;
    age: number;
    hobbies: string[];
```

To test the server (GET, DELETE) insert user ID in the query string:  
 `http://127.0.0.1:3000/api/users/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0a`
