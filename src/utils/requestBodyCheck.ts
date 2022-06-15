import { RequestBody } from "src/store";

export function isAValidBody(obj: any): obj is RequestBody {
  const username = "username" in obj && typeof (obj["username"] === "string");
  const age = "age" in obj && typeof (obj["age"] === "number");
  const hobbies = "hobbies" in obj && isArrayOfStrings(obj["hobbies"]);
  return username && age && hobbies;
}

function isArrayOfStrings(value: any): boolean {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
