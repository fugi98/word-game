import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 text-white py-4 mt-auto fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          Developed by <strong>Tahseen Fathima</strong>
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/fugi98" // GitHub profile URL
            className="text-blue-400 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/tahseen-fathima/" // LinkedIn profile URL
            className="text-blue-400 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
};


