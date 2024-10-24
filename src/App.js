import './App.css'; // Import the same CSS file
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import myImage from './assets/graph.png'; // Adjust the path to your graph image file
import logo from './assets/korkeasaari.png'; // Adjust the path to your logo file
import graph from './assets/graph_output.png'; // Adjust the path to your logo file

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
    navigate(); // Navigate nowhere
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

// Home component  own layout
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="container">
          {/* Left side */}
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
                <img src={myImage} alt="Description of myImage" />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="right-side">
            <div className="box box4">
              <div className="box-header">
                <div>
                  Kävijä ennuste
                  <div className="box-subcontent">Vko, Pvm</div>
                </div>
                <OpenButton /> {/* OpenButton for navigation */}
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
  return (
    <div className="new-view">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <HomeButton /> {/* Button to navigate back to Home */}
        <div className="container">
          {/* Left side with dropdown menus */}
          <div className="left-side">
            <div className="box box1">
              <div className="box-header">
                <div>
                  Valitse vaihtoehto
                </div>
              </div>
              <div className="box-contentNew">
                <div>
                  <label htmlFor="year-select">Vuosi:</label>
                  <select id="year-select" className="selection-box">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="month-select">Kuukausi:</label>
                  <select id="month-select" className="selection-box">
                    <option value="january">Tammikuu</option>
                    <option value="february">Helmikuu</option>
                    <option value="march">Maaliskuu</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="week-select">Viikko:</label>
                  <select id="week-select" className="selection-box">
                    <option value="week45">Vko 45</option>
                    <option value="week44">Vko 44</option>
                    <option value="week43">Vko 43</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="day-select">Päivä:</label>
                  <select id="day-select" className="selection-box">
                    <option value="monday">Maanantai</option>
                    <option value="tuesday">Tiistai</option>
                    <option value="wednesday">Keskiviikko</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="weather-select">Sää:</label>
                  <select id="weather-select" className="selection-box">
                    <option value="rain">Sade</option>
                    <option value="temperature">Lämpötila</option>
                    <option value="wind">Tuuli</option>
                  </select>
                </div>
                <LoadGraphButton /> 
              </div>
            </div>
          </div>

          {/* Right side with a big box */}
          <div className="right-side">
            <div className="boxNew box2">
              <div className="box-header">
                <div>
                  Kävijät
                </div>
              </div>
              <div className="box-content">
                <div className="image-container">
                  <img src={graph} alt="graph output" />
                </div>
              </div>
            </div>
          </div>
        </div>


      </header>
    </div>
  );
}




export default App;
