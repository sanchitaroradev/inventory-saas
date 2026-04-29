import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authservice";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (loading) return;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await registerUser(name, email, password);

            toast.success("Account created successfully");

            navigate("/"); // login page

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { dark, setDark } = useTheme();

    return (
        <div className={`flex items-center justify-center min-h-screen px-4 ${dark ? "bg-slate-900" : "bg-gradient-to-r from-slate-100 via-gray-200 to-slate-300"}`}>

            {/* Theme Toggle */}
            <div className="absolute top-5 right-5">
                <button
                    onClick={() => setDark(!dark)}
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>

            {/* Card */}
            <div className={`p-5 sm:p-8 rounded-2xl w-full max-w-sm space-y-4 transition-all duration-300 ease-in-out hover:shadow-2xl ${dark ? "bg-white/10 backdrop-blur-lg shadow-emerald-400/20" : "bg-white/70 backdrop-blur-md shadow-xl"}`}>

                <h2 className={`text-xl sm:text-2xl font-bold mb-6 text-center ${dark ? "text-white" : "text-gray-800"}`}>
                    Create Account
                </h2>

                {/* Name */}
                <input
                    placeholder="Enter name"
                    className={`w-full mb-4 p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${dark ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter email"
                    className={`w-full mb-4 p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${dark ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Enter password"
                        className={`w-full p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${dark ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={() => setShowPassword1(!showPassword1)}
                        className="absolute right-2 top-4 cursor-pointer text-gray-500"
                    >
                        {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                    <input
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Confirm password"
                        className={`w-full p-3 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${dark ? "bg-slate-800 text-white border-slate-600" : "bg-white border-gray-300"}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        onClick={() => setShowPassword2(!showPassword2)}
                        className="absolute right-2 top-4 cursor-pointer text-gray-500"
                    >
                        {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Signup Button */}
                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-150 font-semibold disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                {/* Redirect */}
                <p className={`text-center text-sm mt-5 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-emerald-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Signup;