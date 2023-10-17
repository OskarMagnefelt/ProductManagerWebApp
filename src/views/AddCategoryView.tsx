import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";
import { addCategory } from "../api/Categories";
import { useNavigate } from "react-router-dom";

const AddCategoryView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [categoryAddedMessage, setCategoryAddedMessage] = useState(false);

  const handleAddCategory = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    addCategory(data);
    console.log(data);
    setCategoryAddedMessage(true);
    setTimeout(() => {
      setCategoryAddedMessage(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Add Category" subtitle="Add new categories" />
        <AddCategoryForm onSubmit={handleAddCategory} />
        {categoryAddedMessage && (
          <div style={{ color: colors.greenAccent[400], marginTop: "1rem" }}>
            Category added...
          </div>
        )}
      </Box>
    </div>
  );
};
export default AddCategoryView;
