// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const AddExpense = (props) => {
//     const { addExpense, users, categories, isEditMode, currentExpense, onEditSubmit, onCancelEdit } = props;

//     const [dateTime, setDateTime] = useState(new Date());
//     const [category, setCategory] = useState('');
//     const [user, setUser] = useState('');
//     const [amount, setAmount] = useState('');

//     useEffect(() => {
//         if (isEditMode && currentExpense) {
//             setDateTime(new Date(currentExpense.dateTime));
//             setCategory(currentExpense.category._id);
//             setUser(currentExpense.user._id);
//             setAmount(currentExpense.amount);
//         } else {
//             setDateTime(new Date());
//             setCategory('');
//             setUser('');
//             setAmount('');
//         }
//     }, [isEditMode, currentExpense]);

//     const handleCategoryChange = (e) => setCategory(e.target.value);
//     const handleUserChange = (e) => setUser(e.target.value);
//     const handleAmountChange = (e) => setAmount(e.target.value);

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const formData = {
//             dateTime: dateTime.toISOString(),
//             month: dateTime.getMonth() + 1,
//             year: dateTime.getFullYear(),
//             category,
//             user,
//             amount
//         };

//         try {
//             if (isEditMode && currentExpense && currentExpense._id) {
//                 onEditSubmit({ ...formData, _id: currentExpense._id });
//             } else {
//                 addExpense(formData);
//             }

//             // Reset form fields after submission
//             setDateTime(new Date());
//             setCategory('');
//             setUser('');
//             setAmount('');
//         } catch (error) {
//             console.error('Error sending data to server:', error);
//         }
//     };

//     const handleCancel = () => {
//         // Clear form fields
//         setDateTime(new Date());
//         setCategory('');
//         setUser('');
//         setAmount('');

//         // Reset edit mode and current expense
//         onCancelEdit();
//     };

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
//             <form onSubmit={handleFormSubmit} style={{ textAlign: 'center', width: '80%' }}>
//                 <label>Date and Time</label> <br />
//                 <DatePicker
//                     selected={dateTime}
//                     onChange={date => setDateTime(date)}
//                     showTimeSelect
//                     dateFormat="Pp"
//                 /> <br />
//                 <label>Category</label> <br />
//                 <select value={category} onChange={handleCategoryChange}>
//                     <option value="">Select Category</option>
//                     {categories.map(category => (
//                         <option key={category._id} value={category._id}>{category.name}</option>
//                     ))}
//                 </select> <br />
//                 <label>User</label> <br />
//                 <select value={user} onChange={handleUserChange}>
//                     <option value="">Select User</option>
//                     {users.map(user => (
//                         <option key={user._id} value={user._id}>{user.name}</option>
//                     ))}
//                 </select> <br />
//                 <label>Amount</label> <br />
//                 <input type="number" value={amount} onChange={handleAmountChange} /> <br />
//                 {isEditMode ? (
//                     <React.Fragment>
//                         <input type="submit" value="Update Expense" />
//                         <button type="button" onClick={handleCancel}>Cancel</button>
//                     </React.Fragment>
//                 ) : (
//                     <input type="submit" value="Add Expense" />
//                 )}
//             </form>
//         </div>
//     );
// }

// export default AddExpense;


import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddExpense = (props) => {
    const { addExpense, users, categories, isEditMode, currentExpense, onEditSubmit, onCancelEdit } = props;

    const [dateTime, setDateTime] = useState(null);
    const [category, setCategory] = useState('');
    const [user, setUser] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (isEditMode && currentExpense) {
            setDateTime(new Date(currentExpense.dateTime));
            setCategory(currentExpense.category._id);
            setUser(currentExpense.user._id);
            setAmount(currentExpense.amount);
        } else {
            setDateTime(null);
            setCategory('');
            setUser('');
            setAmount('');
        }
    }, [isEditMode, currentExpense]);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleUserChange = (e) => setUser(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            dateTime: dateTime.toISOString(),
            month: dateTime.getMonth() + 1,
            year: dateTime.getFullYear(),
            category,
            user,
            amount
        };

        try {
            if (isEditMode && currentExpense && currentExpense._id) {
                onEditSubmit({ ...formData, _id: currentExpense._id });
            } else {
                addExpense(formData);
            }

            // Reset form fields after submission
            setDateTime(null);
            setCategory('');
            setUser('');
            setAmount('');
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const handleCancel = () => {
        // Clear form fields
        setDateTime(null);
        setCategory('');
        setUser('');
        setAmount('');

        // Reset edit mode and current expense
        onCancelEdit();
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Box component="form" onSubmit={handleFormSubmit} sx={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold',fontSize: '20px' }} mb={2}>Date and Time</Typography>
                <DatePicker
                    selected={dateTime}
                    onChange={date => setDateTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    customInput={<TextField fullWidth />}
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold',fontSize: '20px' }}>Category</Typography>
                <Select
                    fullWidth
                    value={category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value=""><em>Select Category</em></MenuItem>
                    {categories.map(category => (
                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                    ))}
                </Select>
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold',fontSize: '20px' }}>User</Typography>
                <Select
                    fullWidth
                    value={user}
                    onChange={handleUserChange}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value=""><em>Select User</em></MenuItem>
                    {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                    ))}
                </Select>
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold',fontSize: '20px' }}>Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                />
                <Box mt={3}>
                    {isEditMode ? (
                        <>
                            <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                                Update Expense
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" type="submit">
                            Add Expense
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AddExpense;
