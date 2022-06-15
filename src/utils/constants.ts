export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const URLS: Urls = {
  WITHOUT_ID: /^\/api\/users\/?$/,
  WITH_ID: /^\/api\/users\/[\d\w-]+\/?$/,
};

type UrlTypes = "WITH_ID" | "WITHOUT_ID";
type Urls = Record<UrlTypes, RegExp>;

export const HEADERS: Headers = {
  BAD_ENDPOINT: {
    statusCode: 404,
    message: "Non-existing endpoint",
  },
  INVALID_ID: {
    statusCode: 400,
    message: "Invalid user ID",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: "Bad request",
  },
  GET_SUCCESS: {
    statusCode: 200,
  },
  CREATE_USER_SUCCESS: {
    statusCode: 201,
    message: "New user has been created",
  },
  UPDATE_USER_SUCCESS: {
    statusCode: 200,
    message: "User has been updated",
  },
  DELETE_USER_SUCCESS: {
    statusCode: 204,
    message: "User has been deleted",
  },
};

type HeadersOptions =
  | "BAD_ENDPOINT"
  | "INVALID_ID"
  | "USER_NOT_FOUND"
  | "BAD_REQUEST"
  | "GET_SUCCESS"
  | "CREATE_USER_SUCCESS"
  | "UPDATE_USER_SUCCESS"
  | "DELETE_USER_SUCCESS";

export interface Payload {
  statusCode: number;
  message?: string;
}

export type Headers = Record<HeadersOptions, Payload>;
