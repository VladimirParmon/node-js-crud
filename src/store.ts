export let store: Store = [
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0a",
    username: "Pablo",
    age: 23,
    hobbies: ["kittens", "sport"],
  },
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    username: "Emanuel",
    age: 26,
    hobbies: ["dogs", "knitting"],
  },
];

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type RequestBody = Omit<User, "id">;

type Store = User[];
