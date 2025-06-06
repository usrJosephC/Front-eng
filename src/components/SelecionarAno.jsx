 import React, { useState } from 'react';

const SelecionarAno = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarAno = async () => {
    if (!selectedYear) {
      setMensagem('Por favor, digite um ano.');
      return;
    }

    try {
      const response = await fetch('/year', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year: selectedYear }),
      });

      if (response.ok) {
        setMensagem('Ano enviado com sucesso!');
      } else {
        setMensagem('Erro ao enviar o ano.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-2xl shadow-md bg-white/80 backdrop-blur-sm text-center max-w-xl w-full">
        <h2 className="text-5xl font-bold text-[#07020D] mb-6">
          Quando você nasceu?
        </h2>

        <p className="mb-6 text-lg text-[#7B1E7A] font-semibold">
          Digite o ano do seu nascimento para começar a sua jornada musical através do tempo:
        </p>

        <div className="p-4 rounded-bl-full mb-6">
          <input
            type="number"
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-1/4 px-4 py-2 mb-4 border border-gray-300 rounded-b-none focus:outline-none focus:ring-2 focus:ring-[#FFD400] text-gray-800"
            placeholder="Ex: 1994"
            min="1946"
            max="2024"
          />

          <button
            onClick={enviarAno}
            className="w-1/4 py-2 bg-[#FFD400] text-white font-bold rounded-lg hover:bg-[#5a1459] transition"
          >
            Confirmar
          </button>
        </div>

        <h3 className="text[40px] font-bold text-[#07020D] mb-2">
          Anos disponíveis: 1946–2024
        </h3>

        {mensagem && <p className="mt-2 text-sm text-gray-600">{mensagem}</p>}
      </div>
    </div>
  );
};

export default SelecionarAno;
