import { Table, Input } from "antd"
import { useState, useRef } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useStateContext } from '/src/context/StateContext'


const DataTable = () => {
  const { filteredDataSource } = useStateContext();

  const searchInputRef = useRef(null);
  const columns = [
    { title: "warehouse",
      dataIndex: "warehouse",
      editable: true,
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
        return record.warehouse.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select(), 100);
        }
      },
    },
    { title: "city",
      dataIndex: "city",
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
        return record.city.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select(), 100);
        }
      },
    },
    { title: "base distribution",
        dataIndex: "basedist",
        render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    { title: "current distribution",
        dataIndex: "currentdist",
        render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    { title: "stock",
        dataIndex: "stock",
    },
    { title: "order",
        dataIndex: "order",
    },
    { title: "allowance",
        dataIndex: "allowance",
    },
    { title: "ord-alw difference",
        dataIndex: "ord_alw_diff",
    },
    { title: "transfer",
        dataIndex: "transfer",
    },
    { title: "month end stock",
        dataIndex: "monthly_last_stock",
    },
    { title: "month end sit",
        dataIndex: "monthly_last_sit",
    },
  ];


  return (
    <div>
      <Table
        id="main_table"
        columns={columns}
        dataSource={filteredDataSource}
        size="small"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default DataTable;
