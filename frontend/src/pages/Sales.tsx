import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import toast from "react-hot-toast";
import { createSale, getSales } from "../services/saleService";
import { useTheme } from "../context/ThemeContext";

const Sales = () => {

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sales, setSales] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        setSales(data.data.sales);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSales();
  }, []);

  const selected = products.find(p => p._id === selectedProduct);

  const total = selected && quantity
    ? selected.price * Number(quantity)
    : 0;

  const handleSell = async () => {
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

    try {
      const qty = Number(quantity);

      await createSale(selectedProduct, qty);

      toast.success("Sale completed successfully");

      // Refresh products
      const updated = await getProducts();
      setProducts(updated.data.products);

      // Refresh sales
      const salesData = await getSales();
      setSales(salesData.data.sales);

      // reset
      setSelectedProduct("");
      setQuantity("");

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {dark} = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-gray-900": "bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300"}`}>

      <Navbar />

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Sales
        </h1>

        {/* Create Sale card */}
        <div className="bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white space-y-4 backdrop-blur-md p-8 rounded-2xl shadow-md mb-8 hover:shadow-lg transition duration-200">

          <h2 className="text-lg font-semibold text-center mb-6">
            Create Sale
          </h2>

          <div className="space-y-4 mt-4">

            {/* Product Dropdown */}
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* Total */}
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
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
        <div className="bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white space-y-4 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-200">

          <h2 className="text-lg font-semibold mb-4">
            Sales History
          </h2>

          {sales.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No sales yet
            </p>
          ):(
            sales.map((sale) => (
              <div key={sale._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white flex justify-between items-center transition">

                <div>
                  <h3 className="font-semibold">{sale.productId?.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {sale.quantity}</p>
                </div>

                <p className="font-bold">₹{sale.totalAmount}</p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default Sales;