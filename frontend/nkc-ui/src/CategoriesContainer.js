import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AddCategory from "./AddCategory";
import CategoriesList from "./CategoriesList";
import {
    Container,
    Typography,
    Paper,
    Button,
    Box,
    TextField
} from '@mui/material';

const CategoriesContainer = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:10000/api/get-categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (newCategory) => {
        console.log(newCategory)
        setCategories([...categories, newCategory]);
    };

    const removeCategory = async (categoryId, categoryName) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: `Are you sure to remove the category named "${categoryName}"?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:10000/api/delete-category/${categoryId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setCategories(categories.filter(category => category._id !== categoryId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data.error 
                    });
                    console.error('Error removing category:', error);
                }
            }
        });
    };

    const editCategory = async (categoryId, currentCategoryName) => {
        const newName = prompt('Enter the new category name:', currentCategoryName);
        if (newName) {
            try {
                const response = await axios.put(`http://localhost:10000/api/update-category/${categoryId}`, { name: newName });
                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                });
                const updatedCategories = categories.map(category => {
                    if (category._id === categoryId) {
                        return { ...category, name: newName };
                    }
                    return category;
                });
                setCategories(updatedCategories);
            } catch (error) {
                console.error('Error updating category:', error);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Categories Form
                </Typography>
                <AddCategory addCategory={addCategory} />
                <TextField
                    label="Search Categories"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <CategoriesList 
                    categories={filteredCategories} 
                    removeCategory={removeCategory} 
                    editCategory={editCategory} 
                />
                <Box marginTop={2}>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CategoriesContainer;
