import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const api = 'https://dummyjson.com/users/add';
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.status === 200) {
      navigate("/userprofile"); // Redirect jika status 200
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(api, data)
      .then((response) => {
        const userData = { ...data, status: 200 }; // Tambahkan status 200
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/userprofile"); // Redirect setelah sukses register
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg p-4">
        {/* Kolom pertama dengan background blue dan teks putih */}
        <div className="p-5 flex justify-center items-center bg-blue-500 text-white sm:block hidden">
          <div className="flex justify-center items-center">
          <IoMdPaper className="text-9xl" />
          </div>
          <div className="flex justify-center items-center">
          <h2 className="text-6xl">Bantu Register</h2>
          </div>
        </div>

        {/* Kolom untuk form register */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="outline-none w-full"
                value={data.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="outline-none w-full"
                value={data.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                className="outline-none w-full"
                value={data.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="outline-none w-full"
                value={data.email}
                onChange={handleChange}
                required
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
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
