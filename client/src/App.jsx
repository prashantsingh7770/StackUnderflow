// App.jsx
import Navbar from "./component/Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer.jsx";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />

      {/* Global toaster */}
      <Toaster richColors />

      <main className="flex-grow pt-[45px]">
        {/* 70px = navbar height */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;

// import React, { useContext, useEffect, useState } from "react";
// import "./App.css";
// import Routing from "./Pages/Routing";
// import SellerDashboard from "./Dashboard/SellerDashboard";
// import {
//   AuthContext,
//   getLocalStorage,
//   setLocalStorage,
// } from "./Context/AuthContext";
// export default function App() {
//   useEffect(() => {
//     const { adminsData, customersData } = getLocalStorage(); // ✅ Correct usage
//     setUserData({ adminsData, customersData });
//   }, []);
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   console.log(userData);

//   const handleLogin = (email, password) => {
//     if (
//       userData &&
//       userData.customersData.find(
//         (e) => e.email == email && e.password == password
//       )
//     ) {
//       setUser("customer");
//     } else if (
//       userData &&
//       userData.adminsData.find(
//         (e) => e.email == email && e.password == password
//       )
//     ) {
//       setUser("admin");
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <>
//       {/* {!user ? <Login handleLogin={handleLogin} /> : ''}
//       {user == 'customer' ? <Routing /> : ''}
//       {user =='admin' ? <SellerDashboard/> : ''} */}
//       <Routing />
//     </>
//   );
// }
