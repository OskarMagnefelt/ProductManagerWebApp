// import { Box, Typography } from "@mui/material";
// import MainMenuOption from "../components/MainMenuOption";

// const MainView = () => {
//   return (
//     <Box
//       sx={{
//         width: 500,
//         backgroundColor: "lightgrey",
//         mx: "auto",
//         mb: 6,
//         mt: 6,
//         padding: 3,
//         display: "flex",
//         flexDirection: "column",
//         gap: 5,
//         borderRadius: 1,
//       }}
//     >
//       <Typography
//         sx={{
//           mx: "auto",
//           pt: 3,
//           pb: 3,
//           fontSize: 50,
//           fontFamily: "Roboto, sans-serif",
//           fontWeight: 700,
//         }}
//         variant="h1"
//       >
//         Product Manager
//       </Typography>

//       <MainMenuOption text="Ny produkt"></MainMenuOption>
//       <MainMenuOption text="Sök produkt"></MainMenuOption>
//       <MainMenuOption text="Ny kategori"></MainMenuOption>
//       <MainMenuOption text="Avsluta"></MainMenuOption>
//     </Box>
//   );
// };

// export default MainView;

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
// import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: any = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "sku",
      headerName: "SKU",
      type: "string",
      headerAlign: "left",
      align: "left",
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
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: {} }) => {
    //     return (
    //       <Box
    //         component={"div"}
    //         style={{ width: "60%" }}
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         // backgroundColor={
    //         // access === "admin"
    //         //   ? colors.greenAccent[600]
    //         //   // : access === "manager"
    //         //   ? colors.greenAccent[700]
    //         //   : colors.greenAccent[700]
    //         // }
    //         // borderRadius="4px"
    //       >
    //         {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography> */}
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px">
      {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
