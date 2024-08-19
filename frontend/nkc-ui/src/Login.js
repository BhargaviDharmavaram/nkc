import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:10000/api/login', formData);
      login(response.data.token); // Update auth context
      console.log('Login successful, navigating to home...');
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "You have successfully logged in.",
        })
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Invalid email or password' });
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        text: error.response?.data?.errors
        })
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            {errors.general && (
              <Grid item xs={12}>
                <Typography color="error">{errors.general}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography align="center" mt={2}>
          Don't have an account? <Link to="/register">Register</Link> Here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
