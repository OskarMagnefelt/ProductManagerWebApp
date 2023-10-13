import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./views/global/Sidebar";
import ProductsView from "./views/ProductsView";
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar></Sidebar>
          <main className="content">
            <Topbar></Topbar>
            <Routes>
              <Route path="/" element={<ProductsView />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
