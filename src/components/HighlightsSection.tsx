import { WeatherApiResponse } from "../ApiType";

type HighlightsSectionProps = {
  weatherInfo: WeatherApiResponse | null;
};

export const HighlightsSection = ({ weatherInfo }: HighlightsSectionProps) => {
  return (
    <section className="highlights-section">
      <h4 className="highlights-section--heading">Today's highlights</h4>
      <section className="cards-grid">
        <article className="info-card">
          <h5 className="info-card--heading">Wind Status</h5>
          <p className="info-card--content">
            {weatherInfo?.current.wind_kph} kph
          </p>
        </article>
        <article className="info-card">
          <h5 className="info-card--heading">Humidity</h5>
          <p className="info-card--content">{weatherInfo?.current.humidity}%</p>
          <progress max={100} value={weatherInfo?.current.humidity}></progress>
        </article>
        <article className="info-card">
          <h5 className="info-card--heading">Visibility</h5>
          <p className="info-card--content">
            {weatherInfo?.current.vis_km} kms
          </p>
        </article>
        <article className="info-card">
          <h5 className="info-card--heading">Air Pressure</h5>
          <p className="info-card--content">
            {weatherInfo?.current.pressure_mb} mb
          </p>
        </article>
      </section>
    </section>
  );
};
