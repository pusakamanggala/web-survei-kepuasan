import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Mahasiswa");

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* left panel */}
        <div className="w-full md:w-1/2 md:block hidden bg-login-background bg-cover">
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
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">
                Login Sebagai {selectedRole}
              </h1>
            </div>
            <div className="mb-5">
              <label
                htmlFor="role"
                className="block text-gray-700 font-bold mb-2"
              >
                Siapa Kamu ?
              </label>
              <select
                id="role"
                className="border-2 border-gray-400 p-2 w-full rounded-md "
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dosen">Dosen</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                {selectedRole === "Admin" || selectedRole === "Dosen"
                  ? "NPM"
                  : "NIM"}
              </label>
              <input
                type="text"
                id="username"
                className="border-2 border-gray-400 p-2 w-full rounded-md"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2 border-gray-400 p-2 w-full rounded-md"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        {/* end of right panel */}
      </div>
    </>
  );
}

export default Login;
