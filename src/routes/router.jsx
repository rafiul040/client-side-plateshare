import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AvailableFoods from "../Pages/Foods/AvailableFoods";
import MainLayout from "../layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Pages/Profile/Profile";
import AddFood from './../Pages/Foods/AddFood';
import PrivateRoute from "./PrivateRoute";
import ManageMyFoods from "../Pages/Foods/ManageMyFoods";
import MyFoodRequests from "../Pages/Foods/MyFoodRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/availableFoods",
        Component: AvailableFoods,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
