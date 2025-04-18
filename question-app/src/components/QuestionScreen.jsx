import React, { useEffect, useState } from "react";
import question from "../Data/Question";
import "./QuestionScreen.css";

function QuestionScreen({
  setTrueAnswer,
  setFalseAnswer,
  setNullAnswer,
  setScreen,
  answerArray,
  setAnswerArray,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const currentQuestion = question[currentQuestionIndex];

  // Sorular bittiyse otomatik sonuç ekranına geç
  useEffect(() => {
    if (currentQuestionIndex >= question.length) {
      setScreen("result");
    }
  }, [currentQuestionIndex, setScreen]);

  // Yeni soruya geçince süreyi sıfırla ve seçenekleri gizle
  useEffect(() => {
    if (currentQuestionIndex >= question.length) return;

    setShowOptions(false);
    setSeconds(30);

    const showOptionsTimer = setTimeout(() => {
      setShowOptions(true);
    }, 4000);

    return () => clearTimeout(showOptionsTimer);
  }, [currentQuestionIndex]);

  // Süre azalsın ve süre dolunca boş cevap eklensin
  useEffect(() => {
    if (currentQuestionIndex >= question.length) return;

    if (seconds === 0) {
      setNullAnswer((prev) => prev + 1);
      setAnswerArray((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selected: "Süre doldu",
        },
      ]);
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }
    const secondsEl = document.querySelector(".seconds");

    if (seconds === 10) {
      secondsEl.classList.add("warning");
    }

    if (seconds === 0 || seconds === 30) {
      secondsEl.classList.remove("warning");
    }

    const countdown = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [seconds, currentQuestionIndex]);

  if (currentQuestionIndex >= question.length) {
    return null; // Sorular bittiyse boş div dön
  }

  return (
    <div className="start-screen">
      <div className="question box">
        <span className="seconds">{seconds}</span>
        <img className="images" src={currentQuestion.media} alt="" />
        <p className="currentQuestion">{currentQuestion.question}</p>

        <div className="button-div">
          {showOptions && (
            <div className={`buttons ${showOptions ? "show" : ""}`}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAnswer = {
                      question: currentQuestion.question,
                      selected: option,
                    };

                    if (option === currentQuestion.answer) {
                      setTrueAnswer((prev) => prev + 1);
                    } else {
                      setFalseAnswer((prev) => prev + 1);
                    }

                    setAnswerArray((prev) => [...prev, newAnswer]);
                    setCurrentQuestionIndex((prev) => prev + 1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
