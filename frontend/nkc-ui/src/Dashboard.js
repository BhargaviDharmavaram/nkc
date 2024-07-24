import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import UsersContainer from "./UsersContainer";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import NKCOrdersContainer from "./NKCOrdersContainer";
import EarningsContainer from "./EarningsContainer";
import Home from "./Home";

const Dashboard = () => {
  const [mode, setMode] = useState('light'); // Default to light mode

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#303030',
        paper: mode === 'light' ? '#ffffff' : '#424242',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
      },
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    console.log('Theme toggled to:', mode === 'light' ? 'dark' : 'light');
  };

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
    backgroundColor: theme.palette.background.default
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={dashboardStyle}>
        <Sidebar onToggleTheme={toggleTheme}/>
        <div style={mainContentStyle}>
          <Navbar onToggleTheme={toggleTheme} />
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
