const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/sales`

export const createSale = async (productId : string, quantity: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({productId,quantity}),
    });

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getSales = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};