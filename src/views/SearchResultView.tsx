import React from "react";
import { Box, Button, Card, CardContent, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";
import AddProductToCategoryForm from "../components/AddProductToCategoryForm";
import { deleteProductBySKU, updateProductBySKU } from "../api/Products";

const SearchResultView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        // Handle successful deletion, e.g., update the UI to remove the deleted product.
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message.
        console.error("Error deleting product:", error);
      });
  };

  const handleSearchResultView = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    console.log(data);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Search result" subtitle="Product found by SKU" />
        <Card
          sx={{
            backgroundColor: colors.primary[400],
            // backgroundColor: "#1F2A40",
            color: colors.greenAccent[400],
            borderRadius: "10px",
            width: "300px",
          }}
        >
          <CardContent>Name</CardContent>
          <CardContent>SKU</CardContent>
          <CardContent>Description</CardContent>
          <CardContent>Image</CardContent>
          <CardContent>Price</CardContent>
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
              //   onClick={() => handleDeleteClick(product.sku)}
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
