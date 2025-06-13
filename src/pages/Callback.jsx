// src/pages/Callback.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('https://backend-divebackintime.onrender.com/token');
        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          navigate('/selecionar');
        } else {
          setError('Token não encontrado no servidor.');
        }
      } catch (err) {
        console.error('Erro ao obter token:', err);
        setError('Erro ao conectar com o servidor.');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundPurple text-white font-body">
      {error ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Ocorreu um erro:</p>
          <p className="text-sm mt-2 text-red-400">{error}</p>
        </div>
      ) : (
        <p className="text-xl animate-pulse">Carregando autenticação com o Spotify...</p>
      )}
    </div>
  );
}

export default Callback;
