const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/sales/dashboard`;

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}`, {
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
