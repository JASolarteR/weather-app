import { useEffect, useState } from "react";
import "./App.css";
import { WeatherApiResponse } from "./ApiType";
import { AsideCard } from "./components/AsideCard";
import { ForecastSection } from "./components/ForecastSection";
import { HighlightsSection } from "./components/HighlightsSection";

function App() {
  const [geoLocation, setGeoLocation] = useState<GeolocationPosition | null>(null);
  const currentLatitude = geoLocation?.coords.latitude;
  const currentLongitude = geoLocation?.coords.longitude;

  const [weatherInfo, setWeatherInfo] = useState<WeatherApiResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [temperature, setTemperature] = useState<"Celsius" | "fahrenheit">(
    "Celsius"
  );

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoLocation(position);
      });
    } else {
      alert("Geolocation is not supported in this browser");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getWeather = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}key=${
          import.meta.env.VITE_API_KEY
        }&q=${latitude},${longitude}&aqi=no&days=7`
      );
      if (!res.ok) {
        throw new Error("Something went wrong, try again!");
      }
      const data = await res.json();
      setWeatherInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (geoLocation) {
      getWeather(currentLatitude!, currentLongitude!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoLocation]);

  const changeTemperature = (temp: "Celsius" | "fahrenheit") => {
    setTemperature(temp);
  };

  const isCelsius = temperature === "Celsius";

  const forecastNextFiveDays = weatherInfo?.forecast.forecastday.slice(2);

  return (
    <>
      <AsideCard
        isLoading={isLoading}
        currentLatitude={currentLatitude}
        currentLongitude={currentLongitude}
        getWeather={getWeather}
        weatherInfo={weatherInfo}
        isCelsius={isCelsius}
      />

      <div className="main-content">
        <header className="main-content-header">
          <button
            className={`sidecard-header-button ${
              !isCelsius ? "inactive" : ""
            } icon`}
            onClick={() => {
              changeTemperature("Celsius");
            }}
          >
            °C
          </button>
          <button
            className={`sidecard-header-button ${
              isCelsius ? "inactive" : ""
            } icon`}
            onClick={() => {
              changeTemperature("fahrenheit");
            }}
          >
            °F
          </button>
        </header>
        {isLoading ? (
          <p
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {" "}
            Loading weather...
          </p>
        ) : (
          <>
            <ForecastSection
              forecastNextFiveDays={forecastNextFiveDays}
              isCelsius={isCelsius}
            />
            <HighlightsSection weatherInfo={weatherInfo} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
