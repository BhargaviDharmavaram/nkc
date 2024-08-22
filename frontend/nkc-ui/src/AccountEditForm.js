import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, CircularProgress, Grid } from '@mui/material';
import Swal from 'sweetalert2';

const AccountForm = ({ userData, onCancel, onUpdate }) => {
    console.log('userData', userData)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        password: ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData.id)
    setLoading(true);
    setError(null);
    try {
        const response = await axios.put(`https://nkc-6nv4.onrender.com/api/update/${userData.id}`, formData, {
            headers: {
              'x-auth': localStorage.getItem('token')
            }
          });
    
          // Use SweetAlert2 to display the message from the response
          Swal.fire({
            icon: 'success',
            title: "User updated sucessfully",
            text: response.data.message || 'Something went wrong'
          });
      onUpdate();
    } catch (error) {
      setError('Failed to update user details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        {/* <Typography variant="h4" gutterBottom>
          Edit Account Information
        </Typography> */}
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default AccountForm;
