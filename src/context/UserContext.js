import React, { createContext, useState } from "react";

// Create the global context
export const UserContext = createContext();

// Create a wrapper component to provide the context
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  // Function to set the user role and id when login is successful
  const setUser = (role, id) => {
    setUserRole(role);
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userRole, userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
