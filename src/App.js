// src/App.js
import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import CongratulationsScreen from './components/CongratulationsScreen';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver', 'congrats'
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      {gameState === 'start' && <StartScreen setDifficulty={setDifficulty} setGameState={setGameState} />}
      {gameState === 'playing' && <GameScreen difficulty={difficulty} setGameState={setGameState} />}
      {gameState === 'gameOver' && <GameOverScreen setGameState={setGameState} />}
      {gameState === 'congrats' && <CongratulationsScreen setGameState={setGameState} />}
    </div>
  );
}

export default App;
