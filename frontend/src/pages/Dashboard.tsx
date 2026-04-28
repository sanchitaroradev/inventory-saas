import Navbar from "../components/Navbar";
import { IndianRupee } from "lucide-react";
import { getDashboard } from "../services/dashboardService";
import { useState, useEffect } from "react";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboard();
        setStats({
          totalProducts: data.data.totalProducts || 0,
          totalSales: data.data.totalSales || 0,
          totalRevenue: data.data.totalRevenue || 0,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchStats();
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 dark:from-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8 text-gray-800 dark:text-white">Dashboard Overview</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-5 sm:p-8 rounded-xl dark:bg-gray-800 dark:text-white hover:shadow-xl transition">
            <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">Total products</h2>
            <p className="text-xl sm:text-2xl mt-2 text-center font-bold">{stats.totalProducts}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-5 sm:p-8 rounded-xl dark:bg-gray-800 dark:text-white hover:shadow-xl transition">
            <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">Total sales</h2>
            <p className="text-xl sm:text-2xl mt-2 text-center font-bold">{stats.totalSales}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-md shadow-lg p-5 sm:p-8 rounded-xl dark:bg-gray-800 dark:text-white hover:shadow-xl transition">
            <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">Revenue</h2>
            <p className="flex items-center justify-center text-xl sm:text-2xl mt-2 font-bold ">
              <IndianRupee size={21} />
              <span>{stats.totalRevenue}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;