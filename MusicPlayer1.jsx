import React, { useState, useRef } from "react";

const MusicPlayer = () => {
  const [bgColor, setBgColor] = useState("bg-gradient-to-br from-blue-500 to-purple-600");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioSrc, setAudioSrc] = useState("/audio/musica.mp3");

  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChangeColor = (e) => {
    setBgColor(e.target.value);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) { // Adicionada verificação de duration
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const percent = (current / duration) * 100;
        setProgress(percent);
    } else {
        setProgress(0); // Reseta se não houver duração
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      // Revoga o URL do objeto anterior se existir e for um blob
      if (audioSrc && audioSrc.startsWith("blob:")) {
        URL.revokeObjectURL(audioSrc);
      }
      setAudioSrc(objectUrl);
      setIsPlaying(false);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
      }
    }
  };

  // Efeito para limpar o object URL quando o componente é desmontado ou audioSrc muda
  React.useEffect(() => {
    const currentAudioSrc = audioSrc;
    return () => {
      if (currentAudioSrc && currentAudioSrc.startsWith("blob:")) {
        URL.revokeObjectURL(currentAudioSrc);
      }
    };
  }, [audioSrc]);


  return (
    <div className={`${bgColor} min-h-screen text-white flex flex-col`}>
      <header className="w-full py-4 shadow-md bg-black/30 backdrop-blur text-center text-xl font-bold">
        🎵 Meu Reprodutor de Música
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-center">Tocador Online</h2>

          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={() => { // Melhor usar onLoadedData para garantir que a duração está disponível
                if(audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
                    handleTimeUpdate();
                } else {
                    setProgress(0);
                }
            }}
            onEnded={() => {
                setIsPlaying(false);
                setProgress(0); // Opcional: resetar progresso ao final
            }}
          />

          <div className="w-full h-2 bg-white/30 rounded overflow-hidden mb-4">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex gap-4 justify-center mb-4">
            <button
              onClick={togglePlay}
              className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 transition"
              disabled={!audioSrc || (audioSrc === "/audio/musica.mp3" && !audioRef.current?.currentSrc)} // Desabilita se for placeholder e não carregado
            >
              {isPlaying ? "⏸ Pausar" : "▶️ Tocar"}
            </button>

            <select
              onChange={handleChangeColor}
              value={bgColor} // Adicionado value para o select ser controlado
              className="py-2 px-4 rounded shadow text-black"
            >
              <option value="bg-gradient-to-br from-blue-500 to-purple-600">Azul / Roxo</option>
              <option value="bg-gradient-to-br from-green-400 to-blue-500">Verde / Azul</option>
              <option value="bg-gradient-to-br from-red-500 to-yellow-400">Vermelho / Amarelo</option>
              <option value="bg-gradient-to-br from-gray-800 to-black">Escuro</option>
            </select>
          </div>

          <div className="text-center">
            <label className="block mb-2">
              🎧 Escolher arquivo de áudio:
              <input
                type="file"
                accept="audio/*"
                onChange={handleUpload}
                className="ml-2 text-black"
              />
            </label>
          </div>
        </div>
      </main>

      <footer className="w-full py-3 text-center text-sm bg-black/20">
        © {new Date().getFullYear()} • Desenvolvido com React + Tailwind
      </footer>
    </div>
  );
};

export default MusicPlayer;