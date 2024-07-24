import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './BreadCrumbs';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
    <AppBar position="static" sx={{ mb: 2, backgroundColor: 'white' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <Breadcrumbs />
        </Box>
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
          sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { bgcolor: 'white' } }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
