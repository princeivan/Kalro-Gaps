import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [gaps, setGaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGaps();
  }, []);

  async function getGaps() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://d00239f5-1d6c-492d-921f-35a093f68f45-dev.e1-us-cdp-2.choreoapis.dev/kalrgaps/server/v1.0/api/"
      );
      const data = await response.json();

      setGaps(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GlobalContext.Provider value={{ gaps, setGaps, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}
