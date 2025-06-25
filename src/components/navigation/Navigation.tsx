import { Routes, Route } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';

import Home from '../../pages/Home';
import Background from '../../pages/Background';
import Categories from '../../pages/Categories';
import Search from '../../pages/Search';
import Chat from '../../pages/Chat';
import Music from '../../pages/Music';
import NotFound from '../../pages/NotFound';

const iconFontSize = "medium";
const iconColor = "disabled";

export const navItems = [
  { path: '/', label: 'Home', icon: <HomeIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/background', label: 'Background', icon: <ImageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/categories', label: 'Categories', icon: <FolderOpenIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/search', label: 'Search', icon: <SearchIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/chat', label: 'RAG Chat', icon: <MessageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/music', label: 'Music', icon: <MusicNoteIcon fontSize={iconFontSize} color={iconColor} /> },
];

interface NavigationProps {
  setSelectedBackground: (filename: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
}

export const NavigationRoutes = ({ setSelectedBackground, setBackgroundOpacity }: NavigationProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/background" element={
        <Background
          setSelectedBackground={setSelectedBackground}
          setBackgroundOpacity={setBackgroundOpacity}
        />}
      />
      <Route path="/categories" element={<Categories />} />
      <Route path="/search" element={<Search />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/music" element={<Music />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}