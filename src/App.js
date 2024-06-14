import React, { useState } from "react";
import Sentence from "./components/Sentence";
import sentences from "./data";
import Write from "./components/Write";
import "./App.css";

function App() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(
    Math.floor(Math.random() * sentences.length)
  );
  const [showNextButton, setShowNextButton] = useState(false);
  const [gameMode, setGameMode] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = Math.floor(Math.random() * sentences.length);
    setCurrentSentenceIndex(nextIndex);
    setShowNextButton(false);
  };

  return (
    <div className="App">
      {gameMode === 1 && (
        <div>
          <h1>Crimes Contra a Fé Pública</h1>
          {currentSentenceIndex < sentences.length && (
            <>
              <Sentence
                key={currentSentenceIndex}
                sentence={sentences[currentSentenceIndex]}
                onAnswer={handleAnswer}
              />
              {showNextButton && (
                <button onClick={handleNextQuestion}>Avançar</button>
              )}
            </>
          )}
        </div>
      )}
      {gameMode === 2 && (
        <div>
          <Write />
        </div>
      )}
      {gameMode === 0 ? (
        <div className="menu">
          <h1>Escolha o Jogo</h1>
          <button onClick={() => setGameMode(1)}>Completar (teórico)</button>
          <button onClick={() => setGameMode(2)}>Escrever (literal)</button>
        </div>
      ) : (
        <button onClick={() => setGameMode(0)}>Voltar</button>
      )}
    </div>
  );
}

export default App;
