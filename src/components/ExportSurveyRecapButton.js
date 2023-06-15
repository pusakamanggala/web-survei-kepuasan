import React from "react";
import { utils, writeFile } from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import useNotification from "../hooks/useNotification";

function ExportSurveyRecapButton({ tableIds }) {
  const notify = useNotification();

  const handleExportExcel = () => {
    const workbook = utils.book_new();

    tableIds.forEach((tableId) => {
      const tableElement = document.getElementById(tableId);
      if (!tableElement) {
        console.error(`Table element not found: ${tableId}`);
        return;
      }

      const worksheet = utils.table_to_sheet(tableElement);
      utils.book_append_sheet(workbook, worksheet, tableId);
    });
    notify("Berhasil mengunduh file", "success", false);
    writeFile(workbook, "tables.xlsx");
  };

  return (
    <button
      onClick={handleExportExcel}
      type="button"
      className="flex items-center bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <h1 className="flex">
        Export <span className="hidden md:block ml-1">Rekap</span>
      </h1>
      <FontAwesomeIcon icon={faFileExport} className="ml-2" />
    </button>
  );
}

export default ExportSurveyRecapButton;
