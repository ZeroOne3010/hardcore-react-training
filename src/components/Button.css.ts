import { style } from "@vanilla-extract/css";

export const buttonClass = style({
  padding: "0.5em 1em",
  borderRadius: "10px",
  border: "5px solid black",
  margin: "0.5em 0"
});

export const primaryClass = style({
  backgroundColor: "lightgrey",
  color: "black"
});

export const secondaryClass = style({
  backgroundColor: "black",
  color: "white",
  borderColor: "white"
});
