import React, { useState, useContext, useEffect } from "react";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { UserContext } from "../context/UserContext";
import useNotification from "../hooks/useNotification";

const ChangePassword = ({ userId, showModal }) => {
  const { userRole } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const notify = useNotification();

  const updateMutation = useUpdatePassword({ role: userRole });

  const isPasswordValid = (password) => {
    // Password regex: 8 characters with at least one letter, one number, and optional symbols
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()=_+~`[{\\}|;:',<.>/?-]{8,}$/;

    return passwordRegex.test(password);
  };

  const isUpdateReady = () => {
    // Check if all states are not empty
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return false;
    }

    // Check if the new password meets the requirements
    if (!isPasswordValid(newPassword)) {
      return false;
    }

    // Check if the new password matches the confirm password
    if (newPassword !== confirmNewPassword) {
      return false;
    }

    // All conditions are met, update is ready
    return true;
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  };

  // update password status
  useEffect(() => {
    if (updateMutation.isError) {
      notify("Terjadi kesalahan saat memproses permintaan", "error", false);
    }
    if (updateMutation.isSuccess) {
      if (updateMutation.data.message === "wrong password") {
        notify("Password lama anda salah", "error", false);
        updateMutation.reset();
      } else {
        notify("Password berhasil diubah", "success", false);
        showModal(false);
        updateMutation.reset();
      }
    }
  }, [updateMutation, notify, showModal]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 bg-white shadow-md rounded-md w-96">
          <h1 className="text-center mb-6 text-lg text-secondary-color font-semibold">
            Ganti Password
          </h1>
          <form action="">
            <input
              type="password"
              value={oldPassword}
              autoComplete="false"
              placeholder="Password Lama"
              className="w-full border-2 border-primary-color rounded-md text-sm text-gray-700 p-2 mb-2"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              value={newPassword}
              autoComplete="false"
              placeholder="Password Baru"
              className="w-full border-2 border-primary-color rounded-md text-sm text-gray-700 p-2 "
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {!isPasswordValid(newPassword) && (
              <h1 className="text-sm ml-1 text-primary-color">
                Password harus memiliki minimal 8 karakter mengandung huruf dan
                angka !
              </h1>
            )}
            <input
              type="password"
              value={confirmNewPassword}
              autoComplete="false"
              placeholder="Ulangi Password Baru"
              className="w-full border-2 border-primary-color rounded-md text-sm text-gray-700 p-2 mt-2"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {confirmNewPassword &&
              newPassword !== confirmNewPassword &&
              isPasswordValid(newPassword) && (
                <h1 className="text-sm ml-1 text-primary-color">
                  Ulangi password dengan benar !
                </h1>
              )}
          </form>

          <div className="flex justify-end mt-6">
            <button
              title="Ganti Password"
              className="bg-primary-color flex p-2 rounded-md text-white shadow-md items-center mr-2 hover:bg-secondary-color"
              onClick={() => showModal(false)}
            >
              <h1>Batal</h1>
            </button>
            <button
              title="Ganti Password"
              disabled={!isUpdateReady()}
              className={`${
                isUpdateReady()
                  ? "bg-primary-color hover:bg-secondary-color shadow-md "
                  : "bg-gray-300"
              } flex p-2 text-white items-center rounded-md`}
              onClick={handleUpdatePassword}
            >
              <h1>Submit</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
