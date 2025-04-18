import React from "react";
import { useState } from "react";

// Farklı ekran bileşenlerini içeri aktarıyoruz
import StartScreen from "./components/StartScreen.jsx";
import "./App.css";
import QuestionScreen from "./components/QuestionScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";

function App() {
  // Kullanıcının verdiği cevaplara göre sayılar tutuluyor
  const [trueAnswer, setTrueAnswer] = useState(0); // doğru cevap sayısı
  const [falseAnswer, setFalseAnswer] = useState(0); // yanlış cevap sayısı
  const [nullAnswer, setNullAnswer] = useState(0); // boş bırakılan cevap sayısı

  // Ekran durumunu yönetiyoruz: "start", "question", "result"
  const [screen, setScreen] = useState("start");

  // Kullanıcının tüm cevaplarını içeren dizi
  const [answerArray, setAnswerArray] = useState([]);

  return (
    <div className="gradient-background">
      {/* Başlangıç ekranı */}
      {screen == "start" && <StartScreen setScreen={setScreen} />}

      {/* Soru ekranı */}
      {screen == "question" && (
        <QuestionScreen
          setTrueAnswer={setTrueAnswer}
          setFalseAnswer={setFalseAnswer}
          setNullAnswer={setNullAnswer}
          setScreen={setScreen}
          answerArray={answerArray}
          setAnswerArray={setAnswerArray}
        />
      )}

      {/* Sonuç ekranı */}
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
