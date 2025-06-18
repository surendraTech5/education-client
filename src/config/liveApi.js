import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}
