import { ForecastDay } from "../ApiType";

type ForecastSectionProps = {
  forecastNextFiveDays: ForecastDay[] | undefined;
  isCelsius: boolean;
};

export const ForecastSection = ({
  forecastNextFiveDays,
  isCelsius,
}: ForecastSectionProps) => {
  return (
    <section className="forecast-section">
      {forecastNextFiveDays?.map((foreday, index) => {
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

        return (
          <article key={date} className="forecast-section--card">
            <h5 className="forecast-section--card--heading">
              {index === 0 ? "Tomorrow" : formattedDate}
            </h5>
            <img
              src={icon}
              alt={`Icon for ${text} weather`}
              width={36}
              height={36}
            />
            <p
              style={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                color: "rgba(245, 245, 245, 0.811)",
              }}
            >
              <span>
                {Math.trunc(minTemp)}
                {isCelsius ? "°C" : "°F"}
              </span>{" "}
              <span>
                {Math.trunc(maxTemp)}
                {isCelsius ? "°C" : "°F"}
              </span>
            </p>
          </article>
        );
      })}
    </section>
  );
};
