import { useState } from "react";
import { loginUser } from "../services/authservice";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Login = () => {

  const {dark, setDark} = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (loading) return;

    try {
      setLoading(true);

      const data = await loginUser(email, password);
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-linear-to-r from-slate-100 via-gray-200 to-slate-300 dark:bg-slate-900">

      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Card */}
      <div className="p-5 sm:p-8 space-y-4 rounded-2xl w-full max-w-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl bg-white/70 backdrop-blur-md shadow-xl dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-emerald-400/20">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Inventory Login </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-4 p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white border-gray-300 text-black dark:bg-slate-800 dark:text-white dark:border-slate-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full mb-4 p-3 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white border-gray-300 text-black dark:bg-slate-800 dark:text-white dark:border-slate-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Eye button */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-4 cursor-pointer transition duration-200 text-gray-500"
          >{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className=" w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600  hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-300 font-semibold cursor-pointer disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-5 text-gray-700 dark:text-gray-300">
          Dont have an account? {""}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-600 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login