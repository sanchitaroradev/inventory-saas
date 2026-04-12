import Navbar from "../components/Navbar";
import { Plus } from "lucide-react";

const Product = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-200 to-slate-300">
        
        <Navbar/>

        <div className="p-10">
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Products</h1>

            {/* Add Product Card */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-center text-lg font-semibold mb-4">Add product</h2>
                <input 
                placeholder="Product name"
                className="w-full mb-3 p-2 border rounded-lg" 
                />
                <input 
                placeholder="Price"
                className="w-full mb-3 p-2 border rounded-lg" 
                />
                <input 
                placeholder="Stock"
                className="w-full mb-3 p-2 border rounded-lg" 
                />

                <button className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
                    Add Product
                    <Plus size={17}/>
                </button>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Product List</h2>
                <p>No products yet</p>
            </div>

        </div>
    </div>
  );
};

export default Product;