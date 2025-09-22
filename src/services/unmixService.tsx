import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/types";

const BaseUrl = "http://127.0.0.1:3000";

// tester si la connexion au serveur est etablie f
const Params = {};
export const UnmixService = {
  UploadFile: async (formData: FormData) => {
    const response: any = axios.post(BaseUrl + "/unmix", formData);
    return response;
  },
  CheckStatus: async (jobId: string) => {
    const response: any = axios.get(BaseUrl + "/status/" + jobId);
    return response;
  },
};
