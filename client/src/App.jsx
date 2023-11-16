import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Weather from './Components/Weather';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Map from './Components/Map';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<>  <Header title="Weather App"/><Navbar/> <Weather/> </> }/>
        <Route path='/about' element={<>  <Header title="About Us"/><Navbar/> </> }/>
        <Route path='/contact' element={<>  <Header title="Contact Us"/><Navbar/> </> }/>
        <Route path='/weather' element={<>  <Header title="Weather Map"/><Navbar/> <Map/> </> }/>



      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
