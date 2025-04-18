import React, { useEffect, useState } from "react";
import question from "../Data/Question";
import "./QuestionScreen.css";

// Soru ekranı bileşeni: kullanıcıya soruları sırayla gösterir ve cevaplarını toplar
function QuestionScreen({
  setTrueAnswer, // Doğru cevap sayısını günceller
  setFalseAnswer, // Yanlış cevap sayısını günceller
  setNullAnswer, // Süresi dolan cevap sayısını günceller
  setScreen, // Ekranlar arası geçiş için kullanılır (örn. sonuç ekranı)
  answerArray, // Kullanıcının verdiği cevapları tutar
  setAnswerArray, // Cevap dizisini günceller
}) {
  // Uygulama içindeki durumlar
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Mevcut soru indexi
  const [showOptions, setShowOptions] = useState(false); // Seçenekleri göster/gizle
  const [seconds, setSeconds] = useState(30); // Geri sayım süresi

  const currentQuestion = question[currentQuestionIndex]; // O anki soru

  // Soru listesi bittiğinde sonuç ekranına geç
  useEffect(() => {
    if (currentQuestionIndex >= question.length) {
      setScreen("result");
    }
  }, [currentQuestionIndex, setScreen]);

  // Her yeni soruda süreyi sıfırla ve 4 saniye sonra seçenekleri göster
  useEffect(() => {
    if (currentQuestionIndex >= question.length) return;

    setShowOptions(false);
    setSeconds(30);

    const showOptionsTimer = setTimeout(() => {
      setShowOptions(true);
    }, 4000);

    return () => clearTimeout(showOptionsTimer);
  }, [currentQuestionIndex]);

  // Geri sayım kontrolü ve süre bittiğinde boş cevap olarak işaretleme
  useEffect(() => {
    if (currentQuestionIndex >= question.length) return;

    if (seconds === 0) {
      // Süre dolarsa "Süre doldu" olarak cevap ekle
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

    // Geri sayım rengi için DOM üzerinden class ekle/çıkar
    const secondsEl = document.querySelector(".seconds");
    if (seconds === 10) secondsEl.classList.add("warning");
    if (seconds === 0 || seconds === 30) secondsEl.classList.remove("warning");

    const countdown = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [seconds, currentQuestionIndex]);

  // Sorular bittiyse ekrana hiçbir şey yazma
  if (currentQuestionIndex >= question.length) return null;

  // Ana UI bileşeni: süre, görsel, soru metni ve butonlar
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
                    // Cevap kontrolü ve güncelleme
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
