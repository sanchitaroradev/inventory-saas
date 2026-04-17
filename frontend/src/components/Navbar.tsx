import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

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
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600">
                Logout
            </button>
        </div>
    )
}

export default Navbar;