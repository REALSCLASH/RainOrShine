import './App.css'; // Import the same CSS file
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import myImage from './assets/graph.png';
import logo from './assets/korkeasaari.png';
import graph from './assets/graph_output.png';
import GraphComponent from './components/GraphComponent';
import { useState } from 'react';

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

function LoadGraphButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(); // Placeholder for future functionality
  };

  return (
    <button className="graph-button" onClick={handleClick}>
      Lataa
    </button>
  );
}

// Home button component that navigates back to Home
function HomeButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate back to the home view when the button is clicked
  };

  return (
    <button className="home-button" onClick={handleClick}>
      Takaisin
    </button>
  );
}

// Home component
function Home() {
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
                <div className="box-content">2132</div>
              </div>
              <div className="box box2">
                <div className="box-header">
                  <div>
                    Sää keskiarvo
                    <div className="box-subcontent">Vko, Pvm</div>
                  </div>
                </div>
                <div className="box-content">
                  <div className="section">Tuuli</div>
                  <div className="section">Lämpö</div>
                  <div className="section">Sade</div>
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
                <GraphComponent year={2023} month={10} day={5} viewType="Monthly" dataType="Rain" />
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="box box4">
              <div className="box-header">
                <div>
                  Kävijä ennuste
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
                  Sää tiedot
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
    { id: 1, year: 2023, month: 10, day: 1, viewType: 'Daily', dataType: 'Both' },
  ]);

  const addChart = () => {
    const newId = charts.length ? charts[charts.length - 1].id + 1 : 1;
    setCharts([...charts, { id: newId, year: 2023, month: 10, day: 1, viewType: 'Daily', dataType: 'Both' }]);
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

  return (
    <div className="new-view min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full max-w-4xl flex flex-col items-center py-8">
        <img src={logo} alt="Logo" className="w-64 mb-8" />
        
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
                <div className="text-gray-600 font-semibold">Valitse vaihtoehto</div>

                {['year', 'month', 'day', 'viewType', 'dataType'].map((field, idx) => (
                  <div key={idx}>
                    <label htmlFor={`${field}-select-${chart.id}`} className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <select
                      id={`${field}-select-${chart.id}`}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={chart[field]}
                      onChange={(e) => handleInputChange(chart.id, field, e.target.value)}
                    >
                      {field === 'year' && ['2024', '2023', '2022'].map((y) => <option key={y} value={y}>{y}</option>)}
                      {field === 'month' && ['1', '2', '3'].map((m) => <option key={m} value={m}>{m}</option>)}
                      {field === 'day' && ['1', '2', '3'].map((d) => <option key={d} value={d}>{d}</option>)}
                      {field === 'viewType' && ['Daily', 'Monthly'].map((v) => <option key={v} value={v}>{v}</option>)}
                      {field === 'dataType' && ['Both', 'Wind', 'Temperature'].map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex-grow pl-6">
                <div className="text-gray-600 font-semibold mb-2">Kävijät</div>
                <div className="h-64">
                  <GraphComponent
                    year={chart.year}
                    month={chart.month}
                    day={chart.day}
                    viewType={chart.viewType}
                    dataType={chart.dataType}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addChart}
          className="mt-8 w-40 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
        >
          Add Chart
        </button>
      </header>
    </div>
  );
}


export default App;
