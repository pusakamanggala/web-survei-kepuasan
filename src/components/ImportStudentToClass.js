import React, { useEffect, useState } from "react";
import useImportStudentToClass from "../hooks/useImportStudentToClass";
import useNotification from "../hooks/useNotification";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import file_template from "../sample_file/import_student_to_class_template.xlsx";

const ImportStudentToClass = ({ showModal }) => {
  const [file, setFile] = useState(null);
  const importMutation = useImportStudentToClass();
  const { id } = useParams(); // get class id from url

  const notify = useNotification();

  const handleImport = (event) => {
    event.preventDefault();
    importMutation.mutate(file);
  };

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.value = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    if (importMutation.isError) {
      notify("Terjadi kesalahan saat memproses permintaan", "error", false);
      importMutation.reset();
    }
    if (importMutation.isSuccess) {
      notify("Berhasil mengimpor mahasiswa", "success");
      importMutation.reset();
    }
  }, [importMutation, notify]);

  return (
    <div className="fixed top-0 left-0 w-full h-full text-primary-color bg-gray-900 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 w-96 bg-white shadow-md rounded-md relative">
          <h1 className="text-center mb-6 font-semibold">Impor Mahasiswa</h1>
          {/* input file */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="file-input"
            >
              Pilih file excel
            </label>
            <input
              id="file-input"
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="appearance-none border border-gray-400 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-gray focus:border-gray-500"
            />
          </div>
          <div className="flex">
            <h1 className="mr-1">
              <span className="text-black">id Kelas =</span> {id}
            </h1>
            <button title="copy id kelas" onClick={() => copyToClipboard(id)}>
              <FontAwesomeIcon icon={faClipboard} />
            </button>
          </div>
          {/* file template */}
          <div>
            <a
              className="underline"
              href={file_template}
              download="import_student_to_class_template.xlsx"
            >
              Download Template
            </a>
          </div>
          <div className="flex justify-end">
            <button
              title="Batal"
              className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => showModal(false)}
            >
              Cancel
            </button>
            <button
              title="Impor"
              disabled={file === null}
              type="button"
              className={`${
                file === null
                  ? "bg-red-400"
                  : "bg-primary-color  hover:bg-secondary-color "
              }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"`}
              onClick={handleImport}
            >
              Impor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportStudentToClass;
