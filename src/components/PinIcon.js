import PlaceTwoToneIcon from "@material-ui/icons/PlaceTwoTone";
import React from "react";

export default ({ size, color, onClick }) => (
  <PlaceTwoToneIcon
    onClick={onClick}
    style={{ fontSize: size, color, cursor: "pointer" }}
  />
);
