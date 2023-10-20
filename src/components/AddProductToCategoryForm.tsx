import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
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

interface AddProductToCategoryProps {
  onSubmit: (data: AddProductToCategoryDTO) => void;
}

const AddProductToCategoryForm: React.FC<AddProductToCategoryProps> = ({
  onSubmit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showProductInfo, setShowProductInfo] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [product, setProduct] = useState<ProductInfoDto | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Dessa useEffects användes för att förstå async await

  useEffect(() => {
    console.log("product:", product);
  }, [product]);

  useEffect(() => {
    console.log("category:", category);
  }, [category]);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

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

      alert("Product not found");
      setSearchValue("");
    }
  };

  const handleCategoryPick = async (event: SelectChangeEvent) => {
    const selectedCategoryName = event.target.value as string;
    const selectedCategory = categories.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      const selectedCategoryId = selectedCategory.id;
      await setCategory(selectedCategory);

      console.log(`Category when selected: ${category}`);

      console.log("Selected category ID:", selectedCategoryId);
    }
  };

  const handleSubmit = async () => {
    if (!product || !category) {
      console.error("Product and category must be selected.");
      alert("Product and category must be selected.");
      return;
    }

    const request: AddProductToCategoryDTO = {
      productId: product!.id,
      categoryId: category!.id,
    };

    try {
      await addProductToCategoryRequest(request);
      onSubmit(request);
      console.log("Product added to category successfully!");
    } catch (error: any) {
      console.error("Error adding product to category:", error.message);
      alert("This product is already added to this category");
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

      {showProductInfo && (
        <Card
          sx={{
            backgroundColor: colors.primary[400],
            width: "250px",
            marginTop: "2rem",
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
            {product?.name}
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: colors.greenAccent[400] }}>SKU:</span>{" "}
            {product?.sku}
          </CardContent>
        </Card>
      )}

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <label>Select category</label> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            sx={{
              width: "150px",
              // height: "43px",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category?.name}
            label="Category"
            onChange={handleCategoryPick}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {`${category.id}.  ${category.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* <Button onClick={handleAddProductToCategory}>Add</Button> */}

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: `${colors.greenAccent[400]} `,
          marginTop: "1rem",
        }}
      >
        Add product to category
      </button>
    </Box>
  );
};

export default AddProductToCategoryForm;
