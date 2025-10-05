import axios, { AxiosResponse } from "axios";
import { apiRequest } from "./request";

const BaseUrl = "http://10.134.142.87:3000";

// tester si la connexion au serveur est etablie f
const Params = {};
export const UnmixService = {
  UploadFile: async (file: FormData) => {
    return apiRequest("post", "/unmix", file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  CheckStatus: async (jobId: string) => {
    return apiRequest("get", `status/${jobId}`);
  },
  DownloadFile: async (id: string) => {
    return apiRequest("get", `download/${id}`);
  },
};
