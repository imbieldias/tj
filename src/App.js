import React, { useState } from "react";
import Sentence from "./components/Sentence";
import sentences from "./data";

function App() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(
    Math.floor(Math.random() * sentences.length)
  );
  const [showNextButton, setShowNextButton] = useState(false);

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
      <h1>Jogo de Completar Frases - Crimes Contra a Fé Pública</h1>
      {currentSentenceIndex < sentences.length && (
        <>
          <Sentence
            key={currentSentenceIndex}
            sentence={sentences[currentSentenceIndex]}
            onAnswer={handleAnswer}
          />
          {showNextButton && (
            <button onClick={handleNextQuestion}>Próxima Pergunta</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
