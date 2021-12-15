import { createSlice } from "@reduxjs/toolkit";
import { authOperations } from ".";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrent: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers:
    // this is working:
    (builder) => {
      builder.addCase(authOperations.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.errorMessage = null;
      });

      builder.addCase(authOperations.register.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });

      builder.addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      });

      builder.addCase(authOperations.logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });

      builder.addCase(
        authOperations.fetchCurrentUser.pending,
        (state, action) => {
          state.isFetchingCurrent = true;
        }
      );

      builder.addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isFetchingCurrent = false;
        }
      );

      builder.addCase(
        authOperations.fetchCurrentUser.rejected,
        (state, action) => {
          state.isFetchingCurrent = false;
        }
      );
    },
});

export default authSlice.reducer;
