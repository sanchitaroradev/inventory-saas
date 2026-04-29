import Navbar from "../components/Navbar";
import { IndianRupee, Plus, Trash2, Pencil } from "lucide-react";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../services/productService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const Product = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setPageLoading(true);

                const data = await getProducts();
                setProducts(data.data.products);
            } catch (error: any) {
                console.log(error.message);
            } finally {
                setPageLoading(false);
            }
        };

        fetchProducts();
    }, [])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsEditOpen(false);
                setEditId(null);
                setName("");
                setPrice("");
                setStock("");
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleAddProduct = async () => {

        if (!name || !price || !stock) {
            toast.error("All fields are required");
            return;
        }

        if (Number(price) <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        if (Number(stock) < 0) {
            toast.error("Stock cannot be negative");
            return;
        }

        try {

            setLoading(true);

            const newProduct = {
                name,
                price: Number(price),
                stock: Number(stock),
            };

            // Update
            if (editId) {
                await updateProduct(editId, newProduct);

                toast.success("Product updated successfully");

                // UI Update
                setProducts((prev) => prev.map((p) => p._id === editId ? { ...p, ...newProduct } : p));

                setEditId(null);
                setIsEditOpen(false);
            }

            else {
                await createProduct(newProduct);

                toast.success("Product added");

                const data = await getProducts();
                setProducts(data.data.products);

                // reset fields
                setName("");
                setPrice("");
                setStock("");

            }

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    }

    const handleEdit = (product: any) => {
        setEditId(product._id);

        setName(product.name);
        setPrice(product.price.toString());
        setStock(product.stock.toString());

        setIsEditOpen(true);
    }

    const { dark } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-gray-900" : "bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300"}`}>

            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8 text-gray-800 dark:text-white">Products</h1>

                {/* Add Product Card */}
                <div className="bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-gray-400 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md mb-8 hover:shadow-lg transition duration-200">
                    <h2 className="text-center text-lg font-semibold mb-4">Add product</h2>
                    <input
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full mb-3 p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <input
                        value={price}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        className="w-full mb-3 p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <input
                        value={stock}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
                        placeholder="Enter product Stock"
                        className="w-full mb-3 p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <button
                        type="button"
                        onClick={handleAddProduct}
                        disabled={loading}
                        className="w-full sm:w-fit flex items-center cursor-pointer justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-150 disabled:opacity-50">
                        {loading ? (editId ? "Updating..." : "Adding...") : "Add"}
                        <Plus size={17} />
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg dark:bg-gray-800 text-gray-800 dark:text-gray-300 transition duration-200">
                    <h2 className="text-lg font-semibold mb-4">Product List</h2>
                    {pageLoading ? (
                        // Loading Skeleton
                        [1, 2, 3, 4].map((_, i) => (
                            <div
                                key={i}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl mb-3 bg-white dark:bg-gray-800 pointer-events-none animate-pulse"
                            >
                                <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </div>
                        ))
                    ) : products.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No products yet. Start by adding one
                        </p>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex flex-col items-start">
                                    <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>
                                    <p className="flex items-center gap-1 text-lg sm:text-xl mt-1 font-bold text-emerald-500">
                                        <IndianRupee size={21} />
                                        {product.price}
                                    </p>
                                </div>

                                <div className="flex gap-3 self-end sm:self-auto">
                                    {/* Edit Button*/}
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-500 cursor-pointer hover:scale-95 transition duration-150">
                                        <Pencil size={18} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteClick(product._id)}
                                        className="text-red-500 cursor-pointer hover:text-red-700 hover:scale-95 transition duration-150"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
            {/* Edit model */}
            {isEditOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition"
                    onClick={() => {
                        setIsEditOpen(false);
                        setEditId(null);
                        setName("");
                        setPrice("");
                        setStock("");
                    }}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-700 p-5 sm:p-6 space-y-4 rounded-xl w-full max-w-md mx-4 sm:mx-0 shadow-xl transform transition duration-300 scale-95 animate-[fadeIn_0.3s_ease-out_forwards]">

                        <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
                            Edit Product
                        </h2>

                        <input
                            value={name}
                            placeholder="Enter product name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 p-2 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />

                        <input
                            value={price}
                            placeholder="Enter product price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full mb-3 p-2 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />

                        <input
                            value={stock}
                            placeholder="Enter product stock"
                            type="number"
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full mb-4 p-2 border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />

                        <div className="flex justify-between">

                            {/* SAVE */}
                            <button
                                onClick={handleAddProduct}
                                disabled={loading}
                                className="bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-150 text-white px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50"
                            >
                                {loading ? "Saving" : "Save"}
                            </button>

                            {/* CANCEL */}
                            <button
                                onClick={() => {
                                    setIsEditOpen(false);
                                    setEditId(null);
                                    setName("");
                                    setPrice("");
                                    setStock("");
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-500 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition duration-150 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* Delete model */}
            {deleteId && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition duration-200"
                    onClick={() => setDeleteId(null)}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 p-5 sm:p-6 rounded-xl w-full max-w-md mx-4 sm:mx-0 shadow-xl transform transition duration-300 scale-95 animate-[fadeIn_0.3s_ease-out_forwards]"
                    >

                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Delete Product
                        </h2>

                        <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
                            Are you sure you want to delete this product?
                        </p>

                        <div className="flex justify-between">

                            {/* CANCEL */}
                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-xl active:scale-95 cursor-pointer"
                            >
                                Cancel
                            </button>

                            {/* DELETE */}
                            <button
                                onClick={async () => {
                                    try {
                                        await deleteProduct(deleteId);

                                        setProducts((prev) =>
                                            prev.filter((p) => p._id !== deleteId)
                                        );

                                        toast.success("Product deleted");
                                        setDeleteId(null);

                                    } catch (error: any) {
                                        toast.error(error.message);
                                    }
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-xl active:scale-95 cursor-pointer"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Product