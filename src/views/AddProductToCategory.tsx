import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";
import AddProductToCategoryForm from "../components/AddProductToCategoryForm";

const AddProductToCategory = () => {
  const handleAddProductToCategory = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    console.log(data);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Add Category" subtitle="Add new categories" />
        <AddProductToCategoryForm onSubmit={handleAddProductToCategory} />
      </Box>
    </div>
  );
};

export default AddProductToCategory;
