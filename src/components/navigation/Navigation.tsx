import { Routes, Route } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LanguageIcon from '@mui/icons-material/Language';
import StorageIcon from '@mui/icons-material/Storage';
import AlbumIcon from '@mui/icons-material/Album';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import Home from '../../pages/Home';
import Background from '../../pages/Background';
import Categories from '../../pages/Categories';
import Search from '../../pages/Search';
import Chat from '../../pages/Chat';
import Music from '../../pages/Music';
import NotFound from '../../pages/NotFound';
import Poetry from '../../pages/Poetry';
import Map from '../../pages/Map';
import Database from '../../pages/Database';
import Albums from '../../pages/Albums';
import Todo from '../../pages/Todo';

interface Preview {
  title: string,
  description: string,
  path: string,
  image?: string
}

const iconFontSize = "medium";
const iconColor = "disabled";

export const navItems = [
  { path: '/', label: 'Home', icon: <HomeIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/background', label: 'Background', icon: <ImageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/database', label: 'Database', icon: <StorageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/categories', label: 'Categories', icon: <FolderOpenIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/search', label: 'Search', icon: <SearchIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/chat', label: 'RAG Chat', icon: <MessageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/music', label: 'Music', icon: <MusicNoteIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/poetry', label: 'Poetry', icon: <EditNoteIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/map', label: 'Map', icon: <LanguageIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/albums', label: 'Albums', icon: <AlbumIcon fontSize={iconFontSize} color={iconColor} /> },
  { path: '/todo', label: 'Todo', icon: <PlaylistAddCheckIcon fontSize={iconFontSize} color={iconColor} /> },
];

export const previews: Preview[] = [
  {
    title: "Background Image",
    description: "Change the site's background image and opacity.",
    path: "/background"
  },
  {
    title: "About the Database",
    description: "Information about the database and models for semantic search and RAG.",
    path: "/database",
  },
  {
    title: "Browse Categories",
    description: "View articles in the database organized by category.",
    path: "/categories"
  },
  {
    title: "Semantic Search",
    description: "Search for articles in the database by semantic similarity.",
    path: "/search"
  },
  {
    title: "RAG Chat",
    description: "Talk to a chatbot about articles in the database.",
    path: "/chat"
  },
  {
    title: "Music",
    description: "Listen to some of the music I have made.",
    path: "/music"
  },
  {
    title: "Poetry",
    description: "Read some of the poetry I have written.",
    path: "/poetry"
  },
  {
    title: "Cesium Map",
    description: "Play around with a 2D/3D map using Cesium.",
    path: "/map"
  },
  {
    title: "Favourite Albums",
    description: "See some of my favourite albums.",
    path: "/albums"
  },
  {
    title: "Website To-do List",
    description: "Things I plan to add to the website.",
    path: "/todo"
  }
];

interface NavigationProps {
  setSelectedBackground: (filename: string) => void;
  backgroundOpacity: number;
  setBackgroundOpacity: (opacity: number) => void;
}

export const NavigationRoutes = ({
  setSelectedBackground,
  backgroundOpacity,
  setBackgroundOpacity
}: NavigationProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/background" element={
        <Background
          setSelectedBackground={setSelectedBackground}
          backgroundOpacity={backgroundOpacity}
          setBackgroundOpacity={setBackgroundOpacity}
        />}
      />
      <Route path="/database" element={<Database />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/search" element={<Search />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/music" element={<Music />} />
      <Route path="/poetry" element={<Poetry />} />
      <Route path="/map" element={<Map />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}