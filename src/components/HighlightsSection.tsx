import { useWeather } from "../hooks/useWeather";
import { HighlightCard } from "./HighlightCard";

export const HighlightsSection = () => {
  const { weatherInfo } = useWeather();

  return (
    <section className="highlights-section">
      <h4 className="highlights-section--heading">Today's highlights</h4>
      <section className="cards-grid">
        <HighlightCard
          cardTitle="Wind Status"
          content={`${weatherInfo?.current.wind_kph} kph`}
        />
        <HighlightCard
          cardTitle="Humidity"
          content={`${weatherInfo?.current.humidity}%`}
        >
          <progress max={100} value={weatherInfo?.current.humidity}></progress>
        </HighlightCard>
        <HighlightCard
          cardTitle="Visibility"
          content={`${weatherInfo?.current.vis_km} kms`}
        />
        <HighlightCard
          cardTitle="Air Pressure"
          content={`${weatherInfo?.current.pressure_mb} mb`}
        />
      </section>
    </section>
  );
};
