// src/pages/Callback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('https://backend-divebackintime.onrender.com/token');
        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          navigate('/selecionar');
        } else {
          console.error('Token não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter token:', error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <p className="text-white text-center mt-20">Carregando...</p>;
}

export default Callback;
