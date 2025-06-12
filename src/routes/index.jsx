import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ConfirmarPlaylist from '../pages/ConfirmarPlaylist';
import SelecionarAno from '../pages/SelecionarAno';
import CriarPlaylist from '../pages/CriarPlaylist';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmar" element={<ConfirmarPlaylist />} />
        <Route path="/selecionar" element={<SelecionarAno />} />
        <Route path="/criar" element={<CriarPlaylist />} />
      </Routes>
    </Router>
  );
}
