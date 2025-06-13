import { useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import discoIcon from '../assets/disco.svg';
import sendIcon from '../assets/send.svg';
import restartIcon from '../assets/restart.svg';

function ConfirmarPlaylist() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-backgroundPurple text-white flex flex-col items-center px-4 pt-10 font-body">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate('/')}
          className="bg-spotifyYellow text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90"
        >
          HOME <img src={homeIcon} alt="Home" className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 mt-10 text-center">
        <img src={discoIcon} alt="Disco" className="h-16 w-16" />
        <h1 className="text-white text-5xl font-title font-bold">Confirme sua Playlist</h1>
        <p className="text-lg max-w-md">
          Revise as músicas selecionadas antes de criar <br />
          sua playlist "Dive Back in Time"
        </p>

        <div className="bg-spotifyYellow text-black p-6 rounded-3xl shadow-md w-full max-w-md text-left mt-4">
          <h2 className="text-xl font-extrabold">Sua playlist Nostálgica</h2>
          <span className="text-sm ml-2">2 músicas</span>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center bg-yellow-300 rounded-full px-4 py-2">
              <div className="flex items-center gap-3">
                <img src={discoIcon} alt="Disco" className="h-6 w-6" />
                <div>
                  <p className="text-sm font-medium">Nothing Compares 2 U</p>
                  <p className="text-xs text-black/80">Sinéad O'Connor</p>
                </div>
              </div>
              <span className="text-sm bg-yellow-500 rounded-full px-2 py-1">1990</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-300 rounded-full px-4 py-2">
              <div className="flex items-center gap-3">
                <img src={discoIcon} alt="Disco" className="h-6 w-6" />
                <div>
                  <p className="text-sm font-medium">Smells Like Teen Spirit</p>
                  <p className="text-xs text-black/80">Nirvana</p>
                </div>
              </div>
              <span className="text-sm bg-yellow-500 rounded-full px-2 py-1">1991</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-spotifyYellow text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90">
            Criar playlist no Spotify <img src={sendIcon} alt="Send" className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-800 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90"
          >
            Começar novamente <img src={restartIcon} alt="Restart" className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-6 text-sm text-white/90 max-w-sm">
          Isso criará uma nova lista de reprodução na sua conta do Spotify conectada
        </p>
      </div>
    </div>
  );
}

export default ConfirmarPlaylist;
