import { style /*, globalStyle*/ } from "@vanilla-extract/css";

// globalStyle("html", {
//   fontFamily: "monospace"
// });

export const duckClass = style({
  border: "10px solid black",
  padding: "1em",
  margin: "1em 0.5em",
  borderRadius: "15px"
});

export const maleClass = style({
  backgroundColor: "rgb(72 148 219)"
});

export const femaleClass = style({
  backgroundColor: "rgb(168 255 17)"
});
