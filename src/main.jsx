// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { RouterProvider } from 'react-router'
// import { router } from './routes/router';
// import { AuthProvider } from './Context/AuthProvider.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//     <RouterProvider router={router}></RouterProvider>
    
//     </AuthProvider>
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { AuthProvider } from "./Context/AuthProvider.jsx";

// Toast Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      
      {/* Toast Must Be Inside React */}
      <ToastContainer position="top-center" />
    </AuthProvider>
  </StrictMode>
);
