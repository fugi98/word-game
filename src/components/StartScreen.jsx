// src/components/StartScreen.jsx
import React from 'react';

export default function StartScreen({ setDifficulty, setGameState }) {
  const handleStartGame = (difficulty) => {
    setDifficulty(difficulty);
    setGameState('playing');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">VerbalVoyage</h1>
      <div className="mb-6">
        <button
          onClick={() => handleStartGame('easy')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Easy
        </button>
        <button
          onClick={() => handleStartGame('medium')}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Medium
        </button>
        <button
          onClick={() => handleStartGame('hard')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Hard
        </button>
      </div>
    </div>
  );
};


