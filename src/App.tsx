import { Suspense } from "react";
import "./App.css";
import { AsideCard } from "./components/AsideCard";
import { MainContent } from "./components/MainContent";
import { WeatherContextProvider } from "./context/WeatherContextProvider";
import { Loader } from "./components/Loader";

function App() {
  return (
    <WeatherContextProvider>
      <Suspense fallback={<Loader />}>
        <AsideCard />
        <MainContent />
      </Suspense>
    </WeatherContextProvider>
  );
}

export default App;
