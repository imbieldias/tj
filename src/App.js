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
    </div>
  );
}

export default App;
