import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useStateContext } from "/src/context/StateContext";
import { csv } from 'csvtojson';


const ImportFileButton = () => {
  const { dataSource, setDataSource, setFilteredDataSource } = useStateContext();

  const handleFileUpload = async (file) => {
    const fileExtension = file.name;
    try {
      let data;
      if (
        fileExtension.includes(".csv")
      ) {
        data = await readCsv(file);
      } else if (fileExtension.includes(".json")) {
        data = await readJSON(file);
      } else {
        message.info("Unsupported file format");
        return;
      }
      setFilteredDataSource(data);
      setDataSource(data);
    } catch (error) {
      console.error("Error parsing file:", error);
    }
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
  const readCsv = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        csv()
          .fromString(csvData)
          .then((jsonData) => {
            resolve(jsonData);
          })
          .catch((error) => {
            console.error('Error converting CSV to JSON:', error);
            reject(error);
          });
      };
      reader.onerror = (error) => {
        console.error('Error reading CSV file:', error);
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
          Select File [csv - json]
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
