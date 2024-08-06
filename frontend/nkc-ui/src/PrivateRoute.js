// import React from "react";
// import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         Swal.fire({
//             icon: "warning",
//             title: "Login Required",
//             text: "You need to login to access this page.",
//             confirmButtonText: "Login",
//         }).then(() => {
//             // Redirect to the login page
//             window.location.href = "/login";
//         });
//         return null;
//     }

//     return Element;
// }

// export default PrivateRoute;


// // inside the render in return i can use the condition like localStorage.getItem('token') ? <Component {...props}/> : <Redirect to ={{pathname : "/login"}} /> 
// // or else based on the state variable userLOggedIn im checking the condition like if true then render Component else redirect to login page

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
