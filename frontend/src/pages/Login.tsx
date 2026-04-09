import { useState } from "react";
import { loginUser } from "../services/authservice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      console.log("Login success", data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-r from-slate-100 via-gray-200 to-slate-300">
      {/* Card */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-87.5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inventory Login </h2>

        {/* Email */}
        <input 
        type="email"
        placeholder="Enter email"
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input 
        type="password" 
        placeholder="Enter password"
        className="w-full mb-6 p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button 
        onClick={handleLogin}
        className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 transition duration-300 font-semibold">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login