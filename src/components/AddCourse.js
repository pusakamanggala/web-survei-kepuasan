import React from "react";
import { useState } from "react";
import useAddCourse from "../hooks/useAddCourse";

const AddCourse = (props) => {
  const { setIsShow } = props;
  const [courseName, setCourseName] = useState("");

  const addCourseMutation = useAddCourse();

  const handleSubmitCourse = (event) => {
    event.preventDefault();

    if (!courseName) {
      alert("Nama Mata Kuliah tidak boleh kosong");
      return;
    }

    const data = {
      namaMataKuliah: courseName,
    };

    addCourseMutation.mutate(data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full text-primary-color bg-gray-900 bg-opacity-50 z-50">
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

          {/* to show response message */}
          <div className="mt-2 text-center">
            {addCourseMutation.isLoading && <p>Menambahkan Mata Kuliah...</p>}
            {addCourseMutation.isError && (
              <p>Terjadi kesalahan dalam memproses permintaan</p>
            )}
            {addCourseMutation.isSuccess && (
              <p className="text-green-500">Mata kuliah berhasil ditambahkan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
