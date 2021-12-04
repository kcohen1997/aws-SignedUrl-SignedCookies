import { useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme/theme";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </ThemeProvider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
