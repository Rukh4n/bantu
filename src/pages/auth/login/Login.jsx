import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const api = "https://dummyjson.com/auth/login";
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // Cek jika ada user di sessionStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/userprofile"); // Redirect jika ada user di sessionStorage
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, data, {
        headers: { "Content-Type": "application/json" },
      });

      // Menyimpan data pengguna dalam bentuk JSON ke sessionStorage setelah login berhasil
      const user = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        username: response.data.username,
        email: response.data.email,
        password: data.password, // Menyimpan password yang dimasukkan user
      };

      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful:", response.data);

      // Redirect ke halaman userprofile setelah berhasil login
      navigate("/userprofile");
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="outline-none w-full"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="outline-none w-full"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
