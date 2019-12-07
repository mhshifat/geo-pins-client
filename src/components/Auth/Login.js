import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GraphQLClient } from "graphql-request";
import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { GRAPHQL_ENDPOINT } from "../../constants";
import { AppContext } from "../../contexts";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes }) => {
  const { dispatch } = useContext(AppContext);

  const onGoogleOauthSuccessHandler = async user => {
    try {
      const idToken = user.getAuthResponse().id_token;
      const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
        headers: { authorization: idToken }
      });
      const res = await client.request(ME_QUERY);
      dispatch({ type: "LOGIN_USER", payload: res.me });
      dispatch({ type: "IS_LOGGED_IN", payload: user.isSignedIn() });
    } catch (err) {
      onGoogleOauthFailureHandler(err);
    }
  };

  const onGoogleOauthFailureHandler = err => {
    console.error("Error login in: ", err);
    dispatch({ type: "IS_LOGGED_IN", payload: false });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        onSuccess={onGoogleOauthSuccessHandler}
        onFailure={onGoogleOauthFailureHandler}
        isSignedIn={true}
        theme="dark"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
