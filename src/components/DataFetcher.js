import React, { useEffect, useState } from "react";

const DataFetcher = ({ startDate, endDate, dataType }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        console.log("Fetched result:", result);
        const dataset = result.data?.[0];
        if (dataset) {
          console.log("Dataset found:", dataset);
          if (dataType.toLowerCase() === "visitors") {
            const totalVisitors = dataset.y.reduce(
              (sum, value) => sum + value,
              0
            );
            setData(totalVisitors);
          } else {
            const average =
              dataset.y.reduce((sum, value) => sum + value, 0) /
              dataset.y.length;
            setData(average.toFixed(1));
          }
        } else {
          console.error("Dataset is not available in the response");
          setData("Ei dataa saatavilla");
        }
      } catch (error) {
        console.error("Virhe datan hakemisessa:", error);
        setData("Virhe datan hakemisessa");
      }
    };

    fetchData();
  }, [startDate, endDate, dataType]);

  return <div>{data !== null ? data : "Ladataan..."}</div>;
};

export default DataFetcher;
