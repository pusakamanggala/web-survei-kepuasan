import React, { createContext, useState } from "react";

// Create the global context
export const UserContext = createContext();

// Create a wrapper component to provide the context
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  // Initialize the survey state using the useState hook
  const [survey, setSurvey] = useState(() => {
    // Retrieve the stored survey from the browser's local storage
    const storedSurvey = localStorage.getItem("survey");
    // If a stored survey exists, parse it from JSON format
    // Otherwise, set the initial value of survey to null
    return storedSurvey ? JSON.parse(storedSurvey) : null;
  });

  // Function to set the user role and id when login is successful
  const setUser = (role, id) => {
    setUserRole(role);
    setUserId(id);
  };

  // Function to update the survey and store it in local storage
  const updateSurvey = (newSurvey) => {
    setSurvey(newSurvey);
    localStorage.setItem("survey", JSON.stringify(newSurvey));
  };

  return (
    <UserContext.Provider
      value={{ userRole, userId, setUser, survey, setSurvey: updateSurvey }}
    >
      {children}
    </UserContext.Provider>
  );
};
