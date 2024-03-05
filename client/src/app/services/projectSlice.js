import {
  createProjectApi,
  deleteProjectApi,
  getProjectApi,
  updateProjectApi,
} from "@app/api/projectApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CacheService } from "./caching.js";
import { BASE_URL } from "../api/serverApi.js";

const initialState = {
  PROJECTS: [],
  status: "idle",
  message: "",
};

export const getProject = createAsyncThunk("project/get", async () => {
  try {
    const cacheKey = `${BASE_URL}/project`;
    const cachedProject = CacheService.get(cacheKey);
    if (cachedProject) return cachedProject;
    const { data } = await getProjectApi();
    CacheService.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createProject = createAsyncThunk(
  "project/create",
  async (project) => {
    try {
      const { data } = await createProjectApi(project);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteProject = createAsyncThunk("project/delete", async (id) => {
  try {
    const { data } = await deleteProjectApi(id);
    return { id, message: data.message };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateProject = createAsyncThunk(
  "project/update",
  async ({ id, formData }) => {
    try {
      const { data } = await updateProjectApi(id, formData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get project promise
      .addCase(getProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProject.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.PROJECTS = payload.data;
      })
      .addCase(getProject.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // add project promise
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.PROJECTS.push(payload.data);
        toast.success(state.message);
      })
      .addCase(createProject.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // delete project promise
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.PROJECTS = state.PROJECTS.filter((project) => {
          return project._id !== payload.id;
        });
        toast.success(state.message);
      })
      .addCase(deleteProject.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // update project promise
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        const index = state.PROJECTS.findIndex(
          (project) => project._id === payload.data._id
        );
        state.PROJECTS[index] = payload.data;
        toast.success(state.message);
      })
      .addCase(updateProject.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default projectSlice.reducer;
