import React, { useEffect, useState } from "react";
import '../App.css';

function TempApp() {
  const [search, setSearch] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [imgurl, setImgurl] = useState("https://openweathermap.org/img/wn/02d@2x.png");
  const [description, setDescription] = useState(null);
  const apikeys = "952ee7078891a608638a86c40146bdb7";

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apikeys}`;
      const response = await fetch(url);
      const resJSON = await response.json();
      console.log(resJSON);
      setWeatherData(resJSON.main);
      if (resJSON.weather && resJSON.weather.length > 0) {
        const imgUrl = `https://openweathermap.org/img/wn/${resJSON.weather[0].icon}@2x.png`;
        setImgurl(imgUrl);
        const desc = resJSON.weather[0].description;
        setDescription(desc);
      }
    };
    fetchAPI();
  }, [search])
  return (
      <div className="container">
        <div>
          <input type='search'
            value={search}
            className="inputField"
            onChange={(event) => { setSearch(event.target.value) }} />
        </div>
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