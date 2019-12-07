import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import { GRAPHQL_ENDPOINT } from "../constants";

export const useClient = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    setToken(token);
  }, []);

  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: token
    }
  });
};
