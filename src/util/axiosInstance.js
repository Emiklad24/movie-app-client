import axios from "axios";
import { socketURL } from "../FeathersClient";
import useUserCredentialsStore from "../store/auth.store";
import { apiURL } from "./misc";

let jwt = useUserCredentialsStore.getState()?.jwt;

const instanceSettings = {
  baseURL: apiURL,
  timeout: 300000,
  headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
};

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
});

let axiosInstanceAlternate = axios.create({
  ...instanceSettings,
  baseURL: socketURL,
});

axiosInstance.interceptors.response.use(null, formatResponseError);
axiosInstanceAlternate.interceptors.response.use(null, formatResponseError);

export { axiosInstance, axiosInstanceAlternate };
