import React, { useState, useEffect } from "react";
import axios from 'axios'
import AddCategory from "./AddCategory";
import CategoriesList from "./CategoriesList";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'


const CategoriesContainer = (props) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3777/api/get-categories')
            .then((res) => {
                console.log("categories", res.data); // array of objects
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const removeCategory = async (categoryId, categoryName) => {
        console.log('categoryId', categoryId, categoryName);
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
                    const response = await axios.delete(`http://localhost:3777/api/delete-category/${categoryId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setCategories(categories.filter(category => category._id !== categoryId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while removing the category.'
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
                const response = await axios.put(`http://localhost:3777/api/update-category/${categoryId}`, { name: newName });
                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                });
                // Update the category in the state
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

    return (
        <div>
            <h2> Total Categories - {categories.length}</h2>
            <AddCategory addCategory={addCategory} />
            <CategoriesList categories={categories} removeCategory={removeCategory} editCategory={editCategory} />
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
};

export default CategoriesContainer;
