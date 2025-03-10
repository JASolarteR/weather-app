import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useWeather } from "./useWeather";

export const useAsideCard = () => {
  const { getWeather } = useWeather();
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
    try {
      setIsSearchLoading(true);
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

  const handleCityChange = (lat: number, lon: number) => {
    getWeather(lat, lon);
    setIsOpen(false);
    setQuery("");
  };

  return {
    isOpen,
    toggleState,
    handleQueryChange,
    query,
    inputRef,
    isSearchLoading,
    citiesSearch,
    todaysDateFormatted,
    handleCityChange,
  };
};
