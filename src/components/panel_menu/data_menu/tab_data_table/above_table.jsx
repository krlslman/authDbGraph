import { useState } from "react";
import {
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, message, Space, Checkbox, Radio, Modal } from "antd";
import ImportFileButton from "./importFileButton";
import { useStateContext } from '/src/context/StateContext'
import FilterButton from "./FilterButton";
import DownloadTestDataModal from "./DownloadTestFiles";

const AboveTable = () => {
  const {dataSource, filteredDataSource, setFilteredDataSource, radioFilter, setRadioFilter } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

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


  const handleDownloadButton = (e) => {
    const dataStr = JSON.stringify(filteredDataSource);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  
    // Open the modal to display the download link
    Modal.info({
      title: 'Download',
      content: (
        <div>
          <p className="py-3">Filtered data (currently on screen) will be downloaded.<br/>Click the button to download the file.</p>
          <Button type="primary" href={dataUri} download="data.json">
            Download
          </Button>
        </div>
      ),
      centered: true, // Center the modal on the screen
      maskClosable: true, // Allow closing the modal by clicking outside
    });
  };
  
  

  return (
    <>
      <section className="flex justify-between items-end mb-3">
        <div className='flex flex-col items-start justify-center '>
            <ImportFileButton/>
        </div>

        <div className="flex gap-2 m-2">
          <>
            <strong>City Filter: </strong>
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
          <div className="flex gap-2">
            <Button
              className=""
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size={"default"}
              onClick={handleDownloadButton}
              >
              Download (.json)
            </Button>
          </div>
            <Button
                className=""
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={"default"}
                onClick={handleOpenModal}
                >
                Download Test Files
            </Button>
            <DownloadTestDataModal visible={modalVisible} onClose={handleCloseModal} />
        </div>
      </section>
    </>
  );
};

export default AboveTable;
