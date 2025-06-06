import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ConfirmarPlaylist from '../pages/ConfirmarPlaylist';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmar" element={<ConfirmarPlaylist />} />
      </Routes>
    </Router>
  );
}
