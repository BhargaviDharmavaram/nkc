import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Typography color="textPrimary">Dashboard</Typography>
      {pathnames.length === 0 ? (
        <Typography color="textPrimary">Home</Typography>
      ) : (
        pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return index === pathnames.length - 1 ? (
            <Typography color="textPrimary" key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link color="inherit" to={to} key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
