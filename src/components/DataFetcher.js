import React, { useEffect, useState } from "react";

const DataFetcher = ({ startDate, endDate, dataType }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Determine the correct endpoint based on the date range
      const isSingleDay = startDate === endDate;
      const endpoint = isSingleDay ? "get_graph_day" : "get_graph";
      const url = new URL(
        `https://innovation-project-rain-or-shine-backend-drgugwd9a2djcsff.northeurope-01.azurewebsites.net/${endpoint}`
      );
      url.searchParams.append("start_date", `${startDate} 00:00`);
      url.searchParams.append("end_date", `${endDate} 23:59`);
      url.searchParams.append("data_types", dataType);

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (dataType.toLowerCase() === "visitors") {
          // Handle visitors data by summing up the values
          const visitorsData = result.data.find(
            (item) => item.name.toLowerCase() === "visits"
          );
          if (visitorsData) {
            const total = visitorsData.y.reduce((sum, value) => sum + value, 0);
            setData(total);
          } else {
            setData("No data available");
          }
        } else {
          // Handle weather data by calculating the average or taking the latest value
          const dataset = result.data.find(
            (item) => item.name.toLowerCase() === dataType.toLowerCase()
          );
          if (dataset) {
            const average =
              dataset.y.reduce((sum, value) => sum + value, 0) /
              dataset.y.length;
            setData(average.toFixed(1)); // Round to one decimal place
          } else {
            setData("No data available");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData("Error fetching data");
      }
    };

    fetchData();
  }, [startDate, endDate, dataType]);

  return <div>{data !== null ? data : "Loading..."}</div>;
};

export default DataFetcher;
