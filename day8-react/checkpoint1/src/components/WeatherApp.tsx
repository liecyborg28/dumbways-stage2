/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { fetchWeather } from "../api/weather";

export function WeatherApp() {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState<{
    city: String;
    temperature: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const debounceCity = useDebounce(city, 500);

  useEffect(() => {
    if (debounceCity) {
      setLoading(true);
      fetchWeather(debounceCity)
        .then((data) => setWeatherData(data))
        .finally(() => setLoading(false));
    } else {
      setWeatherData(null);
      setLoading(false);
    }
  }, [debounceCity]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1>Weather App</h1>
      <input
        className="border-2 mt-5"
        type="text"
        name="city"
        id="city"
        value={city}
        placeholder="Enter city..."
        onChange={handleOnChange}
      />
      {loading && (
        <>
          <p>Loading ...</p>
        </>
      )}

      {weatherData && !loading && (
        <>
          <br />
          <h2>City: {weatherData.city}</h2>
          <h2>Temperature: {weatherData.temperature}"C</h2>
        </>
      )}

      {weatherData === null && !loading && (
        <>
          <br />
          <h2>City Not Found</h2>
        </>
      )}
    </div>
  );
}
