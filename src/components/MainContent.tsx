import { motion } from "motion/react";
import { ForecastSection } from "./ForecastSection";
import { HighlightsSection } from "./HighlightsSection";
import { useWeather } from "../hooks/useWeather";
import { Loader } from "./Loader";
import { Button } from "./Button";

export const MainContent = () => {
  const { isCelsius, changeTemperature, isLoading } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="main-content"
    >
      {!isLoading ? (
        <>
          <header className="main-content-header">
            <Button
              customClass={`sidecard-header-button ${
                !isCelsius ? "inactive" : ""
              } icon`}
              onClick={() => {
                changeTemperature("Celsius");
              }}
            >
              °C
            </Button>
            <Button
              customClass={`sidecard-header-button ${
                isCelsius ? "inactive" : ""
              } icon`}
              onClick={() => {
                changeTemperature("fahrenheit");
              }}
            >
              °F
            </Button>
          </header>
          <ForecastSection />
          <HighlightsSection />
        </>
      ) : (
        <Loader />
      )}
    </motion.div>
  );
};
