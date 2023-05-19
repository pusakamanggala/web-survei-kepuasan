import React, { createContext, useState } from "react";

// Create the global context
export const UserContext = createContext();

// Create a wrapper component to provide the context
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  // Function to set the user role when login is successful
  const setJwtUserRole = (jwt) => {
    const tokenParts = jwt.split("."); // Split the JWT into its three parts
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1])); // Decode the payload
      const { userId, role } = payload; // Extract the role from the payload
      setUserRole(role);
      setUserId(userId);
    } else {
      // Invalid JWT format
      console.error("Invalid JWT format");
    }
  };

  console.log(userRole);
  console.log(userId);

  return (
    <UserContext.Provider value={{ userId, userRole, setJwtUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
