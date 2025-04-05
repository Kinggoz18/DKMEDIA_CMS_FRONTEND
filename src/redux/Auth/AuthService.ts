import axios from "axios";
import { IResponse } from "../../interface/IResponse";
import IUserSlice from "../../interface/Redux/IUserSlice";

const BACKEND_URL = import.meta.env.VITE_API_URL;
export class AuthService {
  apiUrl: string;

  constructor() {
    this.apiUrl = `${BACKEND_URL}/auth`;
  }

  /**
   * Login or signup a user
   * @param mode signup/login
   * @param signupCode Signup code
   */
  async authenticateUser(mode: string, signupCode?: string) {
    try {
      if (mode === "signup" && signupCode) {
        const response = (await axios.post(`${this.apiUrl}/authenticate-code`, { code: signupCode })).data as IResponse;
        if (!response.success) {
          throw new Error(response.data);
        }
        const id = response.data;
        window.location.replace(`${this.apiUrl}/google/callback?mode=${mode}&id=${encodeURIComponent(id)}`);
      } else if (mode === "login") {
        window.location.replace(`${this.apiUrl}/google/callback?mode=${mode}`);
      } else {
        throw new Error("Invalid signup mode")
      }
    } catch (error: any) {
      console.log({ error })
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }

  async getAuthenticatedUser(userId: string) {
    try {
      const response = (await axios.get(`${this.apiUrl}/${userId}`)).data as IResponse;
      console.log({ response })
      if (!response.success) {
        throw new Error(response.data);
      }
      return response?.data as IUserSlice;
    } catch (error: any) {
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }

  async logoutUser() {
    try {
      const response = (await axios.get(`${this.apiUrl}/`)).data as IResponse;
      console.log({ response })
      if (!response.success) {
        throw new Error(response.data);
      }
      return response?.data as IUserSlice;
    } catch (error: any) {
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }
}