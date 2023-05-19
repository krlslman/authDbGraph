import { Table, Input } from "antd"
import { useState, useRef } from "react"
import { SearchOutlined } from "@ant-design/icons"
import ImportFileButton from './importFileButton'
import { useStateContext } from '/src/context/StateContext'
import FilterButton from './FilterButton'


const DataTable = () => {
  const { dataSource, filteredDataSource, setFilteredDataSource, filterWarehouse, setFilterWarehouse } = useStateContext();

  const searchInputRef = useRef(null);
  const columns = [
    { title: "warehouse",
      dataIndex: "warehouse",
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
        dataIndex: "ord-alw-diff",
    },
    { title: "transfer",
        dataIndex: "transfer",
    },
    { title: "month end stock",
        dataIndex: "monthly-last-stock",
    },
    { title: "month end sit",
        dataIndex: "monthly-last-sit",
    },
  ];


  return (
    <div>
      <FilterButton />
      
      <Table
        columns={columns}
        dataSource={filteredDataSource}
        size="small"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default DataTable;
