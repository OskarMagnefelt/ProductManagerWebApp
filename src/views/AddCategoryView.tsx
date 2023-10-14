import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";

const AddCategoryView = () => {
  const handleAddCategory = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    console.log(data);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Add Category" subtitle="Add new categories" />
        <AddCategoryForm onSubmit={handleAddCategory} />
      </Box>
    </div>
  );
};
export default AddCategoryView;
