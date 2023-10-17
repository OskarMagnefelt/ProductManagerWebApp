import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Input,
  TextField,
  useTheme,
} from "@mui/material";
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

  const [productDeletedMessage, setProductDeletedMessage] = useState(false);

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
