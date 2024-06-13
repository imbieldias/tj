import React, { useState } from "react";
import Sentence from "./components/Sentence";
import sentences from "./data";

function App() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentSentenceIndex + 1;
    if (nextIndex < sentences.length) {
      setCurrentSentenceIndex(nextIndex);
      setShowNextButton(false);
    } else {
      alert(`Jogo terminado!`);
    }
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
