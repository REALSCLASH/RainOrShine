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
    const fetchGraph = async () => {
      try {
        // Ensure 'visitors' is always included in data types
        const selectedDataTypes = [dataType ? dataType.toLowerCase() : 'rain', 'visitors'].join(',');

        // Format start and end dates
        const startDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 00:00`;
        const endDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 23:59`;

        // Set aggregation type based on viewType
        const aggregationType = viewType === 'Monthly' ? 'monthly' : 'daily';

        // Create the URL
        const url = new URL('http://192.168.1.83:5000/get_graph');
        url.searchParams.append('start_date', startDate);
        url.searchParams.append('end_date', endDate);
        url.searchParams.append('data_types', selectedDataTypes);
        url.searchParams.append('aggregation_type', aggregationType);

        // Fetch data from the backend
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();

        // Set graph data and layout from backend response
        setGraphData(data.data || []);
        setLayout((prevLayout) => ({
          ...prevLayout,
          ...data.layout,
          title: data.layout?.title || 'Graph Data',
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGraph();
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
