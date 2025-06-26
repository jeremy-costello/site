import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";

import { loadDB, initDB } from "./services/db";
import Layout from "./components/layout/Layout";
import { NavigationRoutes } from "./components/navigation/Navigation";


const DATABASE_URL = "./bbc_articles.db";

export async function fetchDbFileFromPublic(): Promise<File> {
  const res = await fetch(DATABASE_URL);
  const blob = await res.blob();
  return new File([blob], DATABASE_URL, { type: "application/gzip" });
}

function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("colorMode") as "light" | "dark") || "dark";
  });

  const [databaseLoaded, setDatabaseLoaded] = useState<boolean>(false);

  const [selectedBackground, setSelectedBackground] = useState<string>(() => {
    return (localStorage.getItem("backgroundImage") as string) || "bg1.jpg";
  });
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(() => {
    const storedValue = localStorage.getItem("backgroundOpacity");
    const parsed = parseFloat(storedValue || "");
    return isNaN(parsed) ? 0.5 : parsed;
  });

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("colorMode", next);
      return next;
    });
  };

  useEffect(() => {
    (async () => {
      const file: File = await fetchDbFileFromPublic();
      await loadDB({ mode: "file", file });
      await initDB();
      setDatabaseLoaded(true);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout
          toggleTheme={toggleTheme}
          backgroundImage={selectedBackground}
          backgroundOpacity={backgroundOpacity}
        >
          <NavigationRoutes
            databaseLoaded={databaseLoaded}
            setSelectedBackground={setSelectedBackground}
            backgroundOpacity={backgroundOpacity}
            setBackgroundOpacity={setBackgroundOpacity}
          />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
