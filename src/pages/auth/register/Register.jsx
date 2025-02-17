import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
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
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/userprofile"); // Redirect jika ada user di sessionStorage
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
        console.log("User Data:", data);
        // Simpan data ke sessionStorage setelah berhasil post
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/userprofile"); // Redirect ke halaman UserProfile setelah berhasil register
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg p-2">
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
          <div className="flex items-center border rounded-lg p-2">
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
          <div className="flex items-center border rounded-lg p-2">
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
          <div className="flex items-center border rounded-lg p-2">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
