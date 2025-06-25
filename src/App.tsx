import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';

import { loadDB, initDB } from './services/db';
import Layout from './components/layout/Layout';
import { NavigationRoutes } from './components/navigation/Navigation';


const DATABASE_URL = './bbc_articles.db';

export async function fetchDbFileFromPublic(): Promise<File> {
  const res = await fetch(DATABASE_URL);
  const blob = await res.blob();
  return new File([blob], DATABASE_URL, { type: 'application/gzip' });
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('colorMode') as 'light' | 'dark') || 'dark';
  });

  const [selectedBackground, setSelectedBackground] = useState<string>('bg1.jpg');
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.5);

  const theme = useMemo(() => getTheme(mode), [mode]);
  console.log(theme.palette);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('colorMode', next);
      return next;
    });
  };

  useEffect(() => {
    (async () => {
      const file: File = await fetchDbFileFromPublic();
      await loadDB({ mode: 'file', file });
      await initDB();
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
            setSelectedBackground={setSelectedBackground}
            setBackgroundOpacity={setBackgroundOpacity}
          />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
