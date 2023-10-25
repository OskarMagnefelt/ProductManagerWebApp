import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom"; // Import useNavigate and Outlet
import Sidebar from "./views/global/Sidebar";
import ProductsView from "./views/ProductsView";
import ListCategoriesView from "./views/ListCategoriesView";
import AddCategoryView from "./views/AddCategoryView";
import AddProductView from "./views/AddProductView";
import AddProductToCategoryView from "./views/AddProductToCategoryView";
import SearchResultView from "./views/SearchResultView";
import { searchProductsBySKU } from "./api/Products";
import { useState } from "react";
import EditProductView from "./views/EditProductView";
import Login from "./views/Login";

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<any>("");

  const handleSearch = async (sku: string) => {
    const result = await searchProductsBySKU(sku);

    const product = result.find(
      (x) => x.sku.toUpperCase() === sku.toUpperCase()
    );
    if (product) {
      setSearchResult(product);
      navigate("/searchresult");
    } else {
      alert("SKU is not registered");
    }
    console.log("From App file");
    console.log(searchResult);
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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProductsView />} />
              <Route path="/addproduct" element={<AddProductView />} />
              <Route path="/addcategory" element={<AddCategoryView />} />
              <Route
                path="/searchresult"
                element={<SearchResultView searchResult={searchResult} />}
              />
              <Route
                path="/editproduct"
                element={<EditProductView searchResult={searchResult} />}
              />
              <Route
                path="/addproducttocategory"
                element={<AddProductToCategoryView />}
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
