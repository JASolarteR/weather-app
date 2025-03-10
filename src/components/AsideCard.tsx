import { motion } from "motion/react";
import { useAsideCard } from "../hooks/useAsideCard";
import { useWeather } from "../hooks/useWeather";
import { SidebarSearch } from "./SidebarSearch";
import { Button } from "./Button";

export const AsideCard = () => {
  const {
    isOpen,
    toggleState,
    handleQueryChange,
    query,
    inputRef,
    isSearchLoading,
    citiesSearch,
    todaysDateFormatted,
    handleCityChange,
  } = useAsideCard();

  const {
    isLoading,
    getWeather,
    weatherInfo,
    currentLatitude,
    currentLongitude,
    isCelsius,
  } = useWeather();

  return (
    <>
      {!isLoading ? (
        <motion.aside
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sidecard"
        >
          {isOpen && (
            <SidebarSearch
              toggleState={toggleState}
              handleQueryChange={handleQueryChange}
              query={query}
              inputRef={inputRef}
              isSearchLoading={isSearchLoading}
              citiesSearch={citiesSearch}
              getWeather={getWeather}
              handleCityChange={handleCityChange}
            />
          )}
          <header className="sidecard-header">
            <Button
              onClick={() => {
                toggleState();
              }}
              customClass="sidecard-header-button"
            >
              Search for places
            </Button>

            <Button
              onClick={() => {
                getWeather(currentLatitude!, currentLongitude!);
              }}
              customClass="sidecard-header-button icon"
            >
              <img
                src="/icons/target.svg"
                width={24}
                height={24}
                alt="Target icon to request current location weather"
              />
            </Button>
          </header>
          <motion.img
            whileHover={{ scale: 1.2, transition: { duration: 1 } }}
            className="sidecard--icon"
            src={weatherInfo?.current.condition.icon}
            alt={`Weather icon for ${weatherInfo?.current.condition.text}`}
          />
          <h2 className="sidecard--heading">
            {isCelsius
              ? weatherInfo?.current.temp_c
              : weatherInfo?.current.temp_f}
            <span>{isCelsius ? "°c" : "°f"}</span>
          </h2>
          <h3 className="sidecard--condition">
            {weatherInfo?.current.condition.text}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <p className="sidecard--date">Today - {todaysDateFormatted}</p>
            <h5
              className="sidecard--location"
              style={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              <img src="/icons/pin.svg" alt="Pin icon" width={14} height={14} />
              {weatherInfo?.location.name}, {weatherInfo?.location.country}
            </h5>
          </div>
        </motion.aside>
      ) : null}
    </>
  );
};
