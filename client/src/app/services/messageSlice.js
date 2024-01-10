import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createMessageApi,
  deleteMessageApi,
  getMessageApi,
} from "../api/messageApi.js";

const initialState = {
  MESSAGES: [],
  status: "idle",
  message: "",
};

export const getMessage = createAsyncThunk("message/get", async () => {
  try {
    const { data } = await getMessageApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createMessage = createAsyncThunk(
  "message/create",
  async (message) => {
    try {
      const { data } = await createMessageApi(message);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteMessage = createAsyncThunk("message/delete", async (id) => {
  try {
    const { data } = await deleteMessageApi(id);
    return { id, message: data.message };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get message promise
      .addCase(getMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessage.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.MESSAGES = payload.data;
        toast.success(state.message);
      })
      .addCase(getMessage.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // add message promise
      .addCase(createMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMessage.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = "Message send successfully";
        state.MESSAGES.push(payload.data);
        toast.success(state.message);
      })
      .addCase(createMessage.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // delete message promise
      .addCase(deleteMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMessage.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.MESSAGES = state.MESSAGES.filter((message) => {
          return message._id !== payload.id;
        });
        toast.success(state.message);
      })
      .addCase(deleteMessage.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default messageSlice.reducer;
