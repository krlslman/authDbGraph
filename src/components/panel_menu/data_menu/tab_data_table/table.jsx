import { Table, Input, Button, message, Upload } from "antd";
import jsonData from "../../../../data/data.json";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const DataTable = () => {
  // const [dataSource, setDataSource] = useState(jsonData.DataSet1);
  const [dataSource, setDataSource] = useState([]);

  const searchInputRef = useRef(null);
  const columns = [
    {
      title: "Depo",
      dataIndex: "depo",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            ref={searchInputRef}
            placeholder="Filter..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
              confirm({ closeDropDown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: ({ filtered }) => {
        return <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />;
      },
      onFilter: (value, record) => {
        return record.depo.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select(), 100);
        }
      },
    },
    {
      title: "Şehir",
      dataIndex: "sehir",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            ref={searchInputRef}
            placeholder="Filter..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
              confirm({ closeDropDown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: ({ filtered }) => {
        return <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />;
      },
      onFilter: (value, record) => {
        return record.sehir.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select(), 100);
        }
      },
    },
    {
        title: "Bazdağılım",
        dataIndex: "bazdagilim",
        render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    {
        title: "Güncel Dağılım",
        dataIndex: "gunceldagilim",
        render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    {
        title: "Stok",
        dataIndex: "stok",
    },
    {
        title: "Sipariş",
        dataIndex: "siparis",
    },
    {
        title: "Hakediş",
        dataIndex: "hakedis",
    },
    {
        title: "Sip-Hak-Fark",
        dataIndex: "sip_hak_fark",
    },
    {
        title: "Gönderim",
        dataIndex: "gonderim",
    },
    {
        title: "Aylık Son Stok",
        dataIndex: "aysonustok",
    },
    {
        title: "Aylık Son Sit.",
        dataIndex: "aysonusit",
    },
  ];

  const handleFileUpload = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
      readExcel(file);
    } else if (fileExtension === 'json') {
      readJSON(file);
    } else {
      console.error('Unsupported file format');
    }
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
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

    promise.then((d) => {
      setDataSource(d);
    });
  };  
  const readJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      setDataSource(jsonData);
      console.log("jsonData", jsonData);
    };
    reader.readAsText(file);
  };
  
  const beforeUpload = (file) => {
    readExcel(file);
    return false; // Prevent default upload behavior
  };
  const handleUploadChange = (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      handleFileUpload(originFileObj);
    }
    console.log("jsonContent", jsonContent);
  };


  return (
    <div>
      <Upload beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      

      <div>
        <h5>With Ant design:</h5>
        <Upload
          beforeUpload={() => false} // Prevent default upload behavior
          onChange={handleUploadChange}
        >
          <Button icon={<UploadOutlined />}>Select JSON File</Button>
        </Upload>
        
        <>
          <Upload beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>Select JSON File</Button>
          </Upload>
        </>
      </div><br />
      
      
      <br />
      <button onClick={()=>setDataSource([])} className="border-2 p-2 rounded-3xl text-red-600">Delete Data</button>
      
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default DataTable;
