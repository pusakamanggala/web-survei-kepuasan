import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("mahasiswa");
  const navigate = useNavigate();

  const loginMutation = useLogin(selectedRole);
  console.log(selectedRole);

  const handleLogin = (event) => {
    event.preventDefault();

    // Prepare the login data
    const formData = {
      id: userId,
      password: password,
    };

    // Call the login mutation
    loginMutation.mutate(formData); // Pass the role and form data

    // Reset the form fields
    setUserId("");
    setPassword("");
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* left panel */}
        <div className="w-full md:w-1/2 md:block hidden bg-login-background bg-cover ">
          <div className="flex flex-col justify-center h-full pl-10 text-white">
            <h1 className="text-5xl font-bold ">Selamat Datang !</h1>
            <h2 className="text-xl">
              Di Website Survei Kepuasan Prodi Matematika UIN Malang
            </h2>
          </div>
        </div>
        {/* end of left panel */}
        {/* right panel */}
        <div className="w-full md:w-1/2 bg-white px-10 py-10 flex flex-col justify-center">
          <form>
            <div className="text-center mb-14">
              <h1 className="text-3xl font-bold text-primary-color ">Logo</h1>
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="role"
                className="block  font-bold mb-2 text-secondary-color"
              >
                Masuk sebagai
              </label>
              <select
                id="role"
                className="border-2  p-2 w-full rounded-md "
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="dosen">Dosen</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div className="mb-5 text-secondary-color">
              <label htmlFor="userId" className="block font-bold mb-2">
                {selectedRole === "Admin" || selectedRole === "Dosen"
                  ? "NPM"
                  : "NIM"}
              </label>
              <input
                type="text"
                id="userId"
                required
                className="border-2  p-2 w-full rounded-md"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
            </div>
            <div className="mb-5 text-secondary-color">
              <label htmlFor="password" className="block font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2  p-2 w-full rounded-md"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded-md"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          {/* login status */}
          <div className="text-center font-semibold">
            {loginMutation.isError && (
              <h1 className="text-primary-color mt-2">
                Terjadi kesalahan saat login
              </h1>
            )}
            {loginMutation.isLoading && (
              <h1 className="text-primary-color mt-2">Mencoba untuk login</h1>
            )}
          </div>
        </div>
        {/* end of right panel */}
      </div>
    </>
  );
}

export default Login;
