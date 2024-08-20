// import React, { useState } from 'react';
// import { AppBar, Toolbar, TextField, IconButton, InputAdornment, Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from './BreadCrumbs';
// import { useTheme } from '@mui/material/styles';

// const NavBar = ({ onToggleTheme }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const handleSearch = () => {
//     if (searchTerm) {
//       switch (searchTerm.toLowerCase()) {
//         case 'users':
//           navigate('/users');
//           break;
//         case 'categories':
//           navigate('/categories');
//           break;
//         case 'expenses':
//           navigate('/expenses');
//           break;
//         case 'nkc orders':
//           navigate('/nkcorders');
//           break;
//         case 'earnings':
//           navigate('/earnings');
//           break;
//         default:
//           alert('Page not found');
//       }
//       setSearchTerm('');
//     }
//   };

//   return (
//     <AppBar position="static" sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
//       <Toolbar>
//         <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
//           <Breadcrumbs />
//         </Box>
//         <IconButton onClick={onToggleTheme}>
//           <DarkModeIcon />
//         </IconButton>
//         <TextField
//           variant="outlined"
//           placeholder="Search here..."
//           size="large"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') handleSearch();
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSearch}>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           sx={{ bgcolor: theme.palette.background.paper, '& .MuiOutlinedInput-root': { bgcolor: theme.palette.background.paper } }}
//         />
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;
// import React, { useState, useContext } from 'react';
// import { AppBar, Toolbar, TextField, IconButton, InputAdornment, Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Logout from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from './BreadCrumbs';
// import { useTheme } from '@mui/material/styles';
// import AuthContext from './AuthContext';

// const NavBar = ({ onToggleTheme }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { logout } = useContext(AuthContext);

//   const handleSearch = () => {
//     if (searchTerm) {
//       switch (searchTerm.toLowerCase()) {
//         case 'users':
//           navigate('/users');
//           break;
//         case 'categories':
//           navigate('/categories');
//           break;
//         case 'expenses':
//           navigate('/expenses');
//           break;
//         case 'nkc orders':
//           navigate('/nkcorders');
//           break;
//         case 'earnings':
//           navigate('/earnings');
//           break;
//         default:
//           alert('Page not found');
//       }
//       setSearchTerm('');
//     }
//   };

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login'); // Redirect to login page after logout
  // };

//   return (
//     <AppBar position="static" sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
//       <Toolbar>
//         <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
//           <Breadcrumbs />
//         </Box>
//         <IconButton onClick={onToggleTheme}>
//           <DarkModeIcon />
//         </IconButton>
//         <TextField
//           variant="outlined"
//           placeholder="Search here..."
//           size="large"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') handleSearch();
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSearch}>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           sx={{ bgcolor: theme.palette.background.paper, '& .MuiOutlinedInput-root': { bgcolor: theme.palette.background.paper } }}
//         />
//         <IconButton
//           color="inherit"
//           onClick={() => navigate('/account')}
//           sx={{ ml: 2, color: theme.palette.text.primary }}
//         >
//           <AccountCircle />
//         </IconButton>
//         <IconButton
//           color="inherit"
//           onClick={handleLogout}
//           sx={{ ml: 2, color: theme.palette.text.primary }}
//         >
//           <Logout />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;


import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, TextField, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from './BreadCrumbs';
import { useTheme } from '@mui/material/styles';
import AuthContext from './AuthContext';

const NavBar = ({ onToggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useContext(AuthContext);

  const handleSearch = () => {
    if (searchTerm) {
      switch (searchTerm.toLowerCase()) {
        case 'home':
          navigate('/home');
          break;
        case 'users':
          navigate('/users');
          break;
        case 'categories':
          navigate('/categories');
          break;
        case 'expenses':
          navigate('/expenses');
          break;
        case 'nkc orders':
          navigate('/nkcorders');
          break;
        case 'earnings':
          navigate('/earnings');
          break;
        case 'account':
          navigate('/account');
          break;
        default:
          alert('Page not found');
      }
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    //navigate('/login'); // Redirect to login page after logout
  };

  // Conditionally render content based on the current route
  const renderNavContent = () => {
    if (location.pathname === '/login' || location.pathname === '/') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}
          >
            Welcome to NKC
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <Breadcrumbs />
        </Box>
        <IconButton onClick={onToggleTheme}>
          <DarkModeIcon />
        </IconButton>
        <TextField
          variant="outlined"
          placeholder="Search here..."
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: theme.palette.background.paper, '& .MuiOutlinedInput-root': { bgcolor: theme.palette.background.paper } }}
        />
        <IconButton
          color="inherit"
          onClick={() => navigate('/account')}
          sx={{ ml: 2, color: theme.palette.text.primary }}
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{ ml: 2, color: theme.palette.text.primary }}
        >
          <Logout />
        </IconButton>
      </>
    );
  };

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        {renderNavContent()}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
