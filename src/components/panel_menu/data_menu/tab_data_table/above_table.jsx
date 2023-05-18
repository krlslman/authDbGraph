import { useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Space, Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["City based", "WH based"];
const defaultCheckedList = [];

const AboveTable = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [level1Filter, setLevel1Filter] = useState("");
  const handleLevel1Filter = (value) => {
    setLevel1Filter(value);
    message.info("setLevel1Filter");
  };
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const handleButtonClick = (e) => {
    message.info("Click on button.");
    console.log("click button", e);
  };
  // const handleMenuClick = (e) => {
  //   message.info("Click on menu item.");
  //   console.log("click", e);
  // };
  const items = [
    {
      label: "1st option",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => handleLevel1Filter("1st option"),
    },
    {
      label: "2nd option",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd option",
      key: "3",
      icon: <UserOutlined />,
    },
    {
      label: "4th option",
      key: "4",
      icon: <UserOutlined />,
    },
  ];
  const menuProps = {
    // will work each one
    items,
    // onClick: handleMenuClick,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Space wrap className="level-filter-dropdown-btns">
          <Dropdown menu={menuProps}>
            <Button>
              Level - 4
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps}>
            <Button>
              Level - 3
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps}>
            <Button>
              Level - 2
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps}>
            <Button>
              Level - 1
              <DownOutlined />
            </Button>
          </Dropdown>
        </Space>

        <Space wrap className="level-warehouse-dropdown-btns">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Warehouse - 3
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Warehouse - 2
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Warehouse - 1
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flexWrap: "wrap",
            margin: "0 1rem",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              margin: "1rem",
            }}
          >
            <strong>Missing Order Distribution</strong>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              All
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
          <div
            className=""
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              margin: "0 1rem",
            }}
          >
            <Button
              type="primary"
              shape="round"
              size={"default"}
              onClick={handleButtonClick}
            >
              Calc | Budged
            </Button>
            <Button
              type="primary"
              shape="round"
              size={"default"}
              onClick={handleButtonClick}
            >
              Calc | Target
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<SaveOutlined />}
              size={"default"}
              onClick={handleButtonClick}
            >
              Save
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size={"default"}
              onClick={handleButtonClick}
            >
              Download .xls
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboveTable;
