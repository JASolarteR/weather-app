import { useWeather } from "../hooks/useWeather";
import { ForecastCard } from "./ForecastCard";

type ForedayType = {
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    mintemp_f: number;
    maxtemp_f: number;
    condition: { icon: string; text: string };
  };
  date: string;
};

export const ForecastSection = () => {
  const { forecastNextFiveDays, isCelsius } = useWeather();

  const handleForecastMap = (foreday: ForedayType) => {
    const {
      day: {
        mintemp_c,
        maxtemp_c,
        mintemp_f,
        maxtemp_f,
        condition: { icon, text },
      },
      date,
    } = foreday;

    const forecastDay = new Date(date);

    const minTemp = isCelsius ? mintemp_c : mintemp_f;
    const maxTemp = isCelsius ? maxtemp_c : maxtemp_f;

    const formattedDate = new Intl.DateTimeFormat("en-CO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(forecastDay);

    return {
      icon,
      text,
      minTemp,
      maxTemp,
      formattedDate,
      date,
    };
  };

  return (
    <section className="forecast-section">
      {forecastNextFiveDays?.map((foreday, index) => {
        const { formattedDate, icon, text, minTemp, maxTemp, date } =
          handleForecastMap(foreday);
        return (
          <ForecastCard
            key={date}
            index={index}
            formattedDate={formattedDate}
            icon={icon}
            text={text}
            minTemp={minTemp}
            isCelsius={isCelsius}
            maxTemp={maxTemp}
          />
        );
      })}
    </section>
  );
};
