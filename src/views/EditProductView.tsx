import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import { tokens } from "../theme";
import { Product } from "../api/Interfaces";
import { updateProductBySKU } from "../api/Products";
import { useNavigate } from "react-router-dom";

const EditProductView = ({ searchResult }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [productEditedMessage, setProductEditedMessage] = useState(false);

  const [name, setName] = useState("");
  //   const [sku, setSku] = useState(searchResult.sku);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number>(1);

  const handleUpdateClick = () => {
    const updatedProductData: Product = {
      sku: searchResult.sku, // Keep the SKU the same
      name,
      description,
      image,
      price,
    };

    // Call the API to update the product
    updateProductBySKU(searchResult.sku, updatedProductData)
      .then(() => {
        setProductEditedMessage(true);
        setTimeout(() => {
          setProductEditedMessage(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message.
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Edit Product" subtitle="Edit product and update" />
        <Card
          sx={{
            backgroundColor: colors.primary[400],
            width: "250px",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>Name:</span>{" "}
            <TextField
              id="standard-basic"
              //   label="Standard"
              variant="standard"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>SKU:</span>{" "}
            {searchResult.sku}
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>Description:</span>{" "}
            <TextField
              id="standard-basic"
              //   label="Standard"
              variant="standard"
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
            />
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>Image:</span>{" "}
            <TextField
              id="standard-basic"
              //   label="Standard"
              variant="standard"
              value={image}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setImage(event.target.value);
              }}
            />
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>Price:</span>{" "}
            <TextField
              id="standard-basic"
              //   label="Standard"
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
              onClick={() => handleUpdateClick()}
              style={{
                backgroundColor: colors.greenAccent[600],
              }}
            >
              Update
            </Button>
          </CardContent>
        </Card>
        {productEditedMessage && (
          <div style={{ color: colors.greenAccent[400], marginTop: "1rem" }}>
            Product updated...
          </div>
        )}
      </Box>
    </div>
  );
};

export default EditProductView;
