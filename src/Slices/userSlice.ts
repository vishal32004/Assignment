import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";

type UserProfile = {
  name: string;
  email: string;
};

type ErrorResponse = {
  message: string;
};

type UserApiState = {
  userProfile?: UserProfile | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: UserApiState = {
  userProfile: null,
  status: "idle",
  error: null,
};

export const updateUserDetails = createAsyncThunk(
  "users/updateDetails",
  async (
    { userId, updatedDetails }: { userId: string; updatedDetails: UserProfile },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/users/${userId}`,
        updatedDetails
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (
    { userId, password }: { userId: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}/password`, {
        password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateUserDetails.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = "idle";
          state.userProfile = action.payload;
        }
      )
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.userProfile = null;
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Update failed";
        } else {
          state.error = action.error.message || "Update failed";
        }
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = "idle";
          state.userProfile = action.payload;
        }
      )
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Update failed";
        } else {
          state.error = action.error.message || "Update failed";
        }
      });
  },
});

export default userSlice.reducer;
