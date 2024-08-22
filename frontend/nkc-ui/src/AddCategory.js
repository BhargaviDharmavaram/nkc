import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddCategory = ({ addCategory }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name
        };

        try {
            const response = await axios.post('https://nkc-6nv4.onrender.com/api/add-category', formData);
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Category named as "${response.data.category.name}" added successfully!`,
            });
            // Update the categories list
            addCategory(response.data.category);
            setName('');
        } catch (error) {
            console.error('Error adding category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the category.'
            });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Box component="form" onSubmit={handleFormSubmit} sx={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Add Category</Typography>
                <TextField
                    fullWidth
                    label="Category Name"
                    variant="outlined"
                    value={name}
                    onChange={handleNameChange}
                />
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Category
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddCategory;
