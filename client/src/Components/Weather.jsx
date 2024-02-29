import React, { useState, useEffect } from "react";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(location);
    setLocation("");
  };

  const getWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ca8c2c7970a09dc296d9b3cfc4d06940`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('We got data!');
        console.log(data);
        setWeatherData(data);
      } else {
        console.error("Error fetching weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  /* const addBookmark = () => {
    if (weatherData) {
      setBookmarks([...bookmarks, weatherData]);
    }
  }  */

   const addBmrk = async () => {
    //send a post fetch request to the server
    let options = {
      method: "Post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(weatherData.name)
    }
    try{
      let response = await fetch("/api/bookmarks", options);
      if(response.ok){
        //update list of bookmarks 
        let data = await response.json();
        //only change the state when the response is received
        setBookmarks(data);
      }
      else{
        console.log(`Server Error: ${response.status} ${response.statusText}`);
      }
    }
    catch(err){
      console.log("Network Error", err);
    }
  };
   

  const loadBookmark = (bookmark) => {
    setWeatherData(bookmark);
  };

  useEffect(() => {
    // Default location
    getWeatherData("Paris");
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="locationForm">
        <input
          className="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleChange}
        /><button type="submit">Get Weather</button>    {/* If your form contains only one input field and you press Enter while focused on that input field, the form will naturally submit without explicitly requiring a visible submit button. This is a default behavior of HTML forms when they contain input fields and the Enter key is pressed. */}
        
      </form>

      {weatherData && (
        <div className="weatherData">
          <h2>
            {weatherData.name}, {weatherData.sys.country}{" "}
            <img
              src={`https://flagcdn.com/28x21/${weatherData.sys.country.toLowerCase()}.png`}
              width="28"
              height="21"
              alt="Ukraine"
            />
          </h2>
          <p>Current Temperature:</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="wthr img"
          />
          <h1>{weatherData.main.temp} °C</h1>
          <p className="description">{weatherData.weather[0].description}</p>
          <p>Todays's High: </p>
          <b>{weatherData.main.temp_max} °C</b>
          <p>Today's Low:</p>
          <b>{weatherData.main.temp_min} °C</b>
          
        <div className="bookmark-btn">
        
        <button type="button"  onClick={() => {
               /* addBookmark();  */ 
               addBmrk();  
  }}>
          Bookmark
        </button>
        </div>
        
        </div>
      )}
      
      <div className="bookmarks">
        <h2>Bookmarks</h2>
        <ul>
          {bookmarks.map((bookmark, index) => (
            
            <li key={index} onClick={() => loadBookmark(bookmark)}>
              {bookmark.name}, {bookmark.sys.country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
          }



