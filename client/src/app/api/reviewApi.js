import { privateAxios, publicAxios } from "./serverApi.js";

export const getReviewApi = () => {
  return publicAxios.get("/review");
};

export const createReviewApi = (review) => {
  return privateAxios.post("/review", review);
};

export const deleteReviewApi = (id) => {
  return privateAxios.delete(`/review/${id}`);
};

export const updateReviewApi = (id, review) => {
  return privateAxios.put(`/review/${id}`, review);
};
