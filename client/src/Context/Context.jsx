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
      const response = await fetch("https://kalro-gaps.onrender.com/api/");
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
