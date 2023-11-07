import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { deleteProductBySKU } from "../api/Products";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const SearchResultView = ({ searchResult }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const [productDeletedMessage, setProductDeletedMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setDecodedToken(decodedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = () => {
    navigate("/editproduct");
  };

  const handleDeleteClick = (sku: string) => {
    deleteProductBySKU(sku)
      .then(() => {
        setProductDeletedMessage(true);
        setTimeout(() => {
          setProductDeletedMessage(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  return (
    <div>
      <Box m="20px">
        <Header title="Search result" subtitle="Product found by SKU" />
        <Card
          sx={{
            backgroundColor: colors.primary[400],
            width: "250px",
          }}
        >
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Name:</span>{" "}
            {searchResult.name}
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>SKU:</span>{" "}
            {searchResult.sku}
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Description:</span>{" "}
            {searchResult.description}
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Image:</span>{" "}
            {searchResult.image}
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>
              searchResult:
            </span>{" "}
            {searchResult.price}
          </CardContent>

          {decodedToken && decodedToken.role === "Admin" && (
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingBottom: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleEditClick()}
                style={{
                  backgroundColor: colors.greenAccent[600],
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDeleteClick(searchResult.sku)}
                style={{
                  backgroundColor: colors.redAccent[500],
                }}
              >
                Delete
              </Button>{" "}
            </CardContent>
          )}
        </Card>
        {productDeletedMessage && (
          <div style={{ color: colors.greenAccent[400], marginTop: "1rem" }}>
            Product deleted...
          </div>
        )}
      </Box>
    </div>
  );
};

export default SearchResultView;
