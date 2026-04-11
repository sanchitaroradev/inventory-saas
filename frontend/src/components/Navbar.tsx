import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-3">

        {/* Logo */}
        <h1 className="text-xl font-bold text-emerald-600">Inventory Saas</h1>

        {/* Right side */}
        <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
        </button>
    </div>
  )
}

export default Navbar;