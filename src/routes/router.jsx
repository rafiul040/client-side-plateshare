
import { createBrowserRouter } from "react-router";

import Home from './../Pages/Home/Home';
import ErrorPage from './../Pages/ErrorPage';
import HeroSection from './../Pages/Home/HeroSection';
import AvailableFoods from './../Pages/Foods/AvailableFoods';
import MainLayout from "../layouts/MainLayout";

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
      }
    ],
  },
]);