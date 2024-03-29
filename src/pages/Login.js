import React, { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("mahasiswa");
  const loginMutation = useLogin(selectedRole);
  const notify = useNotification();

  // to post the login data
  const handleLogin = (event) => {
    event.preventDefault();

    // Prepare the login data
    const formData = {
      id: userId,
      password: password,
    };

    // Check if the form fields are empty
    if (!userId || !password || !selectedRole)
      return notify("Masukkan akun anda", "warning");

    // Call the login mutation
    loginMutation.mutate(formData); // Pass the role and form data

    // Reset the form fields
    setUserId("");
    setPassword("");
  };

  // Set the cookie to expire in 3 days
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3); // Set expiration date to 3 days from now

  // If the login is success, reload the page and set the cookie from the response
  if (loginMutation.isSuccess) {
    // reload the page
    document.cookie = `Authorization=${
      loginMutation.data.token
    }; expires=${expirationDate.toUTCString()}; Domain=${
      process.env.REACT_APP_COOKIE_DOMAIN
    }; Path=/; SameSite=None; Secure`;
  }

  const handleUserIdChange = (event) => {
    const value = event.target.value;
    // If the selected role is "dosen", validate the input to allow only numbers and hyphens
    if (selectedRole === "dosen") {
      const sanitizedValue = value.replace(/[^0-9-]/g, "");
      setUserId(sanitizedValue);
    } else {
      setUserId(value);
    }
  };

  // login status notification
  useEffect(() => {
    // If the login is error, show the error message
    if (loginMutation.isError) {
      // if the error message is "wrong username or password"
      if (loginMutation.error.message === "wrong username or password") {
        let errorMessage = "NIM/NIP atau Password salah";

        // Check the selected role and set the error message based on the selected role
        if (selectedRole === "admin") {
          errorMessage = "Username atau Password salah";
        } else if (selectedRole === "dosen") {
          errorMessage = "NIP atau Password salah";
        } else if (selectedRole === "mahasiswa" || selectedRole === "alumni") {
          errorMessage = "NIM atau Password salah";
        }
        // Show the error message
        notify(errorMessage, "error", false);
      } else {
        notify("Terjadi kesalahan saat memproses permintaan", "error", false);
      }
      // Reset the login mutation
      loginMutation.reset();
    }

    // if the login is success, show the success message
    if (loginMutation.isSuccess) {
      notify("Login Berhasil", "success", 1000);
      // Reset the form fields
      setPassword("");
      setUserId("");

      // Reset the login mutation
      loginMutation.reset();
    }
  }, [loginMutation, notify, selectedRole]);

  return (
    <>
      <Helmet>
        <title>Login | Web Survei Kepuasan</title>
      </Helmet>
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
          <form onSubmit={handleLogin}>
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
                title="Jenis Pengguna"
                id="role"
                className="border-2  p-2 w-full rounded-md "
                value={selectedRole}
                onChange={(event) => {
                  setSelectedRole(event.target.value);
                  setPassword("");
                  setUserId("");
                }}
              >
                <option value="admin">Admin</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="dosen">Dosen</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div className="mb-5 text-secondary-color">
              <label htmlFor="userId" className="block font-bold mb-2">
                {selectedRole === "admin" || selectedRole === "dosen" ? (
                  <label>{selectedRole === "admin" ? "Username" : "NIP"}</label>
                ) : (
                  <label>NIM</label>
                )}
              </label>
              <input
                type={
                  selectedRole === "admin" || selectedRole === "dosen"
                    ? "text"
                    : "number"
                }
                id="userId"
                autoComplete="off"
                className="border-2  p-2 w-full rounded-md"
                value={userId}
                onChange={handleUserIdChange}
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
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                title="Login"
                type="submit"
                className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
          {/* login status */}
          <div className="text-center font-semibold">
            {loginMutation.isLoading && (
              <h1 className="text-black mt-2">Mencoba untuk login...</h1>
            )}
          </div>
        </div>
        {/* end of right panel */}
      </div>
    </>
  );
}

export default Login;
