
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UsersContainer from './UsersContainer';
import CategoriesContainer from './CategoriesContainer';
import ExpensesContainer from './ExpensesContainer';
import NKCOrdersContainer from './NKCOrdersContainer';
import EarningsContainer from './EarningsContainer';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Account from './Account';
import AuthContext from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [mode, setMode] = React.useState('light');

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
        {isAuthenticated && <Sidebar onToggleTheme={toggleTheme} />}
        <div style={mainContentStyle}>
          {/* {isAuthenticated && <Navbar onToggleTheme={toggleTheme} />} */}
          <Navbar onToggleTheme={toggleTheme} />
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Register />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
              <Route path="/home" element={isAuthenticated && <Home /> } />
              <Route path="/account" element={isAuthenticated && <Account /> } />
              <Route path="/users" element={isAuthenticated && <UsersContainer />} />
              <Route path="/categories" element={isAuthenticated && <CategoriesContainer /> } />
              <Route path="/expenses" element={isAuthenticated && <ExpensesContainer /> } />
              <Route path="/nkcOrders" element={isAuthenticated && <NKCOrdersContainer /> } />
              <Route path="/earnings" element={isAuthenticated && <EarningsContainer /> } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};


export default Dashboard;

