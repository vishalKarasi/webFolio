import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice.js";
import authSlice from "./authSlice.js";
import projectSlice from "./projectSlice.js";
import experienceSlice from "./experienceSlice.js";
import expertiseSlice from "./expertiseSlice.js";
import reviewSlice from "./reviewSlice.js";
import messageSlice from "./messageSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    experience: experienceSlice,
    expertise: expertiseSlice,
    project: projectSlice,
    review: reviewSlice,
    message: messageSlice,
  },
});
