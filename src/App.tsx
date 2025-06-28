// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";

import Layout from "./components/layout/Layout";
import { NavigationRoutes } from "./components/navigation/Navigation";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("colorMode") as "light" | "dark") || "dark";
  });

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
