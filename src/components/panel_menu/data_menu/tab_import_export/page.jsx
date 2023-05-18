import { Tabs } from "antd";
import OrderManagement from "../tab_data_table/data_table";

const items = [
  {
    label: "Data Table",
    key: "1",
    children: (
      <>
        <OrderManagement />
      </>
    ),
  },
  {
    label: "Import & Export",
    key: "3",
    children: (
      <>
        <p>Import</p>
        <p>Export</p>
      </>
    ),
  },
];

const EqualDistrubution = () => {
  return (
    <div className="card-container">
      <Tabs type="card" items={items} />
    </div>
  );
};

export default EqualDistrubution;
