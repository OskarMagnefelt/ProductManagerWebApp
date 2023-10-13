import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridRowIdGetter, GridRowModel } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/Products";
// import Header from "../../components/Header";

const ProductsView = () => {
  const getRowId = (row: GridRowModel) => {
    return Math.random().toString();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: any = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
      // type: "string",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
  ];

  const [data, setData] = useState([]); // State to store fetched data

  useEffect(() => {
    // Fetch data from your API
    fetchProducts()
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Box m="20px">
      <Header title="Products" subtitle="All products" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default ProductsView;
