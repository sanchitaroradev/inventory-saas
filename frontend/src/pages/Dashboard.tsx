import Navbar from "../components/Navbar";
import { IndianRupee } from "lucide-react";
const Dashboard = () => {

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-200 to-slate-300">
      <Navbar />

      <div className="p-10">
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-xl hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Total products</h2>
            <p className="text-2xl mt-2 font-bold">0</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-xl hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Total sales</h2>
            <p className="text-2xl mt-2 font-bold">0</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-xl hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="flex items-center text-2xl mt-2 font-bold ">
              <IndianRupee size={21} />
              <span>0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;