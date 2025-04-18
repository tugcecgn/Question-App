import React from "react";
import questions from "../Data/Question";
import "./ResultScreen.css";

// Sonuç ekranı: doğru, yanlış ve boş cevapların gösterildiği ekran
function ResultScreen({
  trueAnswer, // Doğru cevap sayısı
  falseAnswer, // Yanlış cevap sayısı
  nullAnswer, // Cevapsız (süre dolmuş) soru sayısı
  answerArray, // Kullanıcının verdiği tüm cevaplar
  setScreen, // Ekran geçişi yapmak için fonksiyon
}) {
  return (
    <div className="result-container">
      <div className="box container">
        <h1>Sonuçlar</h1>

        {/* Doğru, yanlış ve boş cevap sayıları */}
        <div className="results">
          <div className="true">{trueAnswer}</div>
          <div className="false">{falseAnswer}</div>
          <div className="empty">{nullAnswer}</div>
        </div>

        <h2>Cevaplarınız:</h2>

        {/* Tüm sorular listeleniyor ve kullanıcının verdiği cevaplarla karşılaştırılıyor */}
        {questions.map((item, index) => {
          const userAnswerObj = answerArray.find(
            (ans) => ans.question === item.question
          );

          // Kullanıcının verdiği cevabı al, yoksa "Cevap verilmedi" yaz
          const userAnswer = userAnswerObj
            ? userAnswerObj.selected
            : "Cevap verilmedi";

          return (
            <div
              key={index}
              className="question-box"
              style={{
                // Sol kenar rengi doğruysa yeşil, yanlışsa kırmızı, süresi dolduysa gri
                borderLeft: `4px solid ${
                  userAnswer === item.answer
                    ? "green"
                    : userAnswer === "Süre doldu"
                    ? "gray"
                    : "red"
                }`,
              }}
            >
              <h3 className="question">{item.question}</h3>
              <div className="bottom">
                <p>Doğru Cevap: {item.answer}</p>
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

        {/* Yeniden başlat butonu */}
        <button onClick={() => setScreen("start")}>Yeniden başla</button>
      </div>
    </div>
  );
}

export default ResultScreen;
