import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import JsonData from '../../../data/data.json';
import { Slider } from 'antd';

const Graphs = () => {
  const [userData, setUserData] = useState(null);
  const [sliderValue, setSliderValue] = useState([10, 20]);

  useEffect(() => {
    if (JsonData) {
      const [start, end] = sliderValue;
      const slicedData = JsonData.slice(start, end);
      setUserData({
        labels: slicedData.map((data) => data.city),
        datasets: [
          {
            label: 'Base Distribution',
            data: slicedData.map((data) => data.basedist),
            backgroundColor: [
              'rgba(75, 192, 192, 1)',
              '#ecf0f1',
              '#50AF95',
              '#f3ba2f',
              '#2a71d0',
            ],
            borderColor: 'black',
            borderWidth: 2,
          },
        ],
      });
    }
  }, [sliderValue]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <>
      <Slider
        className="p-5"
        tooltip={{ open: true }}
        range={{ draggableTrack: true }}
        value={sliderValue}
        onChange={handleSliderChange}
        max={JsonData.length}
        min={10}
      />
      <div className="flex">
        <div className="w-1/2">
          <div>
            {userData && userData.labels && userData.labels.length > 0 ? (
            <BarChart chartData={userData} />
          ) : (
            <div>No data available for PieChart</div>
          )}
          </div>

          <div>
            {userData && userData.labels && userData.labels.length > 0 ? (
            <LineChart chartData={userData} />
          ) : (
            <div>No data available for PieChart</div>
          )}
          </div>
        </div>

        <div className="w-1/2">
          {userData && userData.labels && userData.labels.length > 0 ? (
            <PieChart chartData={userData} />
          ) : (
            <div>No data available for PieChart</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Graphs;
