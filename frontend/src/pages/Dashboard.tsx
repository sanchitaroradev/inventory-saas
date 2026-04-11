import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // remove token
        localStorage.removeItem("token");

        // redirect to login
        navigate("/");
    };

  return (
    <div className="p-10">
        <Navbar/>

        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        {/* <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >Logout</button> */}
    </div>
  );
};

export default Dashboard;