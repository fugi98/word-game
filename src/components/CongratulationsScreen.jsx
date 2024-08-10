import React, { useEffect, useRef } from 'react';

const CongratulationsScreen = ({ setGameState }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const createRectangles = () => {
      const container = containerRef.current;
      const numRectangles = 100; // Increase number of rectangles for a denser effect

      for (let i = 0; i < numRectangles; i++) {
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle';

        // Randomize rectangle size, position, color, and animation delay
        const size = Math.random() * 10 + 5 + 'px'; // Smaller rectangles like paper bits
        const xPos = Math.random() * 100 + '%';
        const delay = Math.random() * 2 + 's';
        const duration = Math.random() * 3 + 2 + 's';

        // Random color
        const color = `hsl(${Math.random() * 360}, 100%, 75%)`; // Lighter colors

        rectangle.style.width = size;
        rectangle.style.height = size;
        rectangle.style.left = xPos;
        rectangle.style.backgroundColor = color;
        rectangle.style.animationDelay = delay;
        rectangle.style.animationDuration = duration;

        // Apply styles directly
        Object.assign(rectangle.style, {
          position: 'absolute',
          top: '-10px', // Start just above the container
          opacity: 0.8,
          borderRadius: '2px', // Slightly rounded corners for paper bits
          animation: `fall ${duration} linear infinite`,
        });

        container.appendChild(rectangle);
      }
    };

    createRectangles();

    // Add keyframes for the falling animation
    const styleSheet = document.styleSheets[0];
    const keyframesFall = `
      @keyframes fall {
        0% {
          transform: translateY(-10px);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    styleSheet.insertRule(keyframesFall, styleSheet.cssRules.length);

    // Add keyframes for the pop-up animation
    const keyframesPopup = `
      @keyframes popup {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.1);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    styleSheet.insertRule(keyframesPopup, styleSheet.cssRules.length);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a202c',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1
        ref={textRef}
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          animation: 'popup 1.5s ease-out forwards',
        }}
      >
        Congratulations!
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        You have completed your VerbalVoyage!
      </p>
      <button
        onClick={() => setGameState('start')}
        style={{
          backgroundColor: '#38a169',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default CongratulationsScreen;
