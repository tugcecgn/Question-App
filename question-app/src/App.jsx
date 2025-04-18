import React from "react";
import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import "./App.css";
import QuestionScreen from "./components/QuestionScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";

function App() {
  const [trueAnswer, setTrueAnswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [nullAnswer, setNullAnswer] = useState(0);
  const [screen, setScreen] = useState("start");
  const [answerArray, setAnswerArray] = useState([]);

  return (
    <div className="gradient-background">
      {screen == "start" && <StartScreen setScreen={setScreen} />}
      {screen == "question" && (
        <QuestionScreen
          setTrueAnswer={setTrueAnswer} //bunları prop olarak questionscreenden aldık.
          setFalseAnswer={setFalseAnswer}
          setNullAnswer={setNullAnswer}
          setScreen={setScreen}
          answerArray={answerArray}
          setAnswerArray={setAnswerArray}
        />
      )}

      {screen == "result" && (
        <ResultScreen
          trueAnswer={trueAnswer}
          falseAnswer={falseAnswer}
          nullAnswer={nullAnswer}
          setScreen={setScreen}
          answerArray={answerArray}
        />
      )}
    </div>
  );
}

export default App;
