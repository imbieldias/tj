import { useEffect, useState } from "react";
import { art293_295Array } from "../../data/art293_295";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Write.css";

function Write() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState("");
  const [sentence, setSentence] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [twoWords, setTwoWords] = useState([]);
  const [view, setView] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Começa em 10 segundos
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    // Inicializa o contador quando o componente é montado
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // Calcula o tempo decorrido em segundos
      setTotalTime(Math.round(elapsedTime)); // Atualiza o tempo total arredondado
    }, 1000); // Atualiza a cada segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (view) {
      setTimerRunning(true);
      setTimeLeft(10); // Reinicia o tempo quando a view é aberta
    } else {
      setTimerRunning(false);
      setTimeLeft(10); // Reseta o tempo quando a view é fechada
    }
  }, [view]);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setView(false);
    }
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    if (sentenceIndex < art293_295Array.length) {
      const [, sentence] = art293_295Array[sentenceIndex];
      setCurrentSentence(sentence);
      setView(true); // Exibe a visualização ao mudar para a próxima sentença
    }
  }, [sentenceIndex]);

  useEffect(() => {
    if (sentence.length === 0) return;

    const result = sentence.join(" ");
    const ok = result === currentSentence;

    if (ok) {
      setAnsweredCorrectly(true);
      if (sentenceIndex + 1 < art293_295Array.length) {
        setSentenceIndex(sentenceIndex + 1);
      }
      setSentence([]);
    } else if (result.length >= currentSentence.length) {
      setAnsweredCorrectly(false);
      setSentence([]);
    }
  }, [sentence, currentSentence, sentenceIndex]);

  useEffect(() => {
    const getTwoWords = () => {
      const currentIndex = sentence.length;
      const currentSentenceArray = currentSentence.split(" ");
      const correctlyWord = currentSentenceArray[currentIndex];

      const sentenceSet = new Set(currentSentenceArray);
      sentenceSet.delete(correctlyWord);

      const randomIndex = Math.floor(Math.random() * sentenceSet.size);
      const randomWord = Array.from(sentenceSet)[randomIndex];

      const result = [correctlyWord, randomWord];

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      setTwoWords(result);
    };

    if (currentSentence) {
      getTwoWords();
    }
  }, [sentence, currentSentence]);

  const handleClickWord = (e) => {
    setSentence((prevSentence) => [...prevSentence, e.target.innerText]);
  };

  const handleRemoveLastWord = () => {
    setSentence((prevSentence) => prevSentence.slice(0, -1));
  };

  const handleView = () => {
    setView(!view);
  };

  const timerPercent = (timeLeft / 10) * 100;
  const timerWidth = `${timerPercent}%`;

  const getColor = () => {
    if (timerPercent >= 60) return "#03f770";
    if (timerPercent >= 30) return "#faf062";
    if (timerPercent >= 0) return "#ee4444";
  };

  return (
    <div className="write">
      <h1>Escrevendo a lei</h1>
      <div>
        <p>
          <span className="title">{art293_295Array[sentenceIndex][0]} - </span>
          <span className="sentence">{sentence.join(" ")}</span>
        </p>

        <div className="two-words">
          {twoWords.map((w, index) => (
            <button key={index} onClick={handleClickWord} className="word">
              {w}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleRemoveLastWord} className="erase">
        <Icon icon="entypo:erase" />
      </button>
      <button onClick={handleView}>
        <Icon icon="carbon:view" />
      </button>
      {view && (
        <div className="current-sentence">
          <h2 className="title">{art293_295Array[sentenceIndex][0]}</h2>
          <span className="current-sentence-text">{currentSentence}</span>
          <button onClick={handleView} className="close">
            <Icon icon="ion:close" />
          </button>
          <div
            className="timer"
            style={{ width: timerWidth, backgroundColor: getColor() }}
          ></div>
        </div>
      )}
      <span>Tempo Total: {totalTime} segundos</span>
    </div>
  );
}

export default Write;
