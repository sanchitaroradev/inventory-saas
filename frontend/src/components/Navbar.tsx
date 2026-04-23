import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
const Navbar = () => {

    const navigate = useNavigate();

    // const [theme, setTheme] = useState<"light" | "dark">("light");
    const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

    // const toggleTheme = () => {
    //     setTheme((prev) => (prev === "light" ? "dark" : "light"));
    // };


    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark])


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-8 py-4">

            {/* Logo */}
            <h1
                onClick={() => navigate("/dashboard")}
                className="text-xl font-bold text-emerald-600 cursor-pointer"
            >Inventory Saas
            </h1>

            {/* Right side */}
            <div className="flex items-center gap-4">

                <button
                    onClick={() => setDark(!dark)}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                    {dark ? (
                        <>
                            <Sun size={16} />
                        </>
                    ) : (
                        <>
                            <Moon size={16} />
                        </>
                    )}
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:shadow-lg active:scale-95 transition duration-150"
                >
                    Logout
                </button>

            </div>

        </div>
    )
}

export default Navbar;