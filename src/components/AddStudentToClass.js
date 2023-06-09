import React, { useState, useEffect } from "react";
import useAddStudentToClass from "../hooks/useAddStudentToClass";
import useFetchUserById from "../hooks/useFetchUserById";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function AddStudentToClass(props) {
  const { kelas, setIsShow } = props;

  const [nim, setNim] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addStudentToClassMutation = useAddStudentToClass();

  const {
    data: studentData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    isSuccess: isSearchSuccess,
    refetch: refetchStudentData,
  } = useFetchUserById({
    role: "mahasiswa",
    id: nim,
    autoFetch: false,
  });

  const handleSubmitStudent = (event, idMahasiswa) => {
    event.preventDefault();
    addStudentToClassMutation.mutate({
      idKelas: kelas,
      idMahasiswa,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setNim(searchValue);
  };

  useEffect(() => {
    if (nim) {
      refetchStudentData();
    }
  }, [nim, refetchStudentData]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 bg-white shadow-md rounded-md relative">
          {/* Close Button */}
          {isSearchSuccess ? null : (
            <div className="absolute right-2 top-2">
              <button
                className="cursor-pointer m-2"
                title="Tutup"
                onClick={() => {
                  setIsShow(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* end of close button */}
          {addStudentToClassMutation.isLoading ? (
            <div className="font-bold text-xl ml-2">
              Menambahkan Mahasiswa...
            </div>
          ) : (
            <>
              {addStudentToClassMutation.isError ? (
                <div className="text-secondary-color font-bold text-xl ml-2">
                  Mahasiswa gagal ditambahkan
                </div>
              ) : null}

              {addStudentToClassMutation.isSuccess ? (
                <div className="text-green-500 font-bold text-xl ml-2">
                  <h1>Mahasiswa berhasil ditambahkan</h1>
                  <div className="flex justify-end mt-4">
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
                    <h1 className="text-center mb-4">Tambah Mahasiswa</h1>
                    {/* search bar */}
                    <div className=" flex h-12 md:w-72 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
                      <div className="grid place-items-center h-full w-12 text-gray-300">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </div>
                      <form onSubmit={handleSearch} className="w-full">
                        <input
                          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                          type="number"
                          id="search"
                          placeholder="Masukkan NIM"
                          required
                          value={searchValue}
                          onChange={(event) =>
                            setSearchValue(event.target.value)
                          }
                        />
                      </form>
                      {searchValue && (
                        <button
                          className="cursor-pointer m-2"
                          title="Hapus pencarian"
                          onClick={() => {
                            setSearchValue("");
                            setNim("");
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    {/* end of search bar */}
                    {/* Show Student */}
                    {isSearchLoading && <div className="mt-2">Loading...</div>}
                    {isSearchError && (
                      <div className="mt-2">
                        Terjadi kesalahan saat memproses permintaan
                      </div>
                    )}
                    {isSearchSuccess && (
                      <div>
                        {studentData && (
                          <div>
                            {studentData &&
                            studentData.message ===
                              "There is no record with that id" ? (
                              <div className="mt-2">NIM tidak ditemukan</div>
                            ) : (
                              <div className="mt-2">
                                <h1>Nama : {studentData.data.nama}</h1>
                                <h1>Angkatan: {studentData.data.angkatan}</h1>
                                {/* Add Button */}
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
                                    onClick={(event) =>
                                      handleSubmitStudent(event, [
                                        studentData.data.nim,
                                      ])
                                    }
                                  >
                                    Tambah
                                  </button>
                                </div>

                                {/* End of Add Button */}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddStudentToClass;
