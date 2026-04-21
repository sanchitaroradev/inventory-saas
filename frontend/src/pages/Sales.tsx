import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import toast from "react-hot-toast";

const Sales = () => {

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data.products);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);
 
  const selected = products.find(p => p._id === selectedProduct);

  const total = selected && quantity
    ? selected.price * Number(quantity)
    : 0;

  const handleSell = () => {
    if (!selectedProduct || !quantity) {
      toast.error("Select product and quantity");
      return;
    }

    if (Number(quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    if (Number(quantity) > selected.stock) {
      toast.error("Not enough stock");
      return;
    }

    toast.success("Sale created");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-200 to-slate-300">

      <Navbar />

      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Sales
        </h1>

        {/* Create Sale card */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md mb-8">

          <h2 className="text-lg font-semibold text-center mb-6">
            Create Sale
          </h2>

          <div className="space-y-4">

            {/* Product Dropdown */}
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (₹{p.price}, Stock: {p.stock})
                </option>
              ))}
            </select>

            {/* Quantity */}
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* Total */}
            <p className="text-lg font-semibold text-gray-700">
              Total: ₹ {total}
            </p>

            {/* Button */}
            <button
              onClick={handleSell}
              className="flex items-center cursor-pointer justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-150 disabled:opacity-50">
              Sell Product
            </button>

          </div>
        </div>

        {/* Sales History */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md">

          <h2 className="text-lg font-semibold mb-4">
            Sales History
          </h2>

          <p className="text-gray-500 text-center py-6">
            No sales yet
          </p>

        </div>

      </div>
    </div>
  );
};

export default Sales;