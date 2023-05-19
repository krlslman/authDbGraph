import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useStateContext } from "/src/context/StateContext";

const ImportFileButton = () => {
  const { dataSource, setDataSource, setFilteredDataSource } = useStateContext();

  const handleFileUpload = async (file) => {
    const fileExtension = file.name;
    try {
      let data;
      if (
        fileExtension.includes(".xlsx") ||
        fileExtension.includes(".xls") ||
        fileExtension.includes(".csv")
      ) {
        data = await readExcel(file);
      } else if (fileExtension.includes(".json")) {
        data = await readJSON(file);
      } else {
        console.error("Unsupported file format");
        return;
      }
      // Do something with the parsed data, for example, update the dataSource state
      setFilteredDataSource(data);
      setDataSource(data);
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  };

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const readJSON = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonData = JSON.parse(e.target.result);
        resolve(jsonData.DataSet1);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const beforeUpload = (file) => {
    handleFileUpload(file);
    return false; // Prevent default upload behavior
  };

  return (
    <div className="">
      <Upload beforeUpload={beforeUpload} maxCount={1}>
        <Button icon={<UploadOutlined />}>
          Select File [xls - csv - json]
        </Button>

      </Upload>
        <button
          onClick={() => setFilteredDataSource([])}
          className="p-2 text-red-600 underline text-xs"
        >
          Delete Imported Data
        </button>
      <br />
    </div>
  );
};

export default ImportFileButton;
