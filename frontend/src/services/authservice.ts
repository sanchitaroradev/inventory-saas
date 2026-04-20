export const loginUser =async (email: string, password: string) => {
    const res = await fetch(
        "https://inventory-saas-backend-ip1s.onrender.com/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }
    );

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const registerUser =async (name: string, email: string, password: string) => {
    const res = await fetch(
        "https://inventory-saas-backend-ip1s.onrender.com/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        }
    );

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data;
};
