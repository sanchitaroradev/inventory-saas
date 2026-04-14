const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/products`

export const getProducts = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const createProduct = async (productData: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};