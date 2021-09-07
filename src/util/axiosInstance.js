import axios from "axios";
import { apiURL } from "./misc";

const instanceSettings = {
  baseURL: apiURL,
  timeout: 300000,
};
let jwt = null;

function formatResponseError({ response, ...rest }) {
  let formatedError = {
    message:
      response?.data?.message?.[0]?.messages?.[0]?.message ||
      response?.data?.message ||
      "Something went wrong",
    ...rest,
  };
  return Promise.reject(formatedError);
}

let axiosInstance = axios.create({
  ...instanceSettings,
  headers: { Authorization: jwt ? `Bearer ${jwt}` : undefined },
});

axiosInstance.interceptors.response.use(null, formatResponseError);

export { axiosInstance };
