import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { AppContext } from "../../contexts";

const Signout = ({ classes }) => {
  const { dispatch } = useContext(AppContext);

  const onGoogleLogoutSuccessHandler = () => {
    dispatch({ type: "SIGN_OUT_USER" });
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onGoogleLogoutSuccessHandler}
      buttonText="Signout"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography variant="body1" className={classes.buttonText}>
            Signout
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
