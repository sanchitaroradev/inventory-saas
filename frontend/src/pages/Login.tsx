import { useState } from "react";
import { loginUser } from "../services/authservice";
import { Eye, EyeOff, Sun , Moon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleLogin = async () => {

    if (loading) return;
    
    try {
      setLoading(true);

      const data = await loginUser(email, password);
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful 🎉");
      navigate("/dashboard");
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`flex items-center justify-center h-screen 
    ${theme === "dark" ? "bg-slate-900" : "bg-linear-to-r from-slate-100 via-gray-200 to-slate-300"
      }`}>

      <div className="absolute top-5 right-5">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
          {theme === "dark" ? (
            <>
            <span>Light</span> 
            <Sun size={16}/>
            </>
          ) : (
            <>
            <span>Dark</span> 
            <Moon size={16}/>
            </>
          )
          }
        </button>
      </div>
      {/* Card */}
      <div className={`p-8 rounded-2xl w-87.5 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl ${theme === "dark" ? "bg-white/10 backdrop-blur-lg shadow-emerald-400/20" : "bg-white/70 backdrop-blur-md shadow-xl"
        }`}>
        {/* Title */}
        <h2 className={`text-2xl font-bold  mb-6 text-center ${theme === "dark" ? "text-white" : "text-gray-800"
          }`}>Inventory Login </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          className={`w-full mb-4 p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${theme === "dark" ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"
            }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className={`w-full mb-6 p-3 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${theme === "dark" ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"
              }`}
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
          disabled = {loading}
          className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600  hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-300 font-semibold cursor-pointer disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login