import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: "#455a64",
    accent: "#90a4ae",
  },
};

export default theme;