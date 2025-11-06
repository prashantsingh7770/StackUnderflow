import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductContextProvider from './Context/ProductContext.jsx'
import 'flowbite';
import { RouterProvider } from 'react-router-dom';
import router from "./router.jsx";
import { AuthProvider } from './Context/AuthContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductContextProvider>
        <RouterProvider router={router} />
      </ProductContextProvider>
    </AuthProvider>
  </StrictMode>,
)
