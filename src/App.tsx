import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';

import { loadDB, initDB } from './services/db';
import Layout from './components/layout/Layout';
import Background from './pages/Background';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Search from './pages/Search';
import Chat from './pages/Chat';
import Music from './pages/Music';
import NotFound from './pages/NotFound';

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

  const [selectedBackground, setSelectedBackground] = useState<string>('bg6.jpg');
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.5);

  const theme = useMemo(() => getTheme(mode), [mode]);

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
        {/* Background chooser — affects Layout via selectedBackground */}
        <Layout
          toggleTheme={toggleTheme}
          backgroundImage={selectedBackground}
          backgroundOpacity={backgroundOpacity}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/background" element={
              <Background
                onSelect={setSelectedBackground}
                onOpacityChange={setBackgroundOpacity}
              />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/music" element={<Music />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
