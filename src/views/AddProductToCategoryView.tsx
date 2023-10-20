import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";
import AddProductToCategoryForm from "../components/AddProductToCategoryForm";
import { useNavigate } from "react-router-dom";
import { addProductToCategoryRequest } from "../api/ProductCategories";
import { AddProductToCategoryDTO } from "../api/Interfaces";

const AddProductToCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [productAddedToCategory, setProductAddedToCategory] = useState(false);

  const handleAddProductToCategory = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    addProductToCategoryRequest(data);

    setProductAddedToCategory(true);
    setTimeout(() => {
      setProductAddedToCategory(false);
      navigate("/");
    }, 2000);
    console.log(data);
  };

  return (
    <div>
      <Box m="20px">
        <Header
          title="Add Product To Category"
          subtitle="Add products to categories"
        />
        <AddProductToCategoryForm
        // onSubmit={handleAddProductToCategory}
        />
        {productAddedToCategory && (
          <div style={{ color: colors.greenAccent[400], marginTop: "1rem" }}>
            Product added to category...
          </div>
        )}
      </Box>
    </div>
  );
};

export default AddProductToCategory;
