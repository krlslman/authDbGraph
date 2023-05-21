import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Input, Popconfirm, Table, message } from "antd";
import { SearchOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useStateContext } from "/src/context/StateContext";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};



const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};



const PageEditData = () => {
  const { dataSource, setDataSource, filteredDataSource, setFilteredDataSource } = useStateContext();
  const [data, setData] = useState(dataSource);

  const searchInputIdRef = useRef(null);
  const searchInputCityRef = useRef(null);
  const searchInputWarehouseRef = useRef(null);

  const myColumns = [
    {
      title: "id",
      dataIndex: "id",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            ref={searchInputIdRef}
            placeholder="Filter..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
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
        return (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );
      },
      onFilter: (value, record) => {
        return record.id == value;
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputIdRef.current.select(), 100);
        }
      },
    },
    {
      title: "warehouse",
      dataIndex: "warehouse",
      editable: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            ref={searchInputWarehouseRef}
            placeholder="Filter..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
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
        return (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );
      },
      onFilter: (value, record) => {
        return record.warehouse.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputWarehouseRef.current.select(), 100);
        }
      },
    },
    {
      title: "city",
      dataIndex: "city",
      editable: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            ref={searchInputCityRef}
            placeholder="Filter..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
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
        return (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );
      },
      onFilter: (value, record) => {
        return record.city.toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputCityRef.current.select(), 100);
        }
      },
    },
    {
      title: "base distribution",
      dataIndex: "basedist",
      editable: true,
      render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    {
      title: "current distribution",
      dataIndex: "currentdist",
      editable: true,
      render: (value) => `${(value * 100).toFixed(0)}%`,
    },
    { title: "stock", dataIndex: "stock", editable: true },
    { title: "order", dataIndex: "order", editable: true },
    { title: "allowance", dataIndex: "allowance", editable: true },
    { title: "ord-alw difference", dataIndex: "ord_alw_diff", editable: true },
    { title: "transfer", dataIndex: "transfer", editable: true },
    { title: "month end stock", dataIndex: "monthly_last_stock", editable: true },
    { title: "month end sit", dataIndex: "monthly_last_sit", editable: true },
    { 
      title: "", 
      dataIndex: "delete-row",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="This action will permanently delete this row. Sure?" okType="primary" className="text-red-600" onConfirm={() => handleDelete(record)}>
            <a><DeleteOutlined className="text-red-600"/></a>
          </Popconfirm>
        ) : null,
    },
  ];
  const [count, setCount] = useState(filteredDataSource.length);

  const handleDelete = (record) => {
    const newData = data.filter((item) => item.id !== record.id);
    setData(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count+1,
      id: count+1,
      warehouse: "",
      city: "",
      basedist: "",
      currentdist: "",
      stock: "",
      order: "",
      allowance: "",
      ord_alw_diff: "",
      transfer: "",
      monthly_last_stock: "",
      monthly_last_sit: "",
    };
    setData([newData, ...data]); // adds to top
  };

  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  const handleSaveAll = () => {
    const requiredFields = ['warehouse', 'city', 'basedist'];
    let validate = true;
  
    const updatedData = data.map((item) => {
      for (const field of requiredFields) {
        if (!item[field]) {
          validate = false;
          break;
        }
      }
      return item;
    });
  
    if (!validate) {
      message.error('Required fields cannot be null!');
    } else {
      message.success('Successfully added!');
      setFilteredDataSource(updatedData);
    }
  };
  
  useEffect(() => {
    setData(filteredDataSource)
    setCount(filteredDataSource.length)
  }, [filteredDataSource])
  
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = myColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Alert
        message="Caution: Permanent Data Changes Ahead!"
        description=" 
        Please be careful as operations on this page will cause permanent changes to the data."
        type="warning"
        showIcon
        closable
      />
      <div className="flex justify-between">
        <Button
          onClick={handleAdd}
          type="default"
          shape="round"
          style={{
            marginBottom: 16,
          }}
        >
          +
        </Button>
        
        <Popconfirm title="This will apply all changes to current data. Sure?" okType="primary" className="text-red-600" onConfirm={() => handleSaveAll()}>
            <a><Button
                type="primary"
                shape="round"
                icon={<SaveOutlined />}
                size={"default"}
                >
                Save All
              </Button>
            </a>
          </Popconfirm>
      </div>
      <Table
        id="main_table_edit"
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};

export default PageEditData;
