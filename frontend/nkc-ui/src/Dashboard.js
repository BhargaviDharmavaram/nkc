// import React from "react";
// import { Routes, Route, Link as RouterLink } from "react-router-dom";
// import { List, ListItemButton, ListItemText, Box, Typography } from "@mui/material";
// import Avatar from '@mui/material/Avatar';
// import { yellow } from '@mui/material/colors'
// import UsersContainer from "./UsersContainer";
// import CategoriesContainer from "./CategoriesContainer";
// import ExpensesContainer from "./ExpensesContainer";
// import NKCOrdersContainer from "./NKCOrdersContainer";
// import EarningsContainer from "./EarningsContainer";
// import Home from "./Home";

// const pages = [
//   {label:"Home",path:"/"},
//   {label: "Users", path:"/users"},
//   {label:"Categories",path:"/categories"},
//   { label: "Expenses", path: "/expenses" },
//   {label:"NKC-Orders", path:"/nkcOrders"},
//   { label: "Earnings", path: "/earnings" },
// ];

// const Dashboard = () => {
//   return (
//     <div>
//       <Box
//         sx={{
//           flexGrow: 1,
//           backgroundColor: "black",
//           color: "white", // Text color white
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//           padding: "10px 20px", // Add padding for better spacing
//         }}
//       >
//         <Box display="flex" alignItems="center">
//           <Avatar sx={{ bgcolor: yellow[900], width: 56, height: 56,fontWeight: 700 }}>NKC</Avatar>
//           <Typography variant="h6" component="h2" sx={{ fontWeight: 700, marginLeft: 2 }}>
//             Nellai Karupatti Coffee
//           </Typography>
//         </Box>
//         <List component="nav" sx={{ display: "flex", gap: "10px" }}>
//           {pages.map((page) => (
//             <ListItemButton key={page.label} component={RouterLink} to={page.path}>
//               <ListItemText primary={page.label} />
//             </ListItemButton>
//           ))}
//         </List>
//       </Box>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/users" element={<UsersContainer />} />
//         <Route path="/categories" element={<CategoriesContainer />} />
//         <Route path="/expenses" element={<ExpensesContainer />} />
//         <Route path="/nkcOrders" element={<NKCOrdersContainer />} />
//         <Route path="/earnings" element={<EarningsContainer />} />
//       </Routes>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import UsersContainer from "./UsersContainer";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import NKCOrdersContainer from "./NKCOrdersContainer";
import EarningsContainer from "./EarningsContainer";
import Home from "./Home";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Dashboard = () => {
  const dashboardStyle = {
    display: 'flex',
    height: '100vh'
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  };

  const contentStyle = {
    padding: '20px',
    flexGrow: 1,
    backgroundColor: '#f5f5f5'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={dashboardStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <Navbar />
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/categories" element={<CategoriesContainer />} />
              <Route path="/expenses" element={<ExpensesContainer />} />
              <Route path="/nkcOrders" element={<NKCOrdersContainer />} />
              <Route path="/earnings" element={<EarningsContainer />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;

