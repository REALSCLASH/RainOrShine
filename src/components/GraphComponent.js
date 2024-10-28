// src/components/GraphComponent.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const GraphComponent = ({ 
  year = 2023, 
  month = 7, 
  day = 1, 
  viewType = 'Monthly', 
  dataType = 'Both', 
  showSelectors = true 
}) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedViewType, setSelectedViewType] = useState(viewType);
  const [selectedDataType, setSelectedDataType] = useState(dataType);
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    autosize: true,
    margin: { t: 50, l: 50, r: 50, b: 50 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (selectedViewType === 'Monthly') {
          url = `http://127.0.0.1:5000/get_graph?year=${selectedYear}&month=${selectedMonth}&data_type=${selectedDataType}`;
        } else {
          url = `http://127.0.0.1:5000/get_graph_for_day?year=${selectedYear}&month=${selectedMonth}&day=${selectedDay}&data_type=${selectedDataType}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setGraphData(data.data || []);
        setLayout((prevLayout) => ({
          ...prevLayout,
          title: data.layout?.title || 'Default Graph',
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, selectedDay, selectedViewType, selectedDataType]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={graphData}
        layout={layout}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default GraphComponent;
