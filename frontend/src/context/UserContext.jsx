import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const UserProvider = ({ children }) => {
  const [currUser, setcurrUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setcurrUser(userData);
      } catch (err) {
        console.error("Invalid JSON in localStorage for 'user'", err);
        localStorage.removeItem("user"); // Clean up corrupted data
        setcurrUser(null);
      }
    }
  }, []);

  const update = (data) => {
    setcurrUser(data);

    if (data) {
      try {
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to save user to localStorage", err);
      }
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (currUser) {
      try {
        localStorage.setItem("user", JSON.stringify(currUser));
      } catch (err) {
        console.error("Failed to save user to localStorage", err);
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;
