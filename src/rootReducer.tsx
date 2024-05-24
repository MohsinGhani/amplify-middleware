import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
