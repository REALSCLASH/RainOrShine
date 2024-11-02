import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const GraphComponent = ({ 
  year, 
  month, 
  day, 
  viewType, 
  dataType 
}) => {
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    autosize: true,
    margin: { t: 50, l: 50, r: 50, b: 50 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (viewType === 'Monthly') {
          url = `http://127.0.0.1:5000/get_graph?year=${year}&month=${month}&data_type=${dataType}`;
        } else {
          url = `http://127.0.0.1:5000/get_graph_for_day?year=${year}&month=${month}&day=${day}&data_type=${dataType}`;
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
  }, [year, month, day, viewType, dataType]); // Dependencies based on props

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