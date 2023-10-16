import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom"; // Import useNavigate and Outlet
import Sidebar from "./views/global/Sidebar";
import ProductsView from "./views/ProductsView";
import ListCategoriesView from "./views/ListCategoriesView";
import AddCategoryView from "./views/AddCategoryView";
import AddProductView from "./views/AddProductView";
import AddProductToCategory from "./views/AddProductToCategory";
import SearchResultView from "./views/SearchResultView";
import { searchProductBySKU } from "./api/Products";
import React from "react";
import { Product } from "./api/Interfaces";

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = React.useState<any>(null); // Define searchResult state

  const handleSearch = async (sku: string) => {
    try {
      const result = await searchProductBySKU(sku);
      setSearchResult(result); // Set the search result in state
      navigate("/searchresult");
      console.log("From App file");
      console.log(result);
    } catch (error) {
      console.error("Search error:", error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar></Sidebar>
          <main className="content">
            <Topbar onSearch={handleSearch} />
            <Routes>
              <Route path="/" element={<ProductsView />} />
              <Route path="/addproduct" element={<AddProductView />} />
              <Route path="/addcategory" element={<AddCategoryView />} />
              <Route
                path="/searchresult"
                element={<SearchResultView searchResult={searchResult} />} // Pass the searchResult
              />
              <Route
                path="/addproducttocategory"
                element={<AddProductToCategory />}
              />
              <Route path="/listcategories" element={<ListCategoriesView />} />
            </Routes>
          </main>
        </div>
        <Outlet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
