import { useSelector } from "react-redux";
import "./App.css";

import Home from "./pages/home";
import { makeServer } from "./server/apiMockServer";
import { ThemeProvider } from "styled-components";
import { State } from "./store/store";
import { ThemeState } from "./data/themeSlice";
import { darkTheme, lightTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalSyles";
makeServer();

const App = () => {
  const { mode } = useSelector<State, ThemeState>((s) => s.theme);
  const theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Home />
    </ThemeProvider>
  );
};

export default App;
