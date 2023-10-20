import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { fetchProductCategories } from "../api/ProductCategories";
import { GetProductCategoriesDto } from "../api/Interfaces";

const ListCategoriesView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [categories, setCategories] = useState<GetProductCategoriesDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductCategories();
        setCategories(data);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box m="20px">
        <Header
          title="Categories With Products"
          subtitle="All categories including assigned products"
        />
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>
              <h3>{`${category.categoryName} (${category.products.length})`}</h3>
              <ul>
                {category.products.map((product) => (
                  <li key={product.productId}>{product.productName}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default ListCategoriesView;
