import React, { useEffect } from "react";
import { useState } from "react";
import useAddCourse from "../hooks/useAddCourse";
import useNotification from "../hooks/useNotification";

const AddCourse = (props) => {
  const { setIsShow } = props;
  const [courseName, setCourseName] = useState("");
  const addCourseMutation = useAddCourse();
  const notify = useNotification();

  const handleSubmitCourse = (event) => {
    event.preventDefault();

    if (!courseName) {
      notify("Nama mata kuliah tidak boleh kosong", "warning");
      return;
    }

    if (courseName.trim() === "" || courseName.trim().length < 3) {
      notify("Nama mata kuliah minimal terdiri dari 3 karakter", "warning");
      return;
    }

    const data = {
      namaMataKuliah: courseName,
    };

    addCourseMutation.mutate(data);
  };

  // to show error or success notification
  useEffect(() => {
    if (addCourseMutation.isError) {
      const errorMessage = addCourseMutation.error.message;
      if (errorMessage === `Subject ${courseName} already exists`) {
        notify(`Mata kuliah ${courseName} sudah terdaftar`, "error", false);
      } else {
        notify("Terjadi kesalahan dalam memproses permintaan", "error", false);
      }
      // Set addCourseMutation.isError to false after displaying the notification
      addCourseMutation.reset();
    } else if (addCourseMutation.isSuccess) {
      notify("Berhasil menambahkan mata kuliah", "success");
      setCourseName("");
      addCourseMutation.reset();
    }
  }, [
    addCourseMutation.isError,
    addCourseMutation.error,
    addCourseMutation.isSuccess,
    notify,
    addCourseMutation,
    courseName,
  ]);

  return (
    <div className="fixed top-0 left-0 w-full h-full text-primary-color bg-gray-900 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 w-72 bg-white shadow-md rounded-md relative">
          <h1 className="text-center mb-4">Tambah Mata Kuliah</h1>
          <input
            type="text"
            value={courseName}
            placeholder="Nama Mata Kuliah"
            className="w-full border-2 border-primary-color rounded-md h-8 text-sm text-gray-700 p-2"
            onChange={(event) => setCourseName(event.target.value)}
            required
          />

          <div className="mt-5 flex justify-end">
            <button
              title="Batal"
              className="font-bold py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
              onClick={() => setIsShow(false)}
            >
              Batal
            </button>
            <button
              title="Tambahkan Mahasiswa ke Kelas"
              className="font-bold py-2 px-4 rounded text-white bg-primary-color hover:bg-secondary-color"
              onClick={handleSubmitCourse}
            >
              Tambah
            </button>
          </div>
          {/* to show loading message */}
          <div className="mt-2 text-center">
            {addCourseMutation.isLoading && (
              <p className="text-black">Menambahkan Mata Kuliah...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
