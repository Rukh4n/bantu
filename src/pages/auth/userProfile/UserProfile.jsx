import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Jika tidak ada user, arahkan ke login
    } else {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.status !== 200) {
        navigate("/login"); // Jika status bukan 200, arahkan ke login
      } else {
        setUser(parsedUser); // Set user jika valid
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (storedUser) {
      storedUser.status = 300; // Mengubah status menjadi 300
      sessionStorage.setItem("user", JSON.stringify(storedUser)); // Simpan kembali user dengan status baru
    }

    navigate("/login"); // Redirect ke login setelah logout
  };

  if (!user) {
    return null; // Mencegah tampilan kosong sebelum user tersedia
  }

  const { firstName, lastName, username, email } = user;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg p-4">
        {/* Kolom pertama dengan background blue dan teks putih */}
        <div className="p-20 flex justify-center items-center bg-blue-500 text-white sm:block hidden">
          <div className="flex justify-center items-center">
            <CiLogout className="text-9xl" />
          </div>
          <div className="flex justify-center items-center">
            <h2 className="text-6xl">Profile User Bantu</h2>
          </div>
        </div>

        {/* Kolom untuk tampilan profil */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded"
          >
            <CiLogout /> <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
