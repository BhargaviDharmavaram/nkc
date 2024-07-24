import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, CssBaseline } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      backgroundColor: '#343a40',
      color: '#fff',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#9C27B0',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  listItem: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
  listItemIcon: {
    color: '#fff',
    fontSize: 'large',
  },
  listItemText: {
    color: '#fff',
    fontSize: '2.6rem', // Increased font size
  },
  upgradeButton: {
    backgroundColor: '#e91e63',
    color: '#fff',
    marginTop: 'auto',
    padding: theme.spacing(1),
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
  selectedListItem: {
    backgroundColor: '#d81b60',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
      >
        <Box className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.title}>
            Nellai Karupatti Coffee
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem 
            component={Link} 
            to="/" 
            className={`${classes.listItem} ${location.pathname === '/' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem 
            component={Link} 
            to="/users" 
            className={`${classes.listItem} ${location.pathname === '/users' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem 
            component={Link} 
            to="/categories" 
            className={`${classes.listItem} ${location.pathname === '/categories' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><CategoryIcon /></ListItemIcon>
            <ListItemText primary="Categories" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem 
            component={Link} 
            to="/expenses" 
            className={`${classes.listItem} ${location.pathname === '/expenses' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Expenses" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem 
            component={Link} 
            to="/nkcOrders" 
            className={`${classes.listItem} ${location.pathname === '/nkcOrders' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="NKC Orders" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem 
            component={Link} 
            to="/earnings" 
            className={`${classes.listItem} ${location.pathname === '/earnings' ? classes.selectedListItem : ''}`}
          >
            <ListItemIcon className={classes.listItemIcon}><AttachMoneyIcon /></ListItemIcon>
            <ListItemText primary="Earnings" classes={{ primary: classes.listItemText }} />
          </ListItem>
        </List>
        <Box className={classes.upgradeButton}>
          NKC
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;