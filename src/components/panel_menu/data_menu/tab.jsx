import { Tabs } from "antd";
import PageDataTable from "./tab_data_table/page";
import PageEditData from "./tab_edit_data/page";
import MongoDBInteractions from './tab_mongo/page';


const items = [
  {
    label: "Data Table",
    key: "1",
    children: (
      <>
        <PageDataTable />
      </>
    ),
  },
  {
    label: "Edit Data",
    key: "2",
    children: (
      <>
        <PageEditData />
      </>
    ),
  },
  {
    label: "MongoDB Interactions",
    key: "3",
    children: (
      <>
        <MongoDBInteractions />
      </>
    ),
  },
];

const ListTabsofData = () => {
  return (
    <div className="card-container">
      <Tabs type="card" items={items} />
    </div>
  );
};

export default ListTabsofData;
