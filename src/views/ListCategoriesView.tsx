import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";

const ListCategoriesView = () => {
  return (
    <div>
      <Box m="20px">
        <Header
          title="Categories With Products"
          subtitle="All categories including assigned products"
        />
        ListCategoriesView
      </Box>
    </div>
  );
};

export default ListCategoriesView;
