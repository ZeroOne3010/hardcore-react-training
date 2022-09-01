import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const duckClass = style({
  border: "10px solid black",
  padding: vars.spacing[1],
  margin: "1em 0",
  borderRadius: "15px"
  // display: "flex"
});

export const maleClass = style({
  backgroundColor: "rgb(72 148 219)"
});

export const femaleClass = style({
  backgroundColor: "rgb(168 255 17)"
});
