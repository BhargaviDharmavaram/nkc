
import React from "react";
import Dashboard from "./Dashboard";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return(
    <div>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
    </div>
  )
};

export default App;
