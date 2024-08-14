import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const CsvToExcelConverter = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = ['Product name', 'Color', 'Category', 'Price'];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').slice(1);
        const jsonData = rows.map(row => {
          const [productName, color, category, price] = row.split(',');
          return { 'Product name': productName, Color: color, Category: category, Price: price };
        });
        setData(jsonData);
      };
      reader.readAsText(file);
    }
  };

  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(rowIndex);
      if (isSelected) {
        return prevSelectedRows.filter(index => index !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };

  const handleConvertToXLSX = () => {
    const rowsToExport = selectedRows.length > 0
      ? selectedRows.map(index => data[index])
      : data;

    if (rowsToExport.length === 0) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rowsToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table-data.xlsx');
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <button
          onClick={handleConvertToXLSX}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Convert Selected Rows to XLSX
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">
                Select
              </th>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-6 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelect(index)}
                  />
                </td>
                {columns.map((column) => (
                  <td 
                    key={column} 
                    className={`px-6 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} dark:text-white dark:bg-gray-800`}
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvToExcelConverter;
