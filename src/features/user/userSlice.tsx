import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userSignup, userSignin } from "./userAPI";
import {
  SigninPayload,
  SignupPayload,
  User,
  UserState,
} from "@/shared/interfaces/interfaces";

export const signup = createAsyncThunk(
  "user/signup",
  async (userData: SignupPayload, { rejectWithValue }) => {
    try {
      const response: any = await userSignup(userData);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (credentials: SigninPayload, { rejectWithValue }) => {
    try {
      const response: any = await userSignin(credentials);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
