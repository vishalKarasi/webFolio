import { privateAxios, publicAxios } from "./serverApi.js";

export const getMessageApi = () => {
  return publicAxios.get("/message");
};

export const createMessageApi = (message) => {
  return privateAxios.post("/message", message);
};

export const deleteMessageApi = (id) => {
  return privateAxios.delete(`/message/${id}`);
};
