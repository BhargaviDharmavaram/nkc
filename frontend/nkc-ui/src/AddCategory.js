import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCategory = (props) => {
    const { addCategory } = props;
    const [name, setName] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name
        };
        console.log('form data', formData);
        try {
            const response = await axios.post('http://localhost:3777/api/add-category', formData);
            console.log('Response from server:', response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Category named as "${response.data.category.name}" added successfully!`, // Display the category's name from the server
            });
            // Update the categories list
            addCategory(response.data.category);
            setName('');
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Add Category Name</label> <br />
                <input type="text" value={name} onChange={handleName} /> <br />
                <input type='submit' value="Add Category" />
            </form>
        </div>
    );
};

export default AddCategory;
