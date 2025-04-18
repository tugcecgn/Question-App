import React from "react";
import questions from "../Data/Question";
import "./ResultScreen.css";

function ResultScreen({
  trueAnswer,
  falseAnswer,
  nullAnswer,
  answerArray,
  setScreen,
}) {
  return (
    <div className="result-container">
      <div className="container">
        <h1>Sonuçlar</h1>
        <div className="results">
          <div className="true"> {trueAnswer}</div>
          <div className="false">{falseAnswer} </div>
          <div className="empty">{nullAnswer}</div>
        </div>
        <h2>Cevaplarınız:</h2>
        {questions.map((item, index) => {
          const userAnswerObj = answerArray.find(
            (ans) => ans.question === item.question
          );
          const userAnswer = userAnswerObj
            ? userAnswerObj.selected
            : "Cevap verilmedi";

          return (
            <div
              key={index}
              className="question-box"
              style={{
                borderLeft: `4px solid ${
                  userAnswer === item.answer
                    ? "green"
                    : userAnswer === "Süre doldu"
                    ? "gray"
                    : "red"
                }`,
              }}
            >
              <h3>{item.question}</h3>
              <div className="bottom">
                <p> Doğru Cevap: {item.answer}</p>
                <p
                  style={{
                    color:
                      userAnswer === item.answer
                        ? "green"
                        : userAnswer === "Süre doldu"
                        ? "gray"
                        : "red",
                  }}
                >
                  Senin Cevabın: {userAnswer}
                </p>
              </div>
            </div>
          );
        })}
        <button onClick={() => setScreen("start")}>Yeniden başla</button>
      </div>
    </div>
  );
}

export default ResultScreen;
