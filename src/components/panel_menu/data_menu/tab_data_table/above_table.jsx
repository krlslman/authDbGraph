import { useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, message, Space, Checkbox, Radio } from "antd";
import ImportFileButton from "./importFileButton";
import { useStateContext } from '/src/context/StateContext'

// const CheckboxGroup = Checkbox.Group;
// const plainOptions = ["Turochak", "Ourozinho"];
// const defaultCheckedList = [];

const AboveTable = () => {
  const {dataSource, filteredDataSource, setFilteredDataSource, radioFilter, setRadioFilter } = useStateContext();
// console.log("radioFilter:", radioFilter);
  const onChangeRadioButton = (e) => {
    if (e === "All"){
      setFilteredDataSource(dataSource);
      setRadioFilter("All");
    } else {
      if (e === "Turochak"){
        setRadioFilter("Turochak");
      } if (e === "Ourozinho"){
        setRadioFilter("Ourozinho");
      }
      setFilteredDataSource(dataSource);
      const filteredData = dataSource.filter((item) =>
        item.city.includes(e)
      );
      setFilteredDataSource(filteredData);
    }
  };

  const handleButtonClick = (e) => {
    message.info("Click on button.");
    console.log("click button", e);
  };

  return (
    <>
      <div className='flex flex-col items-start justify-center '>
          <ImportFileButton/>
      </div>

      <div className="flex justify-"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Space wrap className="level-filter-dropdown-btns">

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
            <strong>Main Data: </strong>
            <Radio.Group name="radiogroup" value={`${radioFilter==="All"?"All":(radioFilter === "Turochak" ? "Turochak" : "Ourozinho")}`} onChange={(e)=>onChangeRadioButton(e.target.value)}>
              <Radio value={"All"}>All</Radio>
              <Radio value={"Turochak"}>Turochak</Radio>
              <Radio value={"Ourozinho"}>Ourozinho</Radio>
            </Radio.Group>
           
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
              type="default"
              shape="round"
              icon={<SaveOutlined />}
              size={"default"}
              onClick={handleButtonClick}
            >
              Save
            </Button>
            <Button
              type="default"
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
