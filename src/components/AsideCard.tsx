import { ChangeEvent, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { WeatherApiResponse } from "../ApiType";
import { useDebounce } from "use-debounce";

type AsideCardProps = {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
  getWeather: (latitude: number, longitude: number) => Promise<void>;
  weatherInfo: WeatherApiResponse | null;
  isCelsius: boolean;
  isLoading: boolean;
};

export const AsideCard = ({
  currentLatitude,
  currentLongitude,
  getWeather,
  weatherInfo,
  isCelsius,
  isLoading,
}: AsideCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedSearchTerm] = useDebounce(query, 400);

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [citiesSearch, setCitiesSearch] = useState([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const todaysDate = new Date(Date.now());
  const todaysDateFormatted = new Intl.DateTimeFormat("en-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(todaysDate);

  const getCities = async () => {
    setIsSearchLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SEARCH_URL}key=${
          import.meta.env.VITE_API_KEY
        }&q=${debouncedSearchTerm}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong, try again!");
      }
      const data = await res.json();
      setCitiesSearch(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const toggleState = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target?.value);
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getCities();
    }
    setCitiesSearch([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return (
      <aside className="sidecard">
        <p
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {" "}
          Loading weather...
        </p>
      </aside>
    );
  }

  return (
    <aside className="sidecard">
      {isOpen && (
        <aside className="sidecard-search">
          <header
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <button
              onClick={toggleState}
              className="sidecard-search-close-button"
            >
              X
            </button>
            <input
              type="text"
              name="city"
              id="city-search"
              placeholder="Search a city..."
              onChange={handleQueryChange}
              value={query}
              className="sidecard-header-input"
              ref={inputRef}
            />
          </header>
          {isSearchLoading ? (
            <p
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              Loading cities...
            </p>
          ) : (
            <ul className="sidecard-search-list">
              {citiesSearch.length > 0 ? (
                citiesSearch.map((city) => {
                  const { id, name, country, lat, lon, region } = city;
                  return (
                    <li
                      key={id}
                      className="sidecard-search-list-item"
                      onClick={() => {
                        getWeather(lat, lon);
                        setQuery("");
                        setIsOpen(false);
                      }}
                    >
                      <h4>{name}, {region}</h4>
                      <p>{country}</p>
                    </li>
                  );
                })
              ) : (
                <p>No cities searched</p>
              )}
            </ul>
          )}
        </aside>
      )}
      <header className="sidecard-header">
        <button
          className="sidecard-header-button"
          onClick={() => {
            toggleState();
          }}
        >
          Search for places
        </button>

        <button
          className="sidecard-header-button icon"
          title="Current location weather"
          onClick={() => {
            getWeather(currentLatitude!, currentLongitude!);
          }}
        >
          <img
            src="/icons/target.svg"
            width={24}
            height={24}
            alt="Target icon to request current location weather"
          />
        </button>
      </header>
      <img
        className="sidecard--icon"
        src={weatherInfo?.current.condition.icon}
        alt={`Weather icon for ${weatherInfo?.current.condition.text}`}
      />
      <h2 className="sidecard--heading">
        {isCelsius ? weatherInfo?.current.temp_c : weatherInfo?.current.temp_f}
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
    </aside>
  );
};
