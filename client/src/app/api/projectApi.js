import { privateAxios, publicAxios } from "./serverApi.js";

export const getProjectByIdApi = (id) => {
  return publicAxios.get(`/project/${id}`);
};

export const getProjectApi = () => {
  return publicAxios.get("/project");
};

export const createProjectApi = (project) => {
  return privateAxios.post("/project", project);
};

export const deleteProjectApi = (id) => {
  return privateAxios.delete(`/project/${id}`);
};

export const updateProjectApi = (id, formData) => {
  return privateAxios.put(`/project/${id}`, formData);
};
