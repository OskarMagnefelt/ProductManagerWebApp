import MainView from "./views/MainView";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext } from "react"; // Import useContext
import Topbar from "./views/global/Topbar";

function App() {
  // const colorMode = useContext(ColorModeContext);
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider
      value={colorMode}
      // value={{
      //   theme: colorMode.theme,
      //   toggleColorMode: colorMode.toggleColorMode,
      // }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar></Topbar>
            {/* Your other components */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
