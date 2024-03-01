import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./Components/Weather";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Map from "./Components/Map";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";

function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Header title="Weather App" />
                <Navbar /> <Weather />{" "}
              </>
            }
          />{" "}
          {/* title passes as props to header.jsx line 6 */}
          {/* When the current URL matches '/', this route will render a collection of components using the element prop. */}
          <Route
            path="/about"
            element={
              <>
                {" "}
                <Header title="About Us" />
                <Navbar />{" "}
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                {" "}
                <Header title="Contact Us" />
                <Navbar />{" "}
              </>
            }
          />
          <Route
            path="/weather"
            element={
              <>
                {" "}
                <Header title="Weather Map" />
                <Navbar /> <Map />{" "}
              </>
            }
          />
          {/* <> ... </> is a shorthand for a React Fragment. Fragments allow you to group multiple children together without introducing an additional DOM element */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
