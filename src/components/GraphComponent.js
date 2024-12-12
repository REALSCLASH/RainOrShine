import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const GraphComponent = ({
  startDate = "2023-10-05",
  endDate = "2023-10-05",
  dataTypes = ["temperature"],
  fetchTrigger = false,
  onFetchComplete,
}) => {
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    autosize: true,
    responsive: true,
    width: null,
    height: null,
    hovermode: "x unified",
    xaxis: {
      title: "Date",
      showspikes: true,
      spikemode: "across",
      spikesnap: "cursor",
      spikecolor: "gray",
      spikethickness: 1,
    },
    yaxis: {
      title: "Value",
    },
  });

  const fetchData = async () => {
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
        hovermode: "x unified",
        autosize: true,
        responsive: true,
      }));
      if (onFetchComplete) onFetchComplete();
    } catch (error) {
      console.error("Error fetching graph data:", error);
      if (onFetchComplete) onFetchComplete();
    }
  };
  useEffect(() => {
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  return (
    <div className="graph-container">
      <Plot
        data={graphData}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GraphComponent;
