import { ReactNode, useEffect, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { WeatherApiResponse } from "../ApiType";

type WeatherContextProviderProps = {
  children: ReactNode;
};

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const [geoLocation, setGeoLocation] = useState<GeolocationPosition | null>(
    null
  );
  const currentLatitude = geoLocation?.coords.latitude;
  const currentLongitude = geoLocation?.coords.longitude;

  const [weatherInfo, setWeatherInfo] = useState<WeatherApiResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}key=${
          import.meta.env.VITE_API_KEY
        }&q=${latitude},${longitude}&aqi=no&days=7`
      );
      if (!res.ok) {
        throw new Error("Something went wrong, try again!");
      }
      const data: WeatherApiResponse | null = await res.json();
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
    <WeatherContext.Provider
      value={{
        isLoading,
        currentLatitude,
        currentLongitude,
        weatherInfo,
        isCelsius,
        changeTemperature,
        getWeather,
        forecastNextFiveDays,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
