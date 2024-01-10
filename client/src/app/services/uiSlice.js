import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjectByIdApi } from "../api/projectApi";
import { getExperienceByIdApi } from "../api/experienceApi";
import { toast } from "react-toastify";

export const getInitialMode = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState = {
  mode: getInitialMode(),
  theme: "crimson",
  popup: false,
  form: false,
  editMode: false,
  id: null,
  menu: false,
  popupData: {},
};

export const getDataById = createAsyncThunk(
  "data/get/id",
  async ({ id, pathname }) => {
    try {
      let data;
      if (pathname === "/work") {
        const response = await getProjectByIdApi(id);
        data = response.data;
      }
      if (pathname === "/about") {
        const response = await getExperienceByIdApi(id);
        data = response.data;
      }
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      document.documentElement.style.colorScheme = state.mode;
      document.body.className = state.mode;
    },

    setTheme(state, action) {
      state.theme = action.payload;
      document.documentElement.style.setProperty("--clr-primary", state.theme);
    },

    setEditMode(state, { payload }) {
      state.editMode = payload;
    },

    toggle(state, { payload }) {
      state[payload] = !state[payload];
    },

    setId(state, { payload }) {
      state.id = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get data by id promise
      .addCase(getDataById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.popupData = payload.data;
        toast.success(state.message);
      })
      .addCase(getDataById.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export const { toggleMode, setTheme, toggle, setEditMode, setId } =
  uiSlice.actions;
export default uiSlice.reducer;
