
function App() {
  return (
    <div className="min-h-screen bg-backgroundPurple text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute top-6 right-6">
        <button className="bg-spotifyYellow text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90">
          HOME <span className="text-lg">🏠</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 mt-10">
        <div className="text-6xl">🎧</div>
        <h1 className="text-white text-5xl font-extrabold leading-tight tracking-wide">
          <div>DIVE BACK</div>
          <div className="mt-2">IN TIME</div>
        </h1>
        <p className="mt-2 text-lg max-w-md leading-relaxed">
          Mergulhe de volta no tempo <br />
          e redescubra os hits de maior sucesso <br />
          desde o seu nascimento
        </p>
        <button className="mt-6 bg-spotifyYellow text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90">
          ENTRE COM SPOTIFY <span className="text-xl">🎵</span>
        </button>
        <p className="mt-6 text-sm text-white/90 max-w-sm">
          Se conecte com sua conta Premium do Spotify para criar a sua viagem no tempo
        </p>
      </div>
    </div>
  );
}

export default App;
