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

  const [name, setName] = useState("");
  const [sku, setSku] = useState(searchResult.sku);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number>(0);

  const navigate = useNavigate();

  const handleEditClick = (sku: string) => {
    // Call the updateProductBySKU method with the SKU.
    const updatedProductData = {
      sku,
      name,
      description,
      image,
      price,
    };
    updateProductBySKU(sku, updatedProductData)
      .then(() => {
        // Handle successful update, e.g., show a success message.
        // navigate("/editproductview");

        <Card
          sx={{
            backgroundColor: colors.primary[400],
            width: "250px",
          }}
        >
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Name:</span>{" "}
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>SKU:</span>{" "}
            {searchResult.sku}
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Description:</span>{" "}
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
            />
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Image:</span>{" "}
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={image}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setImage(event.target.value);
              }}
            />
          </CardContent>
          <CardContent>
            <span style={{ color: colors.greenAccent[400] }}>Price:</span>{" "}
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              type="number"
              value={price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(parseFloat(event.target.value));
              }}
            />
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
              onClick={() => handleEditClick(searchResult.sku)}
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
        </Card>;
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message.
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteClick = (sku: string) => {
    deleteProductBySKU(sku)
      .then(() => {
        console.log(`Product with ${sku} successfully deleted`);
        navigate("/searchresultview");
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
              onClick={() => handleEditClick(searchResult.sku)}
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
      </Box>
    </div>
  );
};

export default SearchResultView;
