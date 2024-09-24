import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffleArray } from '../utils'; // utility function for shuffling
import styled from 'styled-components';

const GameContainer = styled.div`
  max-height: 100vh; 
  overflow: auto; 
  color: #f7fafc; 
  border-radius: 0.5rem; 
  padding: 1rem; 

  @media (min-width: 1024px) {
    max-height: calc(100vh - 12rem);
  }

  @media (min-width: 768px) {
    max-height: calc(100vh - 4rem);
  }

  @media (min-width: 600px) {
    max-height: calc(100vh - 4rem);
  }
`;

export default function GameScreen({ difficulty, setGameState }) {
  const [letters, setLetters] = useState([]);
  const [input, setInput] = useState('');
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60); // Increased time to 60 seconds
  const [backgroundImage, setBackgroundImage] = useState('');
  const [userWords, setUserWords] = useState([]);
  const [validWords, setValidWords] = useState([]);
  const [wordsNeeded, setWordsNeeded] = useState(4); // Default to 4 words needed per level
  const [error, setError] = useState('');
  const [levelWords, setLevelWords] = useState([]); // Track words used in the current level

  const API_KEY = 'hi1tq0w1n2ru9eop69u327syy2im0utqudqb39myfwj3p301r'; // Add your Wordnik API key here

  // Fetch a new word and background image
  const fetchWord = async () => {
    const length = 10 + level; // Increase word length with each level
    try {
      const response = await axios.get(`https://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}&minLength=${length}&maxLength=${length}`);
      let newWord = response.data.word;
      
      // Ensure we have exactly 12 letters
      let lettersArray = newWord.split('');
      if (lettersArray.length < 12) {
        // If fewer than 12 letters, add random letters
        const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        while (lettersArray.length < 12) {
          lettersArray.push(extraLetters[Math.floor(Math.random() * extraLetters.length)]);
        }
      }
      setLetters(shuffleArray(lettersArray));
    } catch (error) {
      console.error('Error fetching word:', error.response ? error.response.data : error.message);
      setError('Error fetching word, please try again.');
    }
  };

  const fetchBackgroundImage = async () => {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=45358207-e8eabf8862064522c09828133&q=dark&image_type=photo&orientation=horizontal`);
      if (response.data && response.data.hits && response.data.hits.length > 0) {
        const image = response.data.hits[Math.floor(Math.random() * response.data.hits.length)];
        setBackgroundImage(image.largeImageURL);
      } else {
        console.error('No images found');
      }
    } catch (error) {
      console.error('Error fetching background image:', error.response ? error.response.data : error.message);
    }
  };

  const isWordValid = (inputWord) => {
    if (inputWord.length < 3) return false; // Minimum 3 letters required
    let letterArray = letters.slice(); // Create a copy of letters
    for (let char of inputWord) {
      const index = letterArray.indexOf(char);
      if (index === -1) return false;
      letterArray.splice(index, 1); // Remove the used character
    }
    return true;
  };

  const checkWordCorrectness = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.status === 200; // Word exists in the dictionary
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchWord();
    fetchBackgroundImage();
    setTimeLeft(60); // Reset time left to 60 seconds

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameState('gameOver');
        }
        return prevTime - 1;
      });
    }, 1000);

    // Update the words needed based on the level
    setWordsNeeded(3 + level); // Increase words needed with each level

    return () => clearInterval(timer);
  }, [level]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (levelWords.includes(input)) {
      setError('You already added this word in the current level!');
      setInput(''); // Clear input on error
      return;
    }

    // Validate input word
    if (isWordValid(input) && input.length >= 3) {
      const isCorrect = await checkWordCorrectness(input);
      if (isCorrect) {
        setUserWords((prevWords) => [...prevWords, input]);
        setValidWords((prevWords) => [...prevWords, input]);
        setLevelWords((prevWords) => [...prevWords, input]); 
        setInput('');

        if (userWords.length + 1 >= wordsNeeded) {
          setLevel((prevLevel) => {
            if (prevLevel === 5) {
              setGameState('congrats');
            } else {
              fetchWord();
              setUserWords([]);
              setLevelWords([]); // Reset levelWords for new level
              setTimeLeft(60); // Reset time to 60 seconds
              return prevLevel + 1;
            }
            return prevLevel;
          });
        }
      } else {
        setError('Word is not in the dictionary!');
        setInput(''); // Clear input on error
      }
    } else {
      setError('Invalid word, try again!');
      setInput(''); // Clear input on error
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleLetterClick = (letter) => {
    setInput((prevInput) => prevInput + letter);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); // Error message disappears after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-900 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >

      <GameContainer>
        <div className="relative p-4 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl h-full max-h-[calc(100vh-2rem)] bg-gray-800 bg-opacity-70 rounded-lg shadow-lg overflow-auto">
          {/* Error Notification */}
          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded shadow-lg z-20">
              {error}
            </div>
          )}

          {/* Header with Circular Indicator and Level/Timing */}
          <div className="flex items-center justify-between mb-4">
            {/* Circular Indicator */}
            <div className="flex items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-900 border-4 border-blue-700 rounded-full text-xl md:text-2xl text-blue-300 mr-2 md:mr-4">
                <div>{userWords.length}/{wordsNeeded}</div>
              </div>
            </div>
            
            {/* Level and Timer */}
            <div className="text-center text-xs md:text-sm lg:text-base font-semibold">
              <div>Level: {level}</div>
              <div>Time Left: {timeLeft}s</div>
            </div>
          </div>

          {/* Game Area */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Words Found */}
            <div className="bg-gray-900 p-3 md:p-4 rounded-lg">
              <h4 className="text-xs md:text-sm lg:text-base font-semibold mb-2">Words Found:</h4>
              <ul className="list-disc pl-4 text-sm md:text-base">
                {userWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
            
            {/* Scrambled Letters */}
            <div className="bg-gray-900 p-3 md:p-4 rounded-lg">
              <h4 className="text-xs md:text-sm lg:text-base font-semibold mb-2">Scrambled Letters:</h4>
              <div className="flex flex-wrap gap-2">
                {letters.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterClick(letter)}
                    className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Input Area */}
          <div className="bg-gray-900 p-3 md:p-4 rounded-lg mt-4">
            <h4 className="text-xs md:text-sm lg:text-base font-semibold mb-2">Your Word:</h4>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
              placeholder="Type your word here..."
            />
            <button
              onClick={handleSubmit}
              className="mt-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-1 px-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </GameContainer>
    </div>
  );
}
