
import { createBrowserRouter } from "react-router";

import Home from './../Pages/Home/Home';
import ErrorPage from './../Pages/ErrorPage';
import HeroSection from './../Pages/Home/HeroSection';
import AvailableFoods from './../Pages/Foods/AvailableFoods';
import MainLayout from "../layouts/MainLayout";
import Login from './../Pages/Auth/Login';
import Register from './../Pages/Auth/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
        index: true,
        path: '/availableFoods',
        Component: AvailableFoods
      },
      {
        index: true,
        path: '/login',
        Component: Login
      },
      {
        index: true,
        path: '/register',
        Component: Register
      },
    ],
  },
]);