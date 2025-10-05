import { apiClient } from "./apiClient";
import { ApiResponse } from "../types/types";

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });

    return {
      status: true,
      message: "Success",
      data: response.data,
    };
  } catch (error: any) {
    console.error("❌ API Request Error:", error);

    let message = "Unexpected error occurred";

    if (error.response) {
      message = error.response.data?.message || "Server error";
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return {
      status: false,
      message,
    };
  }
}
