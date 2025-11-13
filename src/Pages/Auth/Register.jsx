import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { registerUser, googleLogin } from "../../Hooks/useAuth";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);


  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Password validation
    if (password.length < 6) return toast.error("Password must be at least 6 characters long.");
    if (!/[A-Z]/.test(password)) return toast.error("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Password must contain at least one lowercase letter.");

    try {
      const user = await registerUser(email, password, name);
      if (photoURL) await updateProfile(user, { photoURL });

      setUser(user);
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/"), 500); 
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      setUser(user);
      toast.success("Logged in with Google!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create an account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full name</label>
            <input type="text" name="name" placeholder="Amélie Laurent" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Photo URL</label>
            <input type="text" name="photoURL" placeholder="https://example.com/photo.jpg" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input type="email" name="email" placeholder="email@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
          </div>
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 rounded-xl transition-all">Register</button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded-xl w-full hover:bg-gray-50">
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-6">
          <p>Already have an account? <Link to="/login" className="text-gray-800 font-semibold hover:underline">Sign in</Link></p>
          <Link to="/terms" className="hover:underline text-gray-700 font-medium">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
