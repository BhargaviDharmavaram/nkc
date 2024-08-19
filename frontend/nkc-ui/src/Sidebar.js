// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, CssBaseline, IconButton } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import CategoryIcon from '@mui/icons-material/Category';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: 280,
//     flexShrink: 0,
//     '& .MuiDrawer-paper': {
//       width: 290,
//       backgroundColor: '#343a40',
//       color: '#fff',
//     },
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(2),
//     //backgroundColor: '#d81b60',
//   },
//   title: {
//     fontWeight: 'bold',
//     color: '#fff',
//     fontSize: '1.5rem', // Increase the font size
//   },
//   listItem: {
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#d81b60',
//     },
//   },
//   listItemIcon: {
//     color: '#fff',
//     fontSize: '1.5rem',
//   },
//   listItemText: {
//     color: '#fff',
//     fontSize: '1.2rem', // Increased font size
//   },
//   upgradeButton: {
//     backgroundColor: '#e91e63',
//     color: '#fff',
//     marginTop: 'auto',
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: '#d81b60',
//     },
//   },
//   selectedListItem: {
//     backgroundColor: '#d81b60',
//   },
// }));

// const Sidebar = ({ onToggleTheme }) => {
//   const classes = useStyles();
//   const location = useLocation();

//   return (
//     <>
//       <CssBaseline />
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         anchor="left"
//       >
//         <Box className={classes.toolbar}>
//           <Typography variant="h6" noWrap className={classes.title}>
//             Nellai Karupatti Coffee
//           </Typography>
//         </Box>
//         <Divider />
//         <List>
//           <ListItem 
//             component={Link} 
//             to="/home" 
//             className={`${classes.listItem} ${location.pathname === '/home' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><HomeIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIcon>
//             <ListItemText primary="Home"
//             //primaryTypographyProps={{ style: { fontSize: '1.5rem', fontWeight: 'bold' } }} 
//              classes={{ primary: classes.listItemText }} />
//           </ListItem>
//           <ListItem 
//             component={Link} 
//             to="/users" 
//             className={`${classes.listItem} ${location.pathname === '/users' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><PeopleIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIcon>
//             <ListItemText primary="Users" classes={{ primary: classes.listItemText }} />
//           </ListItem>
//           <ListItem 
//             component={Link} 
//             to="/categories" 
//             className={`${classes.listItem} ${location.pathname === '/categories' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><CategoryIcon  style={{ fontSize: '2rem', color: '#ff669a' }}/></ListItemIcon>
//             <ListItemText primary="Categories" classes={{ primary: classes.listItemText }} />
//           </ListItem>
//           <ListItem 
//             component={Link} 
//             to="/expenses" 
//             className={`${classes.listItem} ${location.pathname === '/expenses' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><ReceiptIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIcon>
//             <ListItemText primary="Expenses" classes={{ primary: classes.listItemText }} />
//           </ListItem>
//           <ListItem 
//             component={Link} 
//             to="/nkcOrders" 
//             className={`${classes.listItem} ${location.pathname === '/nkcOrders' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><ReceiptIcon style={{ fontSize: '2rem', color: '#ff669a' }}/></ListItemIcon>
//             <ListItemText primary="NKC Orders" classes={{ primary: classes.listItemText }} />
//           </ListItem>
//           <ListItem 
//             component={Link} 
//             to="/earnings" 
//             className={`${classes.listItem} ${location.pathname === '/earnings' ? classes.selectedListItem : ''}`}
//           >
//             <ListItemIcon className={classes.listItemIcon}><AttachMoneyIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIcon>
//             <ListItemText primary="Earnings" classes={{ primary: classes.listItemText }}  />
//           </ListItem>
//         </List>
//         <Box className={classes.upgradeButton}>
//         <IconButton onClick={onToggleTheme}>
//             <DarkModeIcon  />
//           </IconButton>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, CssBaseline, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styled from '@emotion/styled';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 290,
    backgroundColor: '#343a40',
    color: '#fff',
  },
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff',
  fontSize: '1.5rem', // Increase the font size
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d81b60',
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  color: '#fff',
  fontSize: '1.5rem',
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  color: '#fff',
  fontSize: '1.2rem', // Increased font size
}));

const UpgradeButton = styled(Box)(({ theme }) => ({
  backgroundColor: '#e91e63',
  color: '#fff',
  marginTop: 'auto',
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d81b60',
  },
}));

// const SelectedListItem = styled(ListItem)(({ theme }) => ({
//   backgroundColor: '#d81b60',
// }));

const Sidebar = ({ onToggleTheme }) => {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <DrawerStyled
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Title variant="h6" noWrap>
            Nellai Karupatti Coffee
          </Title>
        </Toolbar>
        <Divider />
        <List>
          <ListItemStyled
            component={Link}
            to="/home"
            className={location.pathname === '/home' ? 'selected' : ''}
          >
            <ListItemIconStyled><HomeIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIconStyled>
            <ListItemTextStyled primary="Home" />
          </ListItemStyled>
          <ListItemStyled
            component={Link}
            to="/users"
            className={location.pathname === '/users' ? 'selected' : ''}
          >
            <ListItemIconStyled><PeopleIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIconStyled>
            <ListItemTextStyled primary="Users" />
          </ListItemStyled>
          <ListItemStyled
            component={Link}
            to="/categories"
            className={location.pathname === '/categories' ? 'selected' : ''}
          >
            <ListItemIconStyled><CategoryIcon style={{ fontSize: '2rem', color: '#ff669a' }}/></ListItemIconStyled>
            <ListItemTextStyled primary="Categories" />
          </ListItemStyled>
          <ListItemStyled
            component={Link}
            to="/expenses"
            className={location.pathname === '/expenses' ? 'selected' : ''}
          >
            <ListItemIconStyled><ReceiptIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIconStyled>
            <ListItemTextStyled primary="Expenses" />
          </ListItemStyled>
          <ListItemStyled
            component={Link}
            to="/nkcOrders"
            className={location.pathname === '/nkcOrders' ? 'selected' : ''}
          >
            <ListItemIconStyled><ReceiptIcon style={{ fontSize: '2rem', color: '#ff669a' }}/></ListItemIconStyled>
            <ListItemTextStyled primary="NKC Orders" />
          </ListItemStyled>
          <ListItemStyled
            component={Link}
            to="/earnings"
            className={location.pathname === '/earnings' ? 'selected' : ''}
          >
            <ListItemIconStyled><AttachMoneyIcon style={{ fontSize: '2rem', color: '#ff669a' }} /></ListItemIconStyled>
            <ListItemTextStyled primary="Earnings" />
          </ListItemStyled>
        </List>
        <UpgradeButton>
          <IconButton onClick={onToggleTheme}>
            <DarkModeIcon />
          </IconButton>
        </UpgradeButton>
      </DrawerStyled>
    </>
  );
};

export default Sidebar;
