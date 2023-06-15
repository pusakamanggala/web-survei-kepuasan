import React, { useEffect, useState } from "react";
import useAddAlumni from "../hooks/useAddAlumni";
import useNotification from "../hooks/useNotification";

function GraduateStudent(props) {
  const { nama, nim, angkatan, setIsShow } = props; // props for student data
  const [tahun, setTahun] = useState(""); // state for tahun kelulusan

  const notify = useNotification(); // useNotification hook to show notification

  const addAlumniMutation = useAddAlumni(); // useMutation to add alumni

  const handleSubmit = (event, tahun) => {
    event.preventDefault();

    // tahun lulus must be filled
    if (tahun === "") {
      notify("Tahun kelulusan tidak boleh kosong", "warning");
      return;
    }
    // tahun lulus must be 4 digits
    if (tahun.length !== 4) {
      notify("Tahun kelulusan harus terdiri dari 4 digit angka", "warning");
      return;
    }

    // tahun lulus must be greater than angkatan
    if (tahun <= angkatan) {
      notify("Tahun lulus tidak boleh kurang dari tahun angkatan", "warning");
      return;
    }

    addAlumniMutation.mutate({ nim, tahunKelulusan: tahun });
  };

  // to show notification when addAlumniMutation is success or error
  useEffect(() => {
    if (addAlumniMutation.isSuccess) {
      notify("Mahasiswa berhasil diluluskan", "success");
      setIsShow(false);
      addAlumniMutation.reset();
    }
    if (addAlumniMutation.isError) {
      notify("Mahasiswa gagal diluluskan", "error", false);
      addAlumniMutation.reset();
    }
  }, [addAlumniMutation, notify, setIsShow]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 bg-white shadow-md rounded-md">
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
                className=" mt-1 border-red-300 border-2 rounded-md px-1"
                type="number"
                placeholder="Masukkan tahun lulus"
                value={tahun}
                onChange={(event) => setTahun(event.target.value)}
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
          {addAlumniMutation.isLoading && (
            <h1 className="text-center font-semibold mt-2">
              Meluluskan Mahasiswa...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default GraduateStudent;
