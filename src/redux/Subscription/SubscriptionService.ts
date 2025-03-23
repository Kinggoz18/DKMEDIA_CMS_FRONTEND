import axios from "axios";
import { IResponse } from "../../interface/IResponse";
import { ISubscription } from "../../interface/Redux/ISubscription";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default class SubscriptionService {

  apiUrl: string;

  constructor() {
    this.apiUrl = `${BACKEND_URL}/subscriptions`;
  }

  //Called in frontend
  // async addSubscription() {
  //   try {
  //     const response = (await (axios.p(`${this.apiUrl}`))).data as IResponse;
  //     if (!response.success) {
  //       throw new Error(response.data)
  //     }
  //     return response.data as ISubscription
  //   } catch (error: any) {
  //     console.log({ error })
  //     throw new Error(error.message)
  //   }
  // }


  /**
   * Delete a user subscription
   * @param id 
   * @returns 
   */
  async deleteSubscription(id: string) {
    try {
      const response = (await (axios.delete(`${this.apiUrl}/${id}`))).data as IResponse;
      if (!response.success) {
        throw new Error(response.data)
      }
      return response.data as string
    } catch (error: any) {
      console.log({ error })
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }

  /**
   * Get a subscription
   * @param id 
   * @returns 
   */
  async getSubscription(id: string) {
    try {
      const response = (await (axios.get(`${this.apiUrl}/${id}`))).data as IResponse;
      if (!response.success) {
        throw new Error(response.data)
      }
      return response.data as ISubscription
    } catch (error: any) {
      console.log({ error })
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }

  /**
   * Get all subscription
   * @param id 
   * @returns 
   */
  async getAllSubscription() {
    try {
      const response = (await (axios.get(`${this.apiUrl}`))).data as IResponse;
      if (!response.success) {
        throw new Error(response.data)
      }
      return response.data as [ISubscription]
    } catch (error: any) {
      console.log({ error })
      throw new Error(error?.response?.data?.data ?? error?.message ?? error)
    }
  }

}