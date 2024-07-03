import React,{useState, useEffect} from "react";
import axios from 'axios'
import AddUser from "./AddUser";
import UsersList from "./UsersList";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'

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
    // const removeItem = (id) =>{
    //     const data = users.filter((ele)=>{
    //         return ele._id !== id
    //     })
    //     setUsers(data)
    // }
    
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
                        text: 'An error occurred while removing the user.'
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
        <div>
            <h2> Total Users - {users.length}</h2>
            <AddUser addUser={addUser} />
            <UsersList users={users} removeUser={removeUser} editUser={editUser}/>
            <Link to="/">Back to Dashboard</Link>
        </div>
    )
}
export default UsersContainer