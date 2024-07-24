import React,{useState, useEffect} from "react";
import axios from 'axios'
import AddUser from "./AddUser";
import UsersList from "./UsersList";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'
import {
    Container,
    Typography,
    Paper,
    Button,
    Box
} from '@mui/material';

const UsersContainer = (props) =>{
    const [users,setUsers] = useState([])

    useEffect(()=>{
      axios.get('http://localhost:3777/api/get-users')
          .then((res)=>{
              console.log("users",res.data) // array of objects
              setUsers(res.data)
            })
          .catch((err)=>{
              console.log(err.message)
          })
    },[])

    const addUser = (newUser) => {
        setUsers([...users,newUser])
    }
    
    const removeUser = async (userId, userName) => {
        console.log('userId', userId, userName);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: `Are you sure to remove the user name called as ${userName}?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3777/api/delete-user/${userId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setUsers(users.filter(user => user._id !== userId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error.response.data.error}`
                    });
                    console.error('Error removing user:', error);
                }
            }
        });
    };
    
    const editUser = async (userId, currentUserName) => {
        const newName = prompt('Enter the new user name:', currentUserName);
        if (newName) {
            try {
                const response = await axios.put(`http://localhost:3777/api/update-user/${userId}`, { name: newName });
                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                });
                // Update the user in the state
                const updatedUsers = users.map(user => {
                    if (user._id === userId) {
                        return { ...user, name: newName };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    }
    return(
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    User Form
                </Typography>
                <AddUser addUser={addUser} />
                <UsersList users={users} removeUser={removeUser} editUser={editUser}/>
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
    )
}
export default UsersContainer