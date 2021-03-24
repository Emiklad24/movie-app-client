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
    console.log(error);
    throw new Error("Failed");
  }
};
