import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import {
  AddProductToCategoryDTO,
  Category,
  Product,
  ProductInfoDto,
} from "../api/Interfaces";
import { getProductInfoBySKU, updateProductBySKU } from "../api/Products";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchCategories } from "../api/Categories";
import { addProductToCategoryRequest } from "../api/ProductCategories";

const AddProductToCategoryForm = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const [showProductInfo, setShowProductInfo] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  // const [product, setProduct] = useState<ProductInfoDto | {}>({});
  const [product, setProduct] = useState<ProductInfoDto | null>(null);

  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    console.log("product:", product);
  }, [product]);

  const handleSearch = async () => {
    if (searchValue === "") return;

    try {
      const productFromApi = await getProductInfoBySKU(searchValue); // Use `await` here to wait for the promise to resolve
      setProduct(productFromApi);
      setShowProductInfo(true);
      setSearchValue("");

      console.log("product from api:", productFromApi);
      console.log("product:", product);
    } catch (error: any) {
      console.error("Error fetching product info:", error.message);
    }
  };

  const handleCategoryPick = (event: SelectChangeEvent) => {
    const selectedCategoryName = event.target.value as string;
    const selectedCategory = categories.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      const selectedCategoryId = selectedCategory.id;
      setCategory(selectedCategoryId);

      console.log("Selected category ID:", selectedCategoryId);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  useEffect(() => {
    console.log("category:", category);
  }, [category]);

  const handleAddProductToCategory = async () => {
    if (!product || !category) {
      console.error("Product and category must be selected.");
      return;
    }

    // Create a request object with the product ID and category ID
    const request: AddProductToCategoryDTO = {
      productId: product!.id, // Assuming product has an "id" property
      categoryId: category, // Assuming category is already set as an ID
    };

    try {
      await addProductToCategoryRequest(request);

      // Handle success, e.g., show a success message or navigate to a success page.
      console.log("Product added to category successfully!");
    } catch (error: any) {
      // Handle errors, e.g., display an error message.
      console.error("Error adding product to category:", error.message);
    }
  };

  return (
    <Box>
      <label>Search for product to add to category</label>
      <div style={{ display: "flex" }}>
        <InputBase
          sx={{
            border: "1px solid black",
            borderRadius: "2px",
            display: "flex",
            backgroundColor: "white",
            color: "black",
            px: 1,
            width: "150px",
          }}
          placeholder="SKU"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>

      {/* {showProductInfo && (
        <Card>
          <CardContent>Name: {product}</CardContent>
        </Card>
      )} */}

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Select category</label>
        <Select
          sx={{
            width: "150px",
            height: "43px",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category.toString()}
          label="Category"
          onChange={handleCategoryPick}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {`${category.id}.  ${category.name}`}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button onClick={handleAddProductToCategory}>Add</Button>
    </Box>
  );
};

export default AddProductToCategoryForm;
