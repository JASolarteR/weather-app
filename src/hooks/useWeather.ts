import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export const useWeather = () => {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    throw new Error("Component should be wrapped in Weather Context Provider!");
  }

  return weatherContext
};
