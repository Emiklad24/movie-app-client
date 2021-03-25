import axios from "axios";
import client, { socketURL } from "../FeathersClient";
export const authCallback = async (response) => {
  console.log(response);
  const users = await axios({
    method: "get",
    url: `${socketURL}/oauth/google/callback`,
    params: {
      client_id: response.clientId,
      client_secret: "zTXkjszb6w3E82AvGxchFJCD",
      scope: "email profile openid",
    },
  });
  console.log(users?.data);
};
