import { Tabs } from "antd";
import PageDataTable from "./tab_data_table/page";
import PageImportExport from "./tab_import_export/page";

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
    label: "Import & Export",
    key: "2",
    children: (
      <>
        <PageImportExport />
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
