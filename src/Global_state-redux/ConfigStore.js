import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskReducer";

const configStore = () => {
  return configureStore({
    reducer: {
      tasks: taskReducer,
    },
    devTools: true, // For Redux DevTools extension
  });
};

export default configStore;
