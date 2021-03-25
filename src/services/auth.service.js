import client from "../FeathersClient";

export const login = async (credentials) => {
  const res = await client.authenticate({ ...credentials, strategy: "local" });
  return res;
};

export const loadUser = async () => {
  try {
    const reAuth = await client.reAuthenticate();
    return reAuth;
  } catch (error) {
    throw new Error(error);
  }
};
