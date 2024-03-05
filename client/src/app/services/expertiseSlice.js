import {
  createExpertiseApi,
  deleteExpertiseApi,
  getExpertiseApi,
  updateExpertiseApi,
} from "@app/api/expertiseApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL } from "../api/serverApi.js";
import { CacheService } from "./caching.js";

const initialState = {
  EXPERTISES: [],
  status: "idle",
  message: "",
};

export const getExpertise = createAsyncThunk("expertise/get", async () => {
  try {
    const cacheKey = `${BASE_URL}/expertise`;
    const cachedExpertise = CacheService.get(cacheKey);
    if (cachedExpertise) return cachedExpertise;
    const { data } = await getExpertiseApi();
    CacheService.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createExpertise = createAsyncThunk(
  "expertise/create",
  async (expertise) => {
    try {
      const { data } = await createExpertiseApi(expertise);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteExpertise = createAsyncThunk(
  "expertise/delete",
  async (id) => {
    try {
      const { data } = await deleteExpertiseApi(id);
      return { id, message: data.message };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateExpertise = createAsyncThunk(
  "expertise/update",
  async ({ id, formData }) => {
    try {
      const { data } = await updateExpertiseApi(id, formData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const expertiseSlice = createSlice({
  name: "expertise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get expertise promise
      .addCase(getExpertise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpertise.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERTISES = payload.data;
      })
      .addCase(getExpertise.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // add expertise promise
      .addCase(createExpertise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createExpertise.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERTISES.push(payload.data);
        toast.success(state.message);
      })
      .addCase(createExpertise.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // delete expertise promise
      .addCase(deleteExpertise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExpertise.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.EXPERTISES = state.EXPERTISES.filter((expertise) => {
          return expertise._id !== payload.id;
        });
        toast.success(state.message);
      })
      .addCase(deleteExpertise.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // update expertise promise
      .addCase(updateExpertise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExpertise.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        const index = state.EXPERTISES.findIndex(
          (expertise) => expertise._id === payload.data._id
        );
        state.EXPERTISES[index] = payload.data;
        toast.success(state.message);
      })
      .addCase(updateExpertise.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default expertiseSlice.reducer;
