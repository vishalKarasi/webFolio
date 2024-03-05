import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createReviewApi,
  deleteReviewApi,
  getReviewApi,
  updateReviewApi,
} from "../api/reviewApi.js";

const initialState = {
  REVIEWS: [],
  status: "idle",
  message: "",
};

export const getReview = createAsyncThunk("review/get", async () => {
  try {
    const { data } = await getReviewApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createReview = createAsyncThunk(
  "review/create",
  async (review) => {
    try {
      const { data } = await createReviewApi(review);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteReview = createAsyncThunk("review/delete", async (id) => {
  try {
    const { data } = await deleteReviewApi(id);
    return { id, message: data.message };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateReview = createAsyncThunk(
  "review/update",
  async ({ id, formData }) => {
    try {
      const { data } = await updateReviewApi(id, formData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get review promise
      .addCase(getReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.REVIEWS = payload.data;
      })
      .addCase(getReview.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // add review promise
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.REVIEWS.push(payload.data);
        toast.success(state.message);
      })
      .addCase(createReview.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // delete review promise
      .addCase(deleteReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.REVIEWS = state.REVIEWS.filter((review) => {
          return review._id !== payload.id;
        });
        toast.success(state.message);
      })
      .addCase(deleteReview.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // update review promise
      .addCase(updateReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        const index = state.REVIEWS.findIndex(
          (review) => review._id === payload.data._id
        );
        state.REVIEWS[index] = payload.data;
        toast.success(state.message);
      })
      .addCase(updateReview.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default reviewSlice.reducer;
