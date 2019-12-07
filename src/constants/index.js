const { NODE_ENV, REACT_APP_GRAPHQL_ENDPOINT } = process.env;

export const IN_PROD = NODE_ENV === "production";
export const GRAPHQL_ENDPOINT = IN_PROD
  ? REACT_APP_GRAPHQL_ENDPOINT
  : "http://localhost:5000/graphql";
