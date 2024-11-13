import React, { useEffect, useState } from 'react';

const DataFetcher = ({ startDate, endDate, dataType, aggregationType }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('http://127.0.0.83:5000/get_graph');
      url.searchParams.append('start_date', startDate);
      url.searchParams.append('end_date', endDate);
      url.searchParams.append('data_types', dataType);
      url.searchParams.append('aggregation_type', aggregationType);

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (dataType.toLowerCase() === 'visitors') {
          // Handle visitors data separately if needed
          const visitorsData = result.data.find(item => item.name.toLowerCase() === 'visits');
          if (visitorsData) {
            const total = visitorsData.y.reduce((sum, value) => sum + value, 0);
            setData(total);
          } else {
            setData('No data available');
          }
        } else {
          // Handle other data types
          const dataset = result.data.find(item => item.name.toLowerCase() === dataType.toLowerCase());
          if (dataset) {
            const total = dataset.y.reduce((sum, value) => sum + value, 0);
            setData(total);
          } else {
            setData('No data available');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Error fetching data');
      }
    };

    fetchData();
  }, [startDate, endDate, dataType, aggregationType]);

  return (
    <div>
      {data !== null ? data : 'Loading...'}
    </div>
  );
};

export default DataFetcher;
