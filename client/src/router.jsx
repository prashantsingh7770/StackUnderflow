// router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./Pages/AuthPage.jsx";
import Category from "./Pages/Category.jsx";
import Contact from "./Pages/Contact.jsx";
import Cart from "./Pages/Cart.jsx";
import ProductDetails from "./Pages/ProductDetail.jsx";
import Home from "./Pages/Home.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Trending from "./Pages/Trending.jsx";
import AdminDashboard from "./Dashboard/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout with Navbar + <Outlet>
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <Category /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "home", element: <Home /> },
      { path: "checkout", element: <Checkout /> },
      { path: "trending", element: <Trending/> },
      { path: "login", element: <AuthPage/> },
      { path: "home", element: <Home/> },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard/>, 
  },
]);

export default router;