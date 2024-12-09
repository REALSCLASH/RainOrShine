import "./App.css"; // Import the same CSS file
import RainIcon from "./assets/icons/RainIcon.svg";
import TemperatureIcon from "./assets/icons/TemperatureIcon.svg";
import WindIcon from "./assets/icons/WindIcon.svg";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import logo from "./assets/korkeasaari.png";
import GraphComponent from "./components/GraphComponent";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataFetcher from "./components/DataFetcher"; // Adjust the import path as needed
import TicketPriceFetcher from "./components/TicketPriceFetcher";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-view" element={<NewView />} />
      </Routes>
    </Router>
  );
}

// Open button component that navigates to another view
function OpenButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new-view"); // Navigate to the new view when the button is clicked
  };

  return (
    <button className="header-button" onClick={handleClick}>
      Open
    </button>
  );
}
function GoHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Navigate to the home page ("/") when the button is clicked
  };

  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" onClick={handleClick} />
    </div>
  );
}

function Home() {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // Get today's date in the format 'YYYY-MM-DD'
  const today = new Date().toISOString().split("T")[0];

  // Trigger fetch when the component mounts
  useEffect(() => {
    setFetchTrigger(true);

    // Dynamically load the weather widget script
    const scriptId = "weatherwidget-io-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Weather widget script loaded successfully.");
      };
    } else {
      // If the script is already loaded, reinitialize the widget
      window.__weatherwidget_init && window.__weatherwidget_init();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <GoHome />
      </header>
      <div className="container">
        <div className="left-side">
          <div className="top-boxes">
            <div className="box box1">
              <div className="box-header">
                <div>
                  Asiakkaat
                  <div className="box-subcontent">Tänään</div>
                </div>
              </div>
              <div className="box-content">
                <DataFetcher
                  startDate={today}
                  endDate={today}
                  dataType="visitors"
                />
              </div>
            </div>
            <div className="box box2">
              <div className="box-header">
                <div>
                  Sää keskiarvo
                  <div className="box-subcontent">Tänään</div>
                </div>
              </div>
              <div className="box-content">
                <div className="section">
                  <img
                    src={WindIcon}
                    alt="Wind icon"
                    style={{ width: "44px", height: "44px" }}
                  />
                  1
                </div>
                <div className="section">
                  <img
                    src={TemperatureIcon}
                    alt="Temp icon"
                    style={{ width: "44px", height: "44px" }}
                  />
                  1
                </div>
                <div className="section">
                  <img
                    src={RainIcon}
                    alt="Rain icon"
                    style={{ width: "44px", height: "44px" }}
                  />
                  1
                </div>
              </div>
            </div>
          </div>
          <div className="wide-box box3">
            <div className="box-header">
              <div>
                Kävijät
                <div className="box-subcontent">Tänään</div>
              </div>
              <OpenButton /> {/* OpenButton for navigation */}
            </div>
            <div className="image-container">
              <GraphComponent
                startDate={today}
                endDate={today}
                dataTypes={["temperature", "rain", "windspeed"]}
                fetchTrigger={fetchTrigger}
                onFetchComplete={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="box box4">
            <div className="box-header">
              <div>
                Dynaaminen hinta
                <div className="box-subcontent">Tänään</div>
              </div>
            </div>
            <div className="box-content">
              <TicketPriceFetcher />
            </div>
          </div>
          <div className="box box5">
            <div className="box-header">
              <div>
                Säätiedot
                <div className="box-subcontent">Vko, Pvm</div>
              </div>
            </div>
            <div className="box-content">
              <div id="weather-widget-container">
                {/* Weather widget injected here */}
                <a
                  className="weatherwidget-io"
                  href="https://forecast7.com/en/60d1724d94/helsinki/"
                  data-label_1="HELSINKI"
                  data-label_2="Sää"
                  data-theme="pure"
                >
                  HELSINKI Sää
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewView() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);

  const formatDate = (date) => date.toISOString().slice(0, 10);

  const defaultStartDate = formatDate(lastWeek);
  const defaultEndDate = formatDate(today);

  const [charts, setCharts] = useState([
    {
      id: 1,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      dataType: ["temperature"],
      fetchTrigger: false,
      isLoading: false,
      isSingleDay: false,
      showData: false,
      displayStartDate: defaultStartDate,
      displayEndDate: defaultEndDate,
      displayDataTypes: ["temperature"],
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);

  const addChart = () => {
    const newId = charts.length ? charts[charts.length - 1].id + 1 : 1;
    setCharts([
      ...charts,
      {
        id: newId,
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        dataType: ["temperature"],
        fetchTrigger: false,
        isLoading: false,
        isSingleDay: false,
        showData: false,
        displayStartDate: defaultStartDate,
        displayEndDate: defaultEndDate,
        displayDataTypes: ["temperature"],
      },
    ]);
  };

  const removeChart = (id) => {
    setCharts(charts.filter((chart) => chart.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id
          ? { ...chart, [field]: value, fetchTrigger: false }
          : chart
      )
    );
  };

  const handleCheckboxChange = (id, type) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id
          ? {
              ...chart,
              dataType: chart.dataType.includes(type)
                ? chart.dataType.filter((t) => t !== type)
                : [...chart.dataType, type],
              fetchTrigger: false,
            }
          : chart
      )
    );
  };

  const triggerFetch = (id) => {
    setIsFetching(true);
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id
          ? {
              ...chart,
              fetchTrigger: !chart.fetchTrigger,
              isLoading: true,
              showData: true,
              displayStartDate: chart.startDate,
              displayEndDate: chart.isSingleDay
                ? chart.startDate
                : chart.endDate,
              displayDataTypes: chart.dataType,
            }
          : { ...chart, isLoading: false }
      )
    );
  };

  const handleFetchComplete = (id) => {
    setIsFetching(false);
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id
          ? { ...chart, isLoading: false, fetchTrigger: false }
          : chart
      )
    );
  };

  const toggleSingleDay = (id) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id
          ? {
              ...chart,
              isSingleDay: !chart.isSingleDay,
              endDate: chart.startDate,
              fetchTrigger: false,
            }
          : chart
      )
    );
  };

  return (
    <div className="new-view min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="App-header">
        <GoHome />
      </header>
      <div className="w-full max-w-6xl flex flex-col items-center py-8">
        <div className="w-full flex flex-col items-center space-y-6">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-lg p-4 relative border border-gray-300"
              style={{ height: "auto" }} // Flexible height
            >
              <button
                onClick={() => removeChart(chart.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✖
              </button>

              <div className="flex flex-col md:w-1/3 w-full pr-0 md:pr-6 md:border-r border-gray-200 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Single Day:
                  </label>
                  <input
                    type="checkbox"
                    checked={chart.isSingleDay}
                    onChange={() => toggleSingleDay(chart.id)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date:
                  </label>
                  <DatePicker
                    selected={
                      new Date(
                        chart.startDate || lastWeek.toISOString().slice(0, 10)
                      )
                    }
                    onChange={(date) =>
                      handleInputChange(
                        chart.id,
                        "startDate",
                        date.toISOString().slice(0, 10)
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {!chart.isSingleDay && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date:
                    </label>
                    <DatePicker
                      selected={
                        new Date(
                          chart.endDate || today.toISOString().slice(0, 10)
                        )
                      }
                      onChange={(date) =>
                        handleInputChange(
                          chart.id,
                          "endDate",
                          date.toISOString().slice(0, 10)
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data Type:
                  </label>
                  {["temperature", "windspeed", "rain"].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${chart.id}-${type}`}
                        checked={chart.dataType.includes(type)}
                        onChange={() => handleCheckboxChange(chart.id, type)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`${chart.id}-${type}`}
                        className="text-sm text-gray-700"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => triggerFetch(chart.id)}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
                  disabled={isFetching}
                >
                  {chart.isLoading ? "Loading..." : "Load Graph"}
                </button>
              </div>

              <div className="w-full md:w-2/3 pl-0 md:pl-6 flex flex-col">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Showing data for {chart.displayStartDate}{" "}
                  {chart.isSingleDay ? "" : `- ${chart.displayEndDate}`}
                </div>

                <div
                  className="flex-grow bg-gray-100 rounded-lg mb-4 flex items-center justify-center md:min-h-[500px] lg:min-h-[550px]"
                  style={{ height: "auto", minHeight: "420px" }}
                >
                  <GraphComponent
                    startDate={chart.displayStartDate}
                    endDate={chart.displayEndDate}
                    dataTypes={chart.dataType}
                    fetchTrigger={chart.fetchTrigger}
                    onFetchComplete={() => handleFetchComplete(chart.id)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addChart}
            className="mt-8 w-40 bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition"
            disabled={isFetching}
          >
            Add Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
