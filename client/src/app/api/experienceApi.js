import { privateAxios, publicAxios } from "./serverApi.js";

export const getExperienceByIdApi = (id) => {
  return publicAxios.get(`/project/${id}`);
};

export const getExperienceApi = () => {
  return publicAxios.get("/experience");
};

export const createExperienceApi = (experience) => {
  return privateAxios.post("/experience", experience);
};

export const deleteExperienceApi = (id) => {
  return privateAxios.delete(`/experience/${id}`);
};

export const updateExperienceApi = (id, formData) => {
  return privateAxios.put(`/experience/${id}`, formData);
};
