import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const links = (
    <>
      <NavLink to="/" className="hover:text-[#8d5751] p-3 text-[#ac7800] font-bold">
        Home
      </NavLink>
      <NavLink to="/availableFoods" className="hover:text-[#8d5751] font-bold p-3 text-[#ac7800]">
        Available Foods
      </NavLink>

      {user && (
        <>
          {/* <NavLink to="/add-Food" className="hover:text-primary">
            Add Food
          </NavLink>
          <NavLink to="/manage-my-foods" className="hover:text-primary">
            Manage My Foods
          </NavLink>
          <NavLink to="/my-food-request" className="hover:text-primary">
            My Food Requests
          </NavLink> */}
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-[#fef9ee] shadow-sm sticky top-0 z-50">
      
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-5 shadow"
          >
            {links}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost outline-none normal-case text-xl">
          <img src="https://i.ibb.co.com/wZLf9dTJ/logo-plateshare.png" className="w-16 h-16 rounded-4xl" alt="" /> <span className="font-semibold text-2xl text-[#b48518]">PLATESHARE</span>
        
        </NavLink>
      </div>

  
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 font-semibold px-1">
          {links}
        </ul>
      </div>

      
      <div className="navbar-end flex gap-2">
        {!user ? (
          <>
            <NavLink to="/login" className="btn hover:bg-amber-100 bg-[#ebc15e]">
              Login
            </NavLink>
            <NavLink to="/register" className="btn bg-amber-50 hover:bg-amber-200">
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={
                    user?.photoURL ||
                    "USER"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-5 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="p-3 font-semibold hover:bg-amber-200 hover:rounded-xl">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="p-3 font-semibold hover:bg-amber-200 hover:rounded-xl">
                <NavLink to="/add-food">Add Food</NavLink>
              </li>
              <li className="p-3 font-semibold hover:bg-amber-200 hover:rounded-xl">
                <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
              </li>
              <li className="p-3 font-semibold hover:bg-amber-200 hover:rounded-xl">
                <NavLink to="/my-food-request">My Food Request</NavLink>
              </li>
              <li className="p-3 font-semibold hover:bg-amber-200 hover:rounded-xl">
                <button onClick={logout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
