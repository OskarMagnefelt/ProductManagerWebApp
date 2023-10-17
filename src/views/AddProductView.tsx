import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import AddProductForm from "../components/AddProductForm";
import { useNavigate } from "react-router-dom";

const AddProductView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [productAddedMessage, setProductAddedMessage] = useState(false);

  const handleAddProduct = (data: any) => {
    // Handle the form submission here, for example, send the data to your API.
    console.log(data);
    setProductAddedMessage(true);
    setTimeout(() => {
      setProductAddedMessage(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Add Product" subtitle="Add new products" />
        <AddProductForm onSubmit={handleAddProduct} />
        {productAddedMessage && (
          <div style={{ color: colors.greenAccent[400], marginTop: "1rem" }}>
            Product added...
          </div>
        )}
      </Box>
    </div>
  );
};

export default AddProductView;
