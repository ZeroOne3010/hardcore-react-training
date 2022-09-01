import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  spacing: { 0: "0", 1: "1em" },
  color: {
    brand: "yellow"
  },
  font: {
    body: "monospace"
  }
});
