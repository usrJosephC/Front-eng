import { useState, useEffect } from "react"; // Adicionado useEffect para buscar músicas reais
import { useNavigate } from "react-router-dom";
import homeIcon from '../assets/home.svg';
import headphones from '../assets/headphones.svg';
import sendIcon from '../assets/send.svg';

const CriarPlaylist = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]); // Agora as músicas virão do backend
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongsForPlaylist = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/'); // Redireciona se não houver token
        return;
      }

      setLoading(true);
      try {
        // Você precisará de uma rota no backend que retorne as músicas para seleção da playlist
        // A rota `/playlist-selection-songs` é um exemplo. Ajuste conforme seu backend.
        const res = await fetch('https://backend-divebackintime.onrender.com/playlist-selection-songs', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar músicas para playlist');
        }
        const data = await res.json();
        // Supondo que 'data' é um array de objetos de música com id, title, artist, year
        setSongs(data);
        // Inicialmente, todas as músicas podem ser selecionadas ou nenhuma, dependendo da sua regra.
        // Aqui, selecionamos todas por padrão para replicar o comportamento original.
        setSelectedSongs(data.map(song => song.id)); 
      } catch (err) {
        console.error("Erro ao buscar músicas para a playlist:", err);
        setError("Não foi possível carregar as músicas para seleção. Tente novamente.");
        setSongs([]); // Limpa as músicas em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchSongsForPlaylist();
  }, [navigate]);

  const toggleSong = (songId) => {
    setSelectedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const selectAll = () => {
    setSelectedSongs(songs.map(song => song.id));
  };

  const handleCreatePlaylist = () => {
    // Armazena APENAS os IDs das músicas selecionadas
    localStorage.setItem("selectedSongIds", JSON.stringify(selectedSongs)); 
    navigate("/confirmar");
  };

  return (
    <div className="min-h-screen bg-backgroundPurple text-white flex flex-col items-center justify-center px-4 text-center font-body">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate('/')}
          className="bg-spotifyYellow text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90"
        >
          HOME <img src={homeIcon} alt="Home" className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 mt-10">
        <img src={headphones} alt="Fones" className="h-16 w-16" />
        <h1 className="text-4xl font-extrabold font-title text-white">
          Escolha as suas favoritas
        </h1>
        <p className="text-base text-white">
          Selecione as músicas que você gostaria de adicionar à sua playlist nostálgica
        </p>
      </div>

      <div className="bg-transparent border mt-10 border-white rounded-md px-8 py-6 w-full max-w-xl">
        {loading ? (
          <p className="text-center text-yellow-300">Carregando músicas...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : songs.length === 0 ? (
          <p className="text-center text-gray-400">Nenhuma música disponível para seleção.</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium font-body">
                Músicas da sua Viagem ({selectedSongs.length} selecionada{selectedSongs.length !== 1 ? 's' : ''})
              </span>
              <button
                onClick={selectAll}
                className="text-white text-sm hover:underline font-title"
              >
                Selecionar todas
              </button>
            </div>

            <div className="space-y-4">
              {songs.map((song) => (
                <div
                  key={song.id} // Use um ID único da música para a key
                  className="flex justify-between items-center px-4 py-2 rounded-md border border-white text-left transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => toggleSong(song.id)}
                      className="form-checkbox h-5 w-5 text-black bg-transparent border-white rounded"
                    />
                    <div>
                      <p className="font-semibold text-white">{song.title}</p>
                      <p className="text-sm text-white/80">{song.artist}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold font-body text-[#000] bg-[#FFD400] px-3 py-1 rounded-full">
                    {song.year}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleCreatePlaylist} // Usa a função que salva e navega
        disabled={selectedSongs.length === 0 || loading}
        className={`mt-8 flex items-center gap-2 bg-spotifyYellow text-black font-semibold px-6 py-3 rounded-full ${
          selectedSongs.length === 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <img src={sendIcon} alt="Enviar" className="w-5 h-5" />
        Criar minha playlist
      </button>
    </div>
  );
};

export default CriarPlaylist;