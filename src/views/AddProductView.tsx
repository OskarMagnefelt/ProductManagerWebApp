import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddProductForm from "../components/AddProductForm";

const AddProductView = () => {
  const handleAddProduct = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    console.log(data);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Add Product" subtitle="Add new products" />
        <AddProductForm onSubmit={handleAddProduct} />
      </Box>
    </div>
  );
};

export default AddProductView;
