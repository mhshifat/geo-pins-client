import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { AppContext } from "../contexts";
import CreatePin from "./Pin/CreatePin";
import NoContent from "./Pin/NoContent";
import PinContent from "./Pin/PinContent";

const Blog = ({ classes }) => {
  const {
    state: { draft, currentPin }
  } = useContext(AppContext);
  const BlogContent =
    !draft && !currentPin
      ? NoContent
      : draft && !currentPin
      ? CreatePin
      : !draft && currentPin
      ? PinContent
      : null;

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Blog);
