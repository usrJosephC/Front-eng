import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Callback from '../pages/Callback';
import Selecionar from '../pages/Selecionar';
import Criar from '../pages/CriarPlaylist'


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/selecionar" element={<Selecionar />} />
        <Route path="/criar" element={<Criar />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
