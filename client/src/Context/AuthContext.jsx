// import React, { createContext, useEffect, useState } from 'react'
// // Customers
// const customers = [
//   { id: 1, email: "user1@example.com", password: "123" },
//   { id: 2, email: "user2@example.com", password: "123" },
//   { id: 3, email: "user3@example.com", password: "123" },
//   { id: 4, email: "user4@example.com", password: "123" },
//   { id: 5, email: "user5@example.com", password: "123" }
// ]

// // Admin
// const admins = [
//   { id: 1, email: "admin@example.com", password: "123" }
// ]

// // Save to localStorage
// export const setLocalStorage = () => {
//   localStorage.setItem('customers', JSON.stringify(customers))
//   localStorage.setItem('admins', JSON.stringify(admins))
// }

// // Get from localStorage
// export const getLocalStorage = () => {
//   const customersData = JSON.parse(localStorage.getItem('customers')) || []
//   const adminsData = JSON.parse(localStorage.getItem('admins')) || []
//   return { customersData, adminsData }
// }

// // Create Context
// export const AuthContext = createContext()

// // Provider
// const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState({ customersData: [], adminsData: [] })

//   useEffect(() => {
//     // Ensure data exists in localStorage
//     setLocalStorage()
//     const { customersData, adminsData } = getLocalStorage()
//     setUserData({ customersData, adminsData })
//   }, [])

//   return (
//     <AuthContext.Provider value={userData}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

// AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const isAuthenticated = !!token;

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
