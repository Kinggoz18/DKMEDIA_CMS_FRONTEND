import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import IUserSlice from "../../interface/Redux/IUserSlice";
import { AuthService } from "./AuthService";

const authService = new AuthService();

/**
 * Initial slice state
 */
const initialState: IUserSlice = JSON.parse(localStorage.getItem("user") ?? "{}") ?? {
  _id: "",
  authId: "",
  displayName: "",
  email: "",
}

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      state = initialState;
    }
  }
})

/**
 * Get the user's information save it to redux store and save it to localstorage
 * @param userId The id of the user
 * @returns 
 */
export function LoginUser(userId: string): any {
  return async function LoginUserThunk(dispatch: Dispatch<UnknownAction>, getState: any) {
    try {
      const user = await authService.getAuthenticatedUser(userId);
      dispatch(authSlice.actions.loginUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      console.log({ user });
    } catch (error: any) {
      console.log({ error });
      throw new Error(error.message);
    }
  };
}

/**
 * Reset the state and logout the user
 * @returns 
 */
export function LogoutUser(): any {
  return function LogoutUserThunk(dispatch: Dispatch<UnknownAction>) {
    localStorage.removeItem("user");
    dispatch(authSlice.actions.logoutUser(null))
  }
}

// export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;