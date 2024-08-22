// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const Account = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         console.log('Token from localStorage  while fetching account info:', localStorage.getItem('token'));
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3777/api/account', {
//           headers: {
//             'x-auth': token
//           }
//         });
//         setUserData(response.data);
//       } catch (error) {
//         setError('Failed to fetch user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Account Information
//         </Typography>
//         <Typography variant="h6">Username: {userData.username}</Typography>
//         <Typography variant="h6">Email: {userData.email}</Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Account;
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import AccountForm from './AccountEditForm';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://nkc-6nv4.onrender.com/api/account', {
          headers: {
            'x-auth': token
          }
        });
        setUserData(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => setEditing(true);
  const handleCancelEdit = () => setEditing(false);
  const handleUpdate = async () => {
    try {
      const response = await axios.get('https://nkc-6nv4.onrender.com/api/account', {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      });
      setUserData(response.data);
    } catch (error) {
      setError('Failed to fetch updated user data');
    } finally {
      setEditing(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Information
        </Typography>
        {!editing ? (
          <div>
            <Typography variant="h6">Username: {userData.username}</Typography>
            <Typography variant="h6">Email: {userData.email}</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit
              </Button>
            </Box>
          </div>
        ) : (
          <AccountForm
            userData={userData}
            onCancel={handleCancelEdit}
            onUpdate={handleUpdate}
          />
        )}
      </Box>
    </Container>
  );
};

export default Account;
