import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [phone, setPhone] = useState("");

  const BACKEND_URL = "http://localhost:5000/users";

  
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  
  const updateBackendProfile = async (updatedUser) => {
    await fetch(`${BACKEND_URL}/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in!");

    try {
    
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const updatedUser = {
        uid: user.uid,
        name,
        email: user.email,
        photoURL,
        phone,
      };

      
      await updateBackendProfile(updatedUser);

      
      setUser({
        ...user,
        displayName: name,
        photoURL,
        phoneNumber: phone,
      });

    
      setName("");
      setPhotoURL("");
      setPhone("");

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!user)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Please login to access your profile.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Photo URL</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            
            placeholder="Photo URL"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            placeholder="+8801XXXXXXXXX"
        
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Email (Read Only)</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;


// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../Context/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const BACKEND_URL = "http://localhost:5000/users";

//   // Load user data into input fields
//   useEffect(() => {
//     if (user) {
//       setName(user.displayName || "");
//       setPhotoURL(user.photoURL || "");
//       setPhone(user.phoneNumber || "");
//     }
//   }, [user]);

//   // Update profile to backend DB
//   const updateBackendProfile = async (updatedUser) => {
//     await fetch(`${BACKEND_URL}/${user.email}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     });
//   };

//   // Update Firebase + Backend + Reset Form
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!user) {
//       toast.error("You must be logged in!");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Firebase update
//       await updateProfile(user, {
//         displayName: name,
//         photoURL: photoURL,
//       });

//       const updatedUser = {
//         uid: user.uid,
//         name,
//         email: user.email,
//         photoURL,
//         phone,
//       };

//       // Backend update
//       await updateBackendProfile(updatedUser);

//       // Update local context
//       setUser({
//         ...user,
//         displayName: name,
//         photoURL,
//         phoneNumber: phone,
//       });

//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!user)
//     return (
//       <div className="text-center py-20 text-xl font-semibold">
//         Please login to access your profile.
//       </div>
//     );

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
//       <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

//       {/* Profile Display Section */}
//       <div className="flex flex-col items-center mb-8 p-6 bg-gray-50 rounded-xl">
//         <img
//           src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
//         />
//         <h3 className="text-xl font-bold mt-4 text-gray-800">
//           {user.displayName || "No Name Set"}
//         </h3>
//         <p className="text-gray-600 mt-1">{user.email}</p>
//         {user.phoneNumber && (
//           <p className="text-gray-500 mt-1">{user.phoneNumber}</p>
//         )}
//       </div>

//       {/* Edit Profile Form */}
//       <form onSubmit={handleUpdate} className="space-y-5">
//         <div>
//           <label className="block text-sm mb-1 text-gray-600 font-medium">
//             Full Name
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//             value={name}
//             placeholder="Enter your full name"
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1 text-gray-600 font-medium">
//             Photo URL
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//             value={photoURL}
//             placeholder="Paste your photo URL here"
//             onChange={(e) => setPhotoURL(e.target.value)}
//           />
//           {photoURL && (
//             <div className="mt-2">
//               <p className="text-xs text-gray-500 mb-1">Preview:</p>
//               <img
//                 src={photoURL}
//                 alt="Preview"
//                 className="w-16 h-16 rounded-lg object-cover border"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm mb-1 text-gray-600 font-medium">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//             value={phone}
//             placeholder="+8801XXXXXXXXX"
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1 text-gray-600 font-medium">
//             Email (Read Only)
//           </label>
//           <input
//             type="email"
//             value={user.email}
//             readOnly
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed text-gray-600"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full ${
//             isLoading 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-yellow-400 hover:bg-yellow-500 transform hover:scale-105'
//           } text-gray-900 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center`}
//         >
//           {isLoading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Updating...
//             </>
//           ) : (
//             'Update Profile'
//           )}
//         </button>
//       </form>

//       {/* Current Profile Info Summary */}
//       <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//         <h4 className="font-semibold text-blue-800 mb-2">Profile Summary</h4>
//         <div className="text-sm text-blue-700 space-y-1">
//           <p><strong>Name:</strong> {user.displayName || "Not set"}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phoneNumber || "Not set"}</p>
//           <p><strong>Profile Photo:</strong> {user.photoURL ? "Set" : "Not set"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;