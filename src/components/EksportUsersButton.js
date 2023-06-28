import React from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import useNotification from "../hooks/useNotification";

const EksportUsersButton = ({ data, role }) => {
  const notify = useNotification();

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Convert the array buffer to a Blob
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Generate a file name
      const fileName = `data_${role}.xlsx`;

      // Create a temporary link and download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      notify("Berhasil mengunduh file", "success", false);
    } catch (error) {
      notify("Gagal mengunduh file", "error", false);
    }
  };

  return (
    <button
      title={`Unduh data ${role} `}
      className="flex justify-evenly ml-2 h-12 px-4 items-center text-white  rounded-lg focus-within:shadow-lg overflow-hidden bg-green-500 hover:bg-green-600 shadow-sm shadow-green-700"
      onClick={exportToExcel}
    >
      <FontAwesomeIcon icon={faDownload} className="w-5 h-5 mr-0 sm:mr-3 " />
      <h1 className="hidden sm:block capitalize">Download</h1>
    </button>
  );
};

export default EksportUsersButton;
