// src/components/GameOverScreen.js
import React from 'react';

const GameOverScreen = ({ setGameState }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Game Over</h1>
      <button
        onClick={() => setGameState('start')}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default GameOverScreen;
