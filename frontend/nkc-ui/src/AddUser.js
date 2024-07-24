import React,{useState} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { Box, Button, TextField, Typography } from '@mui/material';

const AddUser = (props) =>{
    const {addUser} = props
    const [name,setName] = useState('')
    
    const handleName = (e) => {
        setName(e.target.value)
    }
    

    const handleFormSubmit = async (e) => {
      e.preventDefault()
      const formData = {
          name: name
      }
      console.log('form data', formData)
      try {
          const response = await axios.post('http://localhost:3777/api/add-user', formData);
          console.log('Response from server:', response.data);
          // Show success message
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `User Name called as ${response.data.user.name} added successfully!`, // Display the user's name from the server
            });
            // Update the users list
          addUser(response.data.user)
          setName('')
        } 
        catch (error) {
          console.error('Error sending data to server:', error);
        }
    }
    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Box component="form" onSubmit={handleFormSubmit} sx={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Add UserName</Typography>
                <TextField
                    fullWidth
                    label="User Name"
                    variant="outlined"
                    value={name}
                    onChange={handleName}
                />
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add User
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default AddUser