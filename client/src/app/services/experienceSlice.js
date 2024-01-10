import {
  createExperienceApi,
  deleteExperienceApi,
  getExperienceApi,
  updateExperienceApi,
} from "@app/api/experienceApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  EXPERIENCES: [],
  status: "idle",
  message: "",
};

export const getExperience = createAsyncThunk("experience/get", async () => {
  try {
    const { data } = await getExperienceApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createExperience = createAsyncThunk(
  "experience/create",
  async (experience) => {
    try {
      const { data } = await createExperienceApi(experience);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async (id) => {
    try {
      const { data } = await deleteExperienceApi(id);
      return { id, message: data.message };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateExperience = createAsyncThunk(
  "experience/update",
  async ({ id, formData }) => {
    try {
      const { data } = await updateExperienceApi(id, formData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get experience promise
      .addCase(getExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExperience.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERIENCES = payload.data;
        toast.success(state.message);
      })
      .addCase(getExperience.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // add experience promise
      .addCase(createExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createExperience.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERIENCES.push(payload.data);
        toast.success(state.message);
      })
      .addCase(createExperience.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // delete experience promise
      .addCase(deleteExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExperience.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERIENCES = state.EXPERIENCES.filter((experience) => {
          return experience._id !== payload.id;
        });
        toast.success(state.message);
      })
      .addCase(deleteExperience.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // update experience promise
      .addCase(updateExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExperience.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        const index = state.EXPERIENCES.findIndex(
          (experience) => experience._id === payload.data._id
        );
        state.EXPERIENCES[index] = payload.data;
        toast.success(state.message);
      })
      .addCase(updateExperience.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default experienceSlice.reducer;
