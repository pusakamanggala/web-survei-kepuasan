import React, { useState } from "react";
import useAddAlumni from "../hooks/useAddAlumni";

function GraduateStudent(props) {
  const { nama, nim, angkatan, setIsShow } = props; // props for student data
  const [tahun, setTahun] = useState(""); // state for tahun kelulusan

  const addAlumniMutation = useAddAlumni(); // useMutation to add alumni

  const handleSubmit = (event, tahun) => {
    event.preventDefault();
    if (tahun === "") {
      alert("Tahun lulus tidak boleh kosong");
      return;
    }
    addAlumniMutation.mutate({ nim, tahunKelulusan: tahun });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 bg-white shadow-md rounded-md">
          {addAlumniMutation.isLoading ? (
            <div className="font-bold text-xl ml-2">
              Meluluskan Mahasiswa...
            </div>
          ) : (
            <>
              {addAlumniMutation.isError ? (
                <div className="text-secondary-color font-bold text-xl ml-2">
                  Mahasiswa gagal diluluskan
                </div>
              ) : null}

              {addAlumniMutation.isSuccess ? (
                <div className="text-green-500 font-bold text-xl ml-2">
                  <h1>Mahasiswa berhasil diluluskan</h1>
                  <div className="flex justify-end mt-2">
                    <button
                      title="OK"
                      className="font-bold py-1 px-4 rounded text-base text-white bg-primary-color hover:bg-secondary-color"
                      onClick={() => window.location.reload()}
                    >
                      OK
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-left my-2">
                    <div className="flex">
                      <h1 className="w-1/3">Nama</h1>
                      <h1 className="mr-2"> : </h1>
                      <h1 className="w-2/3 font-semibold">{nama}</h1>
                    </div>
                    <div className="flex">
                      <h1 className="w-1/3">NIM</h1>
                      <h1 className="mr-2"> : </h1>
                      <h1 className="w-2/3 font-semibold">{nim}</h1>
                    </div>
                    <div className="flex">
                      <h1 className="w-1/3">Angkatan</h1>
                      <h1 className="mr-2"> : </h1>
                      <h1 className="w-2/3 font-semibold">{angkatan}</h1>
                    </div>
                  </div>
                  <form
                    onSubmit={(event) => handleSubmit(event, tahun)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit(event, tahun);
                      }
                    }}
                    className="mb-2"
                  >
                    <label>
                      Tahun Lulus :{" "}
                      <input
                        className=" mt-1 border-red-300 border rounded-md "
                        type="number"
                        value={tahun}
                        onChange={(event) => setTahun(event.target.value)}
                        required
                        min={2000}
                      />
                    </label>
                    <div className="mt-4">
                      <button
                        title="Batal"
                        className="font-bold py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
                        onClick={() => setIsShow(false)}
                      >
                        Cancel
                      </button>
                      <button
                        title="Submit"
                        className="font-bold py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GraduateStudent;
