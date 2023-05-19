import { useState } from "react";
import {
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, message, Space, Checkbox, Radio } from "antd";
import ImportFileButton from "./importFileButton";
import { useStateContext } from '/src/context/StateContext'
import FilterButton from "./FilterButton";

const AboveTable = () => {
  const {dataSource, setFilteredDataSource, radioFilter, setRadioFilter } = useStateContext();
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
      <section className="flex justify-between items-end mb-3">
        <div className='flex flex-col items-start justify-center '>
            <ImportFileButton/>
        </div>

        <div className="flex gap-2 m-2">
          <>
            <strong>Main Data: </strong>
            <Radio.Group name="radiogroup" value={`${radioFilter==="All"?"All":(radioFilter === "Turochak" ? "Turochak" : "Ourozinho")}`} onChange={(e)=>onChangeRadioButton(e.target.value)}>
              <Radio value={"All"}>All</Radio>
              <Radio value={"Turochak"}>Turochak</Radio>
              <Radio value={"Ourozinho"}>Ourozinho</Radio>
            </Radio.Group>
          </>
          <div className='flex flex-col items-start justify-center '>
              <FilterButton />
          </div>
        </div>

        <div className="flex gap-2 m-2">
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
      </section>
    </>
  );
};

export default AboveTable;
