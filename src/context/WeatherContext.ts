import { createContext } from "react";
import { ForecastDay, WeatherApiResponse } from "../ApiType";

type WeatherContextType = {
    isLoading: boolean
    currentLatitude: number | undefined
    currentLongitude: number | undefined
    weatherInfo: WeatherApiResponse | null 
    isCelsius: boolean
    changeTemperature: (temp: "Celsius" | "fahrenheit") => void
    getWeather: (latitude: number, longitude: number) => Promise<void>
    forecastNextFiveDays: ForecastDay[] | undefined
};

export const WeatherContext = createContext<WeatherContextType | null>(null);
