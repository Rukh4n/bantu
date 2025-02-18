import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdPaper } from "react-icons/io";

const Login = () => {
  const api = "https://dummyjson.com/auth/login";
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // Membuat referensi untuk input
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Cek jika ada user di sessionStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (storedUser && storedUser.status === 200) {
      navigate("/userprofile"); // Redirect jika status user sudah 200
    }

    // Fokus ke input pertama (username) saat komponen pertama kali dimuat
    usernameRef.current.focus();
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah username dan password sesuai dengan yang ada di sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    // Update status menjadi 200 jika data cocok dengan yang ada di sessionStorage
    if (storedUser && storedUser.userName === data.username && storedUser.password === data.password) {
      storedUser.status = 200; // Update status menjadi 200
      sessionStorage.setItem("user", JSON.stringify(storedUser)); // Simpan user yang telah diupdate
      navigate("/userprofile"); // Redirect setelah validasi
      return;
    }

    try {
      // Login menggunakan API jika data tidak ditemukan di sessionStorage
      const response = await axios.post(api, data, {
        headers: { "Content-Type": "application/json" },
      });

      const user = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        userName: response.data.username,
        email: response.data.email,
        password: data.password, // Menyimpan password yang dimasukkan user
        status: 200, // Tambahkan status 200
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg p-4">
        {/* Kolom pertama dengan background blue dan teks putih */}
        <div className="p-20 flex justify-center items-center bg-blue-500 text-white sm:block hidden">
          <div className="flex justify-center items-center">
            <IoMdPaper className="text-9xl" />
          </div>
          <div className="flex justify-center items-center">
            <h2 className="text-6xl">Bantu Login</h2>
          </div>
        </div>

        {/* Kolom untuk form login */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="outline-none w-full"
                value={data.username}
                onChange={handleChange}
                required
                ref={usernameRef} // Auto fokus
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="outline-none w-full"
                value={data.password}
                onChange={handleChange}
                required
                ref={passwordRef} // Auto fokus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
