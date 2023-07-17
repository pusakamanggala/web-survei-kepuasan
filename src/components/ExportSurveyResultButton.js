import React from "react";
import { utils, writeFile } from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

const ExportButton = ({ data, fileName, notify }) => {
  const exportToExcel = () => {
    // Create a new workbook
    const workbook = utils.book_new();

    // Filter data for the first table (essay = 0)
    const table1Data = data
      .filter((item) => item.ESSAY === 0)
      .map(({ ESSAY, ...rest }) => rest); // Remove 'ESSAY' key from each object

    // Convert the first table data to a worksheet
    const worksheet1 = utils.json_to_sheet(table1Data);
    utils.book_append_sheet(workbook, worksheet1, "Opsi");

    // Filter data for the tables with essay arrays
    const essayArrayData = data.filter((item) => Array.isArray(item.ESSAY));

    // Create separate tables for each array of essays
    essayArrayData.forEach((item, index) => {
      const tableData = item.ESSAY.map((essay) => ({
        [item.pertanyaan]: essay, // Use pertanyaan as the header
      }));
      const worksheet = utils.json_to_sheet(tableData, {
        header: Object.keys(tableData[0]),
      });
      utils.book_append_sheet(workbook, worksheet, `Essay ${index + 1}`);
    });

    // Export the workbook as an Excel file
    writeFile(workbook, `${fileName}.xlsx`);

    // Show the success notification
    notify("Berhasil mengunduh file", "success", false);
  };

  return (
    <button
      onClick={exportToExcel}
      type="button"
      className="flex items-center bg-primary-color shadow-md w-fit hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <h1 className="flex">
        Expor <span className="hidden md:block ml-1">Hasil Survei</span>
      </h1>
      <FontAwesomeIcon icon={faFileExport} className="ml-2" />
    </button>
  );
};

export default ExportButton;
