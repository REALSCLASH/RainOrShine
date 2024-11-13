import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const GraphComponent = ({
  startDate = '2023-10-05',
  endDate = '2023-10-09',
  dataTypes = ['temperature'],
  aggregationType = 'weekly',
  fetchTrigger = false,  // New prop to control fetch trigger
}) => {
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    responsive: true,
  });

  const fetchData = async () => {
    const url = new URL('http://127.0.0.1:5000/get_graph');
    url.searchParams.append('start_date', startDate);
    url.searchParams.append('end_date', endDate);
    dataTypes.forEach((type) => url.searchParams.append('data_types', type));
    url.searchParams.append('aggregation_type', aggregationType);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setGraphData(data.data);
      setLayout((prevLayout) => ({ ...prevLayout, ...data.layout, responsive: true }));
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  // Use effect that listens only for the fetchTrigger change
  React.useEffect(() => {
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  return (
    <Plot
      data={graphData}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GraphComponent;