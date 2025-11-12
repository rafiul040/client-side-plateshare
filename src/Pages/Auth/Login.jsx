import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to continue your journey
        </p>

      
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="yourmail@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-xs" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 rounded-xl transition-all"
          >
            Login
          </button>

          
          <div className="flex items-center justify-center gap-4 mt-4">
            
            <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded-xl w-full hover:bg-gray-50">
              <FcGoogle className="text-xl" />
              <span>Google</span>
            </button>
          </div>

          
          <div className="flex justify-between text-xs text-gray-500 mt-6">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-gray-800 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
            <Link
              to="/terms"
              className="hover:underline text-gray-700 font-medium"
            >
              Terms & Conditions
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
