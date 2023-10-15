import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  deleteProductBySKU,
  getProducts,
  updateProductBySKU,
} from "../api/Products";

const ProductsView = () => {
  const getRowId = (row: GridRowModel) => {
    return Math.random().toString();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const handleEditClick = (sku: string) => {
  //   // Call the updateProductBySKU method with the SKU.
  //   updateProductBySKU(sku, updatedProductData)
  //     .then(() => {
  //       // Handle successful update, e.g., show a success message.
  //     })
  //     .catch((error) => {
  //       // Handle errors, e.g., display an error message.
  //       console.error("Error updating product:", error);
  //     });
  // };

  const handleDeleteClick = (sku: string) => {
    // Call the deleteProductBySKU method with the SKU.
    deleteProductBySKU(sku)
      .then(() => {
        console.log(`Product with ${sku} successfully deleted`);
        // Handle successful deletion, e.g., update the UI to remove the deleted product.
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message.
        console.error("Error deleting product:", error);
      });
  };

  const columns = [
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => (
        <div>
          {/* <Button
            // variant="outlined"
            variant="contained"
            onClick={() => handleEditClick(params.row.sku)} // Implement edit functionality
            style={{
              marginRight: "8px",
              backgroundColor: colors.greenAccent[600],
            }}
          >
            Edit
          </Button> */}
          <Button
            // variant="outlined"
            variant="contained"
            // variant="text"
            onClick={() => handleDeleteClick(params.row.sku)}
            style={{
              backgroundColor: colors.redAccent[500],
            }}
          >
            Delete
          </Button>{" "}
          {/* Implement delete functionality */}
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts()
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
