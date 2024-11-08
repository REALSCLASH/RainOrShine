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
          url = `http://192.168.1.83:5000/get_graph?start_date=2023-10-05%2000:00&end_date=2023-10-09%2023:59&data_types=rain&aggregation_type=weekly`;
        } else {
          url = `http://192.168.1.83:5000/get_graph?start_date=2023-10-05%2000:00&end_date=2023-10-09%2023:59&data_types=rain&aggregation_type=weekly`;
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