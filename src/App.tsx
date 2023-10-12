import "./App.css";
import MainView from "./views/MainView";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <MainView></MainView>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
