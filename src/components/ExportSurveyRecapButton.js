import React from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

function ExportSurveyRecapButton({ exportData, tableIds }) {
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    tableIds.forEach((tableId) => {
      const tableElement = document.getElementById(tableId);
      if (!tableElement) {
        console.error(`Table element not found: ${tableId}`);
        return;
      }

      const worksheet = XLSX.utils.table_to_sheet(tableElement);
      XLSX.utils.book_append_sheet(workbook, worksheet, tableId);
    });

    XLSX.writeFile(workbook, "tables.xlsx");
  };

  return (
    <button
      onClick={handleExportExcel}
      type="button"
      className="flex items-center bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <h1 className="flex">
        Ekpor <span className="hidden md:block ml-1">Rekap</span>
      </h1>
      <FontAwesomeIcon icon={faFileExport} className="ml-2" />
    </button>
  );
}

export default ExportSurveyRecapButton;
