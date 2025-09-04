import axios from "axios";

export const api = axios.create({
  // baseURL: "https://fakestoreapi.com",
  baseURL:
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api",
});
