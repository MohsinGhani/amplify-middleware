import { RootState } from "./../../rootReducer";

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
