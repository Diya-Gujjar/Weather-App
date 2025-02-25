import React, {useEffect, useState } from "react";
import '../App.css';

function TempApp() {
  const [search, setSearch] = useState("Delhi");
  const [weatherData, setWeatherData] = useState("");
  const [imgurl, setImgurl] = useState("https://openweathermap.org/img/wn/02d@2x.png");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const apikeys = "952ee7078891a608638a86c40146bdb7";

  const fetchWeatherData = async () => {
    setError(""); 
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apikeys}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error in fetching API");
      }
      const resJSON = await response.json();
      if (resJSON.main) {
        setWeatherData(resJSON.main);
        if (resJSON.weather && resJSON.weather.length > 0) {
          const imgUrl = `https://openweathermap.org/img/wn/${resJSON.weather[0].icon}@2x.png`;
          setImgurl(imgUrl);
          const desc = resJSON.weather[0].description;
          setDescription(desc)
        }
      } else {
        setWeatherData(null); // If no data found, set it to null
      }
    } catch (error) {
      setError("Error in fetching API"); // Display error message
      setWeatherData(null); // Clear weather data on error
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="container">
      <div>
        <input type='search'
          value={search}
          className="inputField"
          onChange={(event) => { setSearch(event.target.value) }} />
          <button className="btn" onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {!weatherData ? (<p>No Data Found</p>) :
        (<div>
          <div className="city-name"><i>{search}</i></div>
          <p className="descrpt">( {description} )</p>
          <img src={imgurl} alt="Description" />
          <div className="temp">
            {` ${weatherData.temp} °C`}
          </div>
          <div className="min-max">
            Min: {weatherData.temp_min} °C | Max: {weatherData.temp_max} °C
          </div>
          <div className="humidity"> Humidity: {weatherData.humidity} </div>
        </div>)}
    </div>
  );
}

export default TempApp