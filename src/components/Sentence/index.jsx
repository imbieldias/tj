import React, { useState, useEffect } from "react";
import "./styles/Sentence.css"; // Importe o arquivo CSS para estilização

function Sentence({ sentence, onAnswer }) {
  const blanks = sentence.text.split("____");
  const initialAnswers = Array(blanks.length - 1).fill("");
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const [selectedBlankIndex, setSelectedBlankIndex] = useState(0); // Inicia o primeiro campo selecionado
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // Novo estado para controlar se a resposta foi submetida
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Embaralhar as opções de resposta ao mudar a frase
    setShuffledOptions(shuffleArray(sentence.options));
    // Resetar estados ao mudar de frase
    setUserAnswers(initialAnswers);
    setSelectedBlankIndex(0); // Define o primeiro campo como selecionado ao mudar de frase
    setAnsweredCorrectly(false);
    setAnswerSubmitted(false);
  }, [sentence]);

  // Função para embaralhar um array (Fisher-Yates shuffle algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleBlankClick = (index) => {
    if (!answeredCorrectly) {
      setSelectedBlankIndex(index);
    }
  };

  const handleOptionClick = (option) => {
    if (!answeredCorrectly) {
      const newAnswers = [...userAnswers];
      newAnswers[selectedBlankIndex] = option;
      setUserAnswers(newAnswers);
      setAnswerSubmitted(false); // Marca que a resposta foi submetida
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answerSubmitted) {
      // Verifica se a resposta já foi submetida
      const isCorrect =
        userAnswers.join(" ").trim().toLowerCase() ===
        sentence.answer.join(" ").toLowerCase();
      onAnswer(isCorrect);
      setAnsweredCorrectly(isCorrect);
      setAnswerSubmitted(true); // Marca que a resposta foi submetida
    }
  };

  const getClassName = (index) => {
    if (answerSubmitted) {
      const currentAnswer = userAnswers[index];
      const isCorrect = sentence.answer.some((a) => a === currentAnswer);
      const ok = sentence.answer[index] === currentAnswer;
      if (isCorrect && !ok) return "wrong-place";
      return isCorrect ? "correct" : "incorrect";
    }
    return "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="main">
        <p className="text">
          {blanks.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < blanks.length - 1 && (
                <span
                  className={`drop-area ${getClassName(index)} ${
                    index === selectedBlankIndex ? "selected" : ""
                  }`}
                  onClick={() => handleBlankClick(index)}
                >
                  {userAnswers[index]}
                </span>
              )}
            </React.Fragment>
          ))}
        </p>
        <div className="options">
          {shuffledOptions.map((option, index) => (
            <div
              key={index}
              className={`option`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        {!answeredCorrectly && <button type="submit">Responder</button>}
      </form>
      {!answeredCorrectly && answerSubmitted && (
        <p className="incorrect-feedback">
          Resposta incorreta. Tente novamente!
        </p>
      )}
    </div>
  );
}

export default Sentence;
