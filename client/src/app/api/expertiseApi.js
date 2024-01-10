import { privateAxios, publicAxios } from "./serverApi.js";

export const getExpertiseApi = () => {
  return publicAxios.get("/expertise");
};

export const createExpertiseApi = (expertise) => {
  return privateAxios.post("/expertise", expertise);
};

export const deleteExpertiseApi = (id) => {
  return privateAxios.delete(`/expertise/${id}`);
};

export const updateExpertiseApi = (id, formData) => {
  return privateAxios.put(`/expertise/${id}`, formData);
};
