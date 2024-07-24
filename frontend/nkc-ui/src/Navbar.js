import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './BreadCrumbs';
import { useTheme } from '@mui/material/styles';

const NavBar = ({ onToggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = () => {
    if (searchTerm) {
      switch (searchTerm.toLowerCase()) {
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
        default:
          alert('Page not found');
      }
      setSearchTerm('');
    }
  };

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
