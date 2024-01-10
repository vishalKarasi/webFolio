import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, refreshTokenApi } from "@app/api/authApi.js";

import { toast } from "react-toastify";

const initialState = {
  accessToken: null,
  message: "",
  status: "idle",
};

export const login = createAsyncThunk("auth/login", async (credential) => {
  try {
    const { data } = await loginApi(credential);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await logoutApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  try {
    const { data } = await refreshTokenApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.isRegister = !state.isRegister;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.accessToken = payload.accessToken;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(login.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.accessToken = payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.accessToken = null;
        state.message = payload.message;
        state.status = "success";
        toast.success(state.message);
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export const { toggleAuth } = authSlice.actions;
export default authSlice.reducer;
