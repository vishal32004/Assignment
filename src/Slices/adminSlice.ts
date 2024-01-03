import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";
import { ErrorResponse } from "../constants";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

type UserApiState = {
  users: UserInfo[];
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: UserApiState = {
  users: [],
  status: "idle",
  error: null,
};

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users");
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


export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ userId, newRoles }: { userId: string; newRoles: string[] }, { rejectWithValue }) => {
    console.log(userId,newRoles)
    try {
      const response = await axiosInstance.put(`/users/${userId}/role`, {userId, role: newRoles });

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

const adminReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UserInfo[]>) => {
          state.status = "idle";
          state.users = action.payload;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message ||
            "Retrieving users failed";
        } else {
          state.error = action.error.message || "Retrieving users failed";
        }
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.status = "idle";
          const updatedUser = action.payload;
          state.users = state.users.map((user) =>
            user.id === updatedUser.id ? { ...user, roles: updatedUser.roles } : user
          );
        }
      )
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Updating user role failed";
        } else {
          state.error = action.error.message || "Updating user role failed";
        }
      });
  },
});

export default adminReducer.reducer;