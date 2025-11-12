
import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; 
const AuthContext = React.createContext();

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {
    user: null,
    logout: () => console.log("Logged out!"),
  };

  const links = (
    <>
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/availableFoods" className="hover:text-primary">
        Available Foods
      </NavLink>

      {user && (
        <>
          <NavLink to="/addFood" className="hover:text-primary">
            Add Food
          </NavLink>
          <NavLink to="/manageFoods" className="hover:text-primary">
            Manage My Foods
          </NavLink>
          <NavLink to="/myRequests" className="hover:text-primary">
            My Food Requests
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
    
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
            {!user ? (
              <NavLink to="/login" className="btn btn-primary mt-2">
                Login
              </NavLink>
            ) : (
              <button
                onClick={logout}
                className="btn btn-error text-white mt-2"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          🍽 PlateShare
        </NavLink>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 font-semibold px-1">
          {links}
        </ul>
      </div>

      
      <div className="navbar-end">
        {!user ? (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={user.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/addFood">Add Food</NavLink>
              </li>
              <li>
                <NavLink to="/manageFoods">Manage My Foods</NavLink>
              </li>
              <li>
                <NavLink to="/myRequests">My Food Requests</NavLink>
              </li>
              <li>
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
