/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { BackTop, Card, Space, Statistic, Typography } from "antd";
import {
  DollarCircleOutlined,
  IssuesCloseOutlined,
  CheckCircleOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import LineChart from "../graphs/LineChart";
import { useStateContext } from "/src/context/StateContext";
import BarChart from "../graphs/BarChart";

const Home = () => {
  const { dataSource, filteredDataSource } = useStateContext();
  const [homeLineChartData, setHomeLineChartData] = useState({
    labels: dataSource.slice(10, 30).map((data) => data.city),
    datasets: [
      {
        label: "Base Distribution",
        data: dataSource.slice(10, 30).map((data) => data.basedist),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Current Distribution",
        data: dataSource.slice(10, 30).map((data) => data.currentdist),
        backgroundColor: [
          "#13005A",
          "#00337C",
          "#1C82AD",
          "#03C988",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  });
  function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }

  return (
    <section id="" style={{maxWidth:"100vw",overflow: "hidden",}}>
      <div className="flex flex-wrap-reverse gap-lg-5 sm:flex-col md:flex-row">
        <div className="sm:w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl m-5">Information about this project</h1>

          <ol className="p-2 m-auto ml-5">
            <li>
              <h2>MongoDB Connection</h2>
              <p>
              Implemented a MongoDB connection handler to establish a connection 
              to a MongoDB database. Used the official MongoDB driver to 
              interact with the database.
              </p>
            </li>
            <li>
              <h2>Data Filtering:</h2>
              <p>
                Implemented a radio button change event handler to filter data
                based on selected options. Used state variables to store and
                update filtered data. Applied array filtering to retrieve
                matching items based on the selected option.
              </p>
            </li>
            <li>
              <h2>Import, Parse and Export Data:</h2>
              <p>
                Created a function to generate a download link for the filtered
                data. Utilized a modal component to display the download link.
                Converted the filtered data to JSON format and encoded it for
                download.
              </p>
            </li>
            <li>
              <h2>Graphs and Charts:</h2>
              <p>
                Developed separate components for different types of graphs
                (BarChart, LineChart, PieChart). Utilized external charting
                libraries (chart.js, react-chartjs-2) for graph rendering. Used
                data from the filteredDataSource state variable to generate the
                graph data. Implemented a slider component to control the range
                of data displayed on the graphs. Conditionally rendered the
                graphs based on the availability of data. Updated the graph data
                based on the selected range using the sliderValue state
                variable.
              </p>
            </li>
            <li>
              <h2>State Management:</h2>
              <p>
                Utilized a custom hook (useStateContext) to access state
                variables from the context (StateContext). Managed local state
                variables using the useState hook.
              </p>
            </li>
            <li>
              <h2>Component Composition:</h2>
              <p>
                Organized the page layout into two halves to accommodate
                multiple graphs side by side. Nested the graphs and slider
                components within appropriate divs and applied styling classes
                for layout and presentation.
              </p>
            </li>
            <li>
              <h2>useEffect Hook:</h2>
              <p>
                Used the useEffect hook to update the graph data based on
                changes to the sliderValue or JsonData. Sliced the data based on
                the selected range using Array.slice. Constructed the userData
                object with labels and dataset information for each graph type.
              </p>
            </li>
            <li>
              <h2>Error Handling:</h2>
              <p>
                Displayed appropriate messages when the required data for a
                specific chart type is missing.
              </p>
            </li>
            <li>
              <h2>Dependencies:</h2>
              <p>
                Used various external dependencies such as @auth0/nextjs-auth0,
                antd, chart.js, csvtojson, etc. Managed dependencies using
                package managers like NPM or Yarn.
              </p>
            </li>
          </ol>

          <button className="my-5 mx-auto btn">Click here</button>
          <BackTop />
        </div>

        <div className="sm:w-full lg:w-1/2 mt-4 flex flex-wrap">
          <Space size={20} direction="vertical"
          style={{ width:"100vw" }}
          className="flex flex-col items-center justify-center">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal" 
              className="flex flex-row flex-wrap items-center justify-center mb-4">
              <DashboardCard
                className="sm:w-1/2"
                icon={
                  <IssuesCloseOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0,255,0,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Issues"}
                value={"2412"}
              />
              <DashboardCard
                className="sm:w-1/2"
                icon={
                  <CheckCircleOutlined
                    style={{
                      color: "blue",
                      backgroundColor: "rgba(0,0,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Solved"}
                value={"1185"}
              />
              <DashboardCard
                icon={
                  <FundProjectionScreenOutlined
                    style={{
                      color: "rgb(154, 64, 0)",
                      backgroundColor: "rgb(253, 202, 59)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Projects"}
                value={"911"}
              />
              <DashboardCard
                icon={
                  <DollarCircleOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0, 255, 89, 0.48)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Revenue"}
                value={"21187 $"}
              />
            </Space>
          </Space>

          <div
            className="p-0 testStyling homeImage m-5"
            style={{ overflow: "hidden", width:"100vw",  height:"auto" }}
          >
            <LineChart chartData={homeLineChartData} />
          </div>
          <div
            className="p-0 testStyling homeImage m-5"
            style={{ overflow: "hidden", width:"100vw",  height:"auto" }}
          >
            <BarChart chartData={homeLineChartData} style={{maxWidth:"100vw"}} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
