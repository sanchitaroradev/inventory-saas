import Navbar from "../components/Navbar";
import { Check, IndianRupee, Plus } from "lucide-react";
import { createProduct, getProducts } from "../services/productService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Product = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

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

            await createProduct(newProduct);

            toast.success("Product added", {
                icon: <Check size={20} />
            });

            console.log(newProduct);

            // reset fields
            setName("");
            setPrice("");
            setStock("");

            // refresh list
            const data = await getProducts();
            console.log(data)
            setProducts(data.data.products);

        } catch (error: any) {
            toast.error(error.message);
        }
    };

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
                        className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
                        Add Product
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
                                className="p-4 border rounded-lg mb-3 bg-white"
                            >
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="flex items-center text-2xl mt-2 font-bold">
                                    <IndianRupee size={21} />
                                    {product.price}
                                </p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default Product;