import React,{useState} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

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
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Add User Name</label> <br />
                <input type="text" value={name} onChange={handleName} /> <br />
                <input type='submit' value="Add User"  />
            </form>
        </div>
    )
}
export default AddUser