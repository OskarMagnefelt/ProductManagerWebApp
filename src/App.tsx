import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./views/global/Sidebar";
import ProductsView from "./views/ProductsView";
import ListCategoriesView from "./views/ListCategoriesView";
import AddCategoryView from "./views/AddCategoryView";
import AddProductView from "./views/AddProductView";
import AddProductToCategory from "./views/AddProductToCategory";

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
              <Route path="/addproduct" element={<AddProductView />} />
              <Route path="/addcategory" element={<AddCategoryView />} />
              <Route
                path="/addproducttocategory"
                element={<AddProductToCategory />}
              />
              <Route path="/listcategories" element={<ListCategoriesView />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
