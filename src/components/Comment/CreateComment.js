import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../hooks/useClient";

const CreateComment = ({ classes }) => {
  const client = useClient();
  const [comment, setComment] = useState("");
  const { state, dispatch } = useContext(AppContext);

  const onCommentBtnSubmitHandler = async () => {
    try {
      const variables = { pinId: state.currentPin._id, text: comment };
      const { createComment } = await client.request(
        CREATE_COMMENT_MUTATION,
        variables
      );
      dispatch({ type: "CREATE_COMMENT", payload: createComment });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className={classes.form}>
        <IconButton
          onClick={() => setComment("")}
          disabled={!comment.trim()}
          className={classes.clearButton}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Add comment"
          multiline={true}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <IconButton
          onClick={onCommentBtnSubmitHandler}
          disabled={!comment.trim()}
          className={classes.sendButton}
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(CreateComment);
