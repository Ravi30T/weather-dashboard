import { useState, useEffect } from "react";
import "./index.css";

const Home = () => {
  const [searchVal, updateSearchVal] = useState("Hyderabad");
  const [weatherData, updateWeatherData] = useState("");
  console.log(searchVal);
  const onEnterSearchVal = (event) => {
    updateSearchVal(event.target.value);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      const API_KEY = "0303e44a2a8726ae236d50d3756d2979";
      // const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}`;
      // const apiUrl = `https://bulk.openweathermap.org/snapshot/weather_zip_us.csv.gz?appid=${API_KEY}`;
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&appid=${API_KEY}`;

      const options = {
        method: "GET",
      };

      const response = await fetch(apiUrl, options);

      const data = await response.json();
      console.log(data);

      const updatedData = data.list;
      const newData = data.list.map((each) => ({
        temperature: each.main.temp,
        humidity: each.main.humidity,
        wind: each.wind.speed,
        weather: each.weather[0].main,
      }));

      updateWeatherData(newData);
      console.log(newData);
    };

    getWeatherData();
  }, []);

  return (
    <div className="main-container">
      <h1>Weather Dashboard</h1>
      <div className="input-box-container">
        <input type="search" onChange={onEnterSearchVal} value={searchVal} />
      </div>
      {weatherData !== "" && (
        <>
          <div className="temperature-container">
            <h1> Temperature </h1>
            <p> {weatherData[0].temperature} </p>
          </div>
          <div className="temperature-container">
            <h1> Humdity </h1>
            <p> {weatherData[0].humidity} </p>
          </div>
          <div className="temperature-container">
            <h1> Wind </h1>
            <p> {weatherData[0].wind} </p>
          </div>
          <div className="temperature-container">
            <h1> Weather </h1>
            <p> {weatherData[0].weather} </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
