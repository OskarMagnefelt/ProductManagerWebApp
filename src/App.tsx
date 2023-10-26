import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
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
import LoginView from "./views/LoginView";

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<any>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userRole, setUserRole] = useState("");

  const setAuthenticationStatus = (status: boolean) => {
    setIsAuthenticated(status);
    // setUserRole(role);
  };

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
          {isAuthenticated ? (
            <>
              <Sidebar
                setAuthenticationStatus={setAuthenticationStatus}
                // userRole={userRole}
              ></Sidebar>
              <main className="content">
                <Topbar onSearch={handleSearch} />
                <Routes>
                  <>
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
                    <Route
                      path="/listcategories"
                      element={<ListCategoriesView />}
                    />
                  </>
                </Routes>
              </main>
            </>
          ) : (
            <LoginView setAuthenticationStatus={setAuthenticationStatus} />
          )}
        </div>
        <Outlet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
