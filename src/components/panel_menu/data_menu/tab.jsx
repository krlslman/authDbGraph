import { Tabs } from "antd";
import PageDataTable from "./tab_data_table/page";
import PageEditData from "./tab_import_export/page";

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
];

const ListTabsofData = () => {
  return (
    <div className="card-container">
      <Tabs type="card" items={items} />
    </div>
  );
};

export default ListTabsofData;
