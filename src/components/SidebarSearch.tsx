import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";

type SidebarSearchProps = {
  toggleState: () => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isSearchLoading: boolean;
  citiesSearch: never[];
  getWeather: (latitude: number, longitude: number) => Promise<void>;
  handleCityChange: (lat: number, lon: number) => void;
};

export const SidebarSearch = ({
  toggleState,
  handleQueryChange,
  query,
  inputRef,
  isSearchLoading,
  citiesSearch,
  handleCityChange,
}: SidebarSearchProps) => {
  return (
    <AnimatePresence>
      <motion.aside
        key="modal"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        exit={{ width: "0%" }}
        className="sidecard-search"
      >
        <header style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button
            onClick={toggleState}
            customClass="sidecard-search-close-button"
          >
            X
          </Button>
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
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={id}
                    className="sidecard-search-list-item"
                    onClick={() => {
                      handleCityChange(lat, lon);
                    }}
                  >
                    <h4>
                      {name}, {region}
                    </h4>
                    <p>{country}</p>
                  </motion.li>
                );
              })
            ) : (
              <p>No cities searched</p>
            )}
          </ul>
        )}
      </motion.aside>
    </AnimatePresence>
  );
};
