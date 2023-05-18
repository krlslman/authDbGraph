import { Table, Input } from "antd";
import jsonData from "../../../../data/db.json";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";

const TableOrderManagement = () => {
  const [dataSource, setDataSource] = useState(jsonData.OrderManagement);
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

  return (
    <div>
      <h4>Small size table</h4>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default TableOrderManagement;
