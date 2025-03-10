import { motion } from "motion/react";

type ForecastCardProps = {
  index: number;
  formattedDate: string;
  icon: string;
  text: string;
  minTemp: number;
  isCelsius: boolean;
  maxTemp: number;
};

export const ForecastCard = ({
  index,
  formattedDate,
  icon,
  text,
  minTemp,
  isCelsius,
  maxTemp,
}: ForecastCardProps) => {
  return (
    <motion.article
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
      className="forecast-section--card"
    >
      <h5 className="forecast-section--card--heading">
        {index === 0 ? "Tomorrow" : formattedDate}
      </h5>
      <img src={icon} alt={`Icon for ${text} weather`} width={36} height={36} />
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
    </motion.article>
  );
};
