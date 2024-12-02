import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const GraphComponent = ({
  startDate = "2023-10-05",
  endDate = "2023-10-05",
  dataTypes = ["temperature"],
  fetchTrigger = false, // New prop to control fetch trigger
  onFetchComplete, // Callback to notify fetch completion
}) => {
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    responsive: true,
  });

  const fetchData = async () => {
    // Determine the correct endpoint based on the date range
    const isSingleDay = startDate === endDate;
    const endpoint = isSingleDay ? "get_graph_day" : "get_graph";
    const url = new URL(
      `https://innovation-project-rain-or-shine-backend-drgugwd9a2djcsff.northeurope-01.azurewebsites.net/${endpoint}`
    );
    url.searchParams.append("start_date", `${startDate} 00:00`);
    url.searchParams.append("end_date", `${endDate} 23:59`);
    dataTypes.forEach((type) => url.searchParams.append("data_types", type));

    try {
      console.log("Fetching data from:", url);
      const response = await fetch(url);
      const data = await response.json();
      setGraphData(data.data);
      setLayout((prevLayout) => ({
        ...prevLayout,
        ...data.layout,
        responsive: true,
      }));
      if (onFetchComplete) onFetchComplete(); // Notify that fetching is complete
    } catch (error) {
      console.error("Error fetching graph data:", error);
      if (onFetchComplete) onFetchComplete(); // Ensure callback is called even on error
    }
  };

  // Use effect that listens only for the fetchTrigger change
  useEffect(() => {
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  return (
    <Plot
      data={graphData}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GraphComponent;
