import React from "react";
import { Box, Button, Card, CardContent, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";
import AddProductToCategoryForm from "../components/AddProductToCategoryForm";
import { deleteProductBySKU, updateProductBySKU } from "../api/Products";
import { useNavigate } from "react-router-dom";
import { Product } from "../api/Interfaces";

const SearchResultView = ({ searchResult }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  console.log("From SearchResultView file");
  console.log(searchResult);

  const handleEditClick = (sku: string) => {
    // // Call the updateProductBySKU method with the SKU.
    // updateProductBySKU(sku, updatedProductData)
    //   .then(() => {
    //     // Handle successful update, e.g., show a success message.
    //   })
    //   .catch((error) => {
    //     // Handle errors, e.g., display an error message.
    //     console.error("Error updating product:", error);
    //   });
  };

  const handleDeleteClick = (sku: string) => {
    // Call the deleteProductBySKU method with the SKU.
    deleteProductBySKU(sku)
      .then(() => {
        console.log(`Product with ${sku} successfully deleted`);
        navigate("https://localhost:8000/searchresultview");
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

          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingBottom: "16px",
            }}
          >
            <Button
              // variant="outlined"
              variant="contained"
              //   onClick={() => handleEditClick(product.sku)}
              style={{
                // marginRight: "8px",
                backgroundColor: colors.greenAccent[600],
              }}
            >
              Edit
            </Button>
            <Button
              // variant="outlined"
              variant="contained"
              // variant="text"
              onClick={() => handleDeleteClick(searchResult.sku)}
              style={{
                backgroundColor: colors.redAccent[500],
              }}
            >
              Delete
            </Button>{" "}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default SearchResultView;
