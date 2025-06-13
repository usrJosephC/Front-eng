import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Callback from '../pages/Callback';
import SelecionarAno from '../pages/SelecionarAno';
import ExibirMusica from '../pages/ExibirMusica';
import CriarPlaylist from '../pages/CriarPlaylist';
import ConfirmarPlaylist from '../pages/ConfirmarPlaylist';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/selecionar" element={<SelecionarAno />} />
        <Route path="/exibir" element={<ExibirMusica />} />
        <Route path="/criar" element={<CriarPlaylist />} />
        <Route path="/confirmar" element={<ConfirmarPlaylist />} />
      </Routes>
    </Router>
  );
}