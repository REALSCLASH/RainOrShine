import './App.css'; // Import the same CSS file
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import myImage from './assets/graph.png';
import logo from './assets/korkeasaari.png';
import graph from './assets/graph_output.png';
import GraphComponent from './components/GraphComponent';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataFetcher from './components/DataFetcher'; // Adjust the import path as needed

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
    navigate('/new-view'); // Navigate to the new view when the button is clicked
  };

  return (
    <button className="header-button" onClick={handleClick}>
      Open
    </button>
  );
}
function GoBack() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate to the home page ("/") when the button is clicked
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-8 left-8 w-40 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
    >
      Back
    </button>
  );
}

function Home() {
  const sday = '2024-07-15';
  const eday = '2024-07-15';
  const atype = 'weekly';
  const lastsday = '2024-07-15';
  const lasteday = '2024-07-21';
  const lastatype = 'weekly';

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="container">
          <div className="left-side">
            <div className="top-boxes">
              <div className="box box1">
                <div className="box-header">
                  <div>
                    Visitors
                    <div className="box-subcontent">Vko, Pvm</div>
                  </div>
                </div>
                <div className="box-content">
                  <DataFetcher
                    startDate={sday}
                    endDate={eday}
                    dataType="visitors"
                    aggregationType={atype}
                  />
                </div>
              </div>
              <div className="box box2">
                <div className="box-header">
                  <div>
                    Sää keskiarvo
                    <div className="box-subcontent">Vko, Pvm</div>
                  </div>
                </div>
                <div className="box-content">
                  <div className="section">
                    Tuuli
                    <DataFetcher
                      startDate={sday}
                      endDate={eday}
                      dataType="windspeed"
                      aggregationType={atype}
                    />
                  </div>
                  <div className="section">
                    Lämpö
                    <DataFetcher
                      startDate={sday}
                      endDate={eday}
                      dataType="temperature"
                      aggregationType={atype}
                    />
                  </div>
                  <div className="section">
                    Sade
                    <DataFetcher
                      startDate={sday}
                      endDate={eday}
                      dataType="rain"
                      aggregationType={atype}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="wide-box box3">
              <div className="box-header">
                <div>
                  Kävijät
                  <div className="box-subcontent">Vko, Pvm</div>
                </div>
                <OpenButton /> {/* OpenButton for navigation */}
              </div>
              <div className="image-container">
                <GraphComponent
                  startDate={lastsday}
                  endDate={lasteday}
                  dataTypes={['temperature', 'rain']}
                  aggregationType={lastatype}
                  fetchTrigger={true}
                />
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="box box4">
              <div className="box-header">
                <div>
                  Kävijäennuste
                  <div className="box-subcontent">Vko, Pvm</div>
                </div>
                <OpenButton />
              </div>
              <div className="box-content">
                <div className="section">1321</div>
                <div className="section">Tuuli</div>
                <div className="section">Lämpö</div>
                <div className="section">Sade</div>
              </div>
            </div>
            <div className="box box5">
              <div className="box-header">
                <div>
                  Säätiedot
                  <div className="box-subcontent">Vko, Pvm</div>
                </div>
              </div>
              <div className="box-content">Content 5</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function NewView() {
  const [charts, setCharts] = useState([
    {
      id: 1,
      startDate: '2023-10-03',
      endDate: '2023-10-09',
      dataType: 'temperature',
      aggregationType: 'weekly',
      fetchTrigger: false,
    },
  ]);

  const addChart = () => {
    const newId = charts.length ? charts[charts.length - 1].id + 1 : 1;
    setCharts([
      ...charts,
      {
        id: newId,
        startDate: '2023-10-03',
        endDate: '2023-10-09',
        dataType: 'temperature',
        aggregationType: 'weekly',
        fetchTrigger: false,
      },
    ]);
  };

  const removeChart = (id) => {
    setCharts(charts.filter((chart) => chart.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, [field]: value } : chart
      )
    );
  };

  const triggerFetch = (id) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, fetchTrigger: !chart.fetchTrigger } : chart
      )
    );
  };

  return (
    <div className="new-view min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full max-w-4xl flex flex-col items-center py-8">
        <img src={logo} alt="Logo" className="w-64 mb-8" />

        <GoBack /> {/* GoBack button for navigation */}

        <div className="w-full flex flex-col items-center space-y-6">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="flex flex-row w-full bg-white rounded-lg shadow-lg p-4 relative border border-gray-300"
            >
              <button
                onClick={() => removeChart(chart.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✖
              </button>

              <div className="flex flex-col w-1/3 pr-6 border-r border-gray-200 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date:</label>
                  <DatePicker
                    selected={new Date(chart.startDate)}
                    onChange={(date) =>
                      handleInputChange(chart.id, 'startDate', date.toISOString().slice(0, 10))
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date:</label>
                  <DatePicker
                    selected={new Date(chart.endDate)}
                    onChange={(date) =>
                      handleInputChange(chart.id, 'endDate', date.toISOString().slice(0, 10))
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Data Type:</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={chart.dataType}
                    onChange={(e) => handleInputChange(chart.id, 'dataType', e.target.value)}
                  >
                    {['temperature', 'windspeed', 'rain'].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row items-center mt-4">
                  <button
                    onClick={() => triggerFetch(chart.id)}
                    className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
                  >
                    {chart.fetchTrigger ? 'Stop Fetching' : 'Start Fetching'}
                  </button>
                </div>
              </div>

              <div className="w-2/3 pl-6">
                <GraphComponent
                  startDate={chart.startDate}
                  endDate={chart.endDate}
                  dataTypes={[chart.dataType]}
                  aggregationType={chart.aggregationType}
                  fetchTrigger={chart.fetchTrigger}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addChart}
            className="mt-8 w-40 bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition"
          >
            Add Chart
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
