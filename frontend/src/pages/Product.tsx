import Navbar from "../components/Navbar";
import { IndianRupee, Plus, Trash2, Pencil } from "lucide-react";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../services/productService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Product = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                console.log(data)
                setProducts(data.data.products);
            } catch (error: any) {
                console.log(error.message);
            }
        };

        fetchProducts();
    }, [])

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                name,
                price: Number(price),
                stock: Number(stock),
            };

            // Update
            if (editId) {
                await updateProduct(editId, newProduct);

                toast.success("Product updated");

                // UI Update
                setProducts((prev) => prev.map((p) => p._id === editId ? { ...p, ...newProduct } : p));

                setEditId(null);
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
        }
    };

    const handleDelete = async (id: string) => {

        // confirm delete popup
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        try {
            await deleteProduct(id);

            toast.success("Product deleted");

            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleEdit = (product: any) => {
        setEditId(product._id);

        // form pre-fill
        setName(product.name);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-200 to-slate-300">

            <Navbar />

            <div className="p-10">
                <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Products</h1>

                {/* Add Product Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-center text-lg font-semibold mb-4">Add product</h2>
                    <input
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder="Product name"
                        className="w-full mb-3 p-2 border rounded-lg"
                    />
                    <input
                        value={price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full mb-3 p-2 border rounded-lg"
                    />
                    <input
                        value={stock}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
                        placeholder="Stock"
                        className="w-full mb-3 p-2 border rounded-lg"
                    />

                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="flex items-center cursor-pointer justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
                        {editId? "Update Product" : "Add Product"}
                        <Plus size={17} />
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Product List</h2>
                    {products.length === 0 ? (
                        <p>No products yet</p>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="p-4 border rounded-lg mb-3 bg-white flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="flex items-center gap-1 text-2xl mt-2 font-bold">
                                        <IndianRupee size={21} />
                                        {product.price}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    {/* Edit */}
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-500 cursor-pointer">
                                        <Pencil size={18} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default Product;