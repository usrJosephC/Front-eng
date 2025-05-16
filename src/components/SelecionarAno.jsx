import React, { useState } from 'react';

const SelecionarAno = () => {
  const [selectedYear, setSelectedYear] = useState('');

  const years = Array.from({ length: 2024 - 1946 + 1 }, (_, i) => 1946 + i);

  return (
    <div className="p-6 shadow-md rounded-2xl bg-white/70 backdrop-blur-sm">
      <label htmlFor="year" className="block mb-3 text-lg font-semibold text-[#7B1E7A]">
        Selecione o ano do seu nascimento:
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07020D] text-gray-800"
      >
        <option value="">-- Escolha um ano --</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {selectedYear && (
        <p className="mt-4 text-[#7B1E7A] text-base">
          Ano selecionado: <span className="font-medium">{selectedYear}</span>
        </p>
      )}
    </div>
  );
};

export default SelecionarAno;
