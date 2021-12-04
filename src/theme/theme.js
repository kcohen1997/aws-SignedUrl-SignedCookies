import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import baseTheme from "./baseTheme";

let theme = createMuiTheme(baseTheme);

theme = responsiveFontSizes(theme);

export default theme;
