import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import ClearIcon from "@material-ui/icons/Clear";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts";
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../hooks/useClient";

const CreatePin = ({ classes }) => {
  const client = useClient();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const [submitting, setSubmitting] = useState(false);

  const onPinFormSubmitHandler = async e => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;
      const variables = {
        input: { title, image: url, content, latitude, longitude }
      };
      const { createPin } = await client.request(
        CREATE_PIN_MUTATION,
        variables
      );
      dispatch({ type: "ADD_PIN", payload: createPin });
      onDiscardBtnClickHandler();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const handleImageUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "geopins");
      data.append("cloud_name", "dcqjmkwvc");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcqjmkwvc/image/upload",
        data
      );
      return res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  const onDiscardBtnClickHandler = () => {
    setImage(null);
    setTitle("");
    setContent("");
    dispatch({ type: "DELETE_DRAFT" });
  };

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} /> Pin Location
      </Typography>
      <div>
        <TextField
          onChange={e => setTitle(e.target.value)}
          name="title"
          label="Title"
          placeholder="Insert pin title"
        />

        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />

        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>

      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Content"
          multiline
          rows="6"
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div>
        <Button
          onClick={onDiscardBtnClickHandler}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>

        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={onPinFormSubmitHandler}
        >
          <SaveIcon className={classes.rightIcon} />
          Submit
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
