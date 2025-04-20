import React, { useEffect, useState } from "react";
import question from "../Data/Question";
import "./QuestionScreen.css";

// Soru ekranı bileşeni: kullanıcıya soruları sırayla gösterir ve cevaplarını toplar
function QuestionScreen({
  setTrueAnswer, // Doğru cevap sayısını günceller
  setFalseAnswer, // Yanlış cevap sayısını günceller
  setNullAnswer, // Süresi dolan (boş bırakılan) cevap sayısını günceller
  setScreen, // Ekran geçişleri için (örn. sonuç ekranı)
  answerArray, // Kullanıcının verdiği cevapları tutar
  setAnswerArray, // Cevap dizisini günceller
}) {
  // Uygulama içi durumlar
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Şu anki soru
  const [showOptions, setShowOptions] = useState(false); // Seçenekleri gizle/göster
  const [seconds, setSeconds] = useState(30); // Geri sayım süresi
  const [isAnswered, setIsAnswered] = useState(false); // Aynı soruya iki cevap verilmesini engellemek için

  const currentQuestion = question[currentQuestionIndex]; // O anki soru verisi

  // Eğer sorular bittiyse sonuç ekranına geç
  useEffect(() => {
    if (currentQuestionIndex >= question.length) {
      setScreen("result");
    }
  }, [currentQuestionIndex, setScreen]);

  // Her yeni soruda süreyi ve diğer ayarları sıfırla
  useEffect(() => {
    if (currentQuestionIndex >= question.length) return;

    setShowOptions(false);
    setSeconds(30);
    setIsAnswered(false); // Yeni soruya geçince cevap hakkını tekrar aç

    const showOptionsTimer = setTimeout(() => {
      setShowOptions(true); // 2 saniye sonra seçenekleri göster
    }, 2000);

    return () => clearTimeout(showOptionsTimer); // Önceki zamanlayıcıyı temizle
  }, [currentQuestionIndex]);

  // Geri sayımı çalıştır ve süre bitince işlem yap
  useEffect(() => {
    if (currentQuestionIndex >= question.length || isAnswered) return;

    if (seconds === 0) {
      // Süre dolduysa cevap olarak "Süre doldu" ekle
      setIsAnswered(true);
      setNullAnswer((prev) => prev + 1);
      setAnswerArray((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selected: "Süre doldu",
        },
      ]);

      // Kısa bir gecikmeyle sonraki soruya geç
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500);
      return;
    }

    // Son 10 saniye için uyarı rengi ekle
    const secondsEl = document.querySelector(".seconds");
    if (seconds === 10) secondsEl?.classList.add("warning");
    if (seconds === 0 || seconds === 30) secondsEl?.classList.remove("warning");

    // Her saniye geri sayımı azalt
    const countdown = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown); // Zamanlayıcıyı temizle
  }, [seconds, currentQuestionIndex, isAnswered]);

  // Sorular bittiyse hiçbir şey gösterme
  if (currentQuestionIndex >= question.length) return null;

  // Ekranda soruyu, süreyi ve seçenekleri göster
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
                    if (isAnswered) return; // Eğer cevaplandıysa tekrar cevaplanmasın

                    setIsAnswered(true); // Bu soruya cevap verildiğini işaretle
                    const newAnswer = {
                      question: currentQuestion.question,
                      selected: option,
                    };

                    // Doğru mu yanlış mı kontrolü
                    if (option === currentQuestion.answer) {
                      setTrueAnswer((prev) => prev + 1);
                    } else {
                      setFalseAnswer((prev) => prev + 1);
                    }

                    // Cevap dizisine ekle
                    setAnswerArray((prev) => [...prev, newAnswer]);

                    // Biraz gecikmeli şekilde sonraki soruya geç
                    setTimeout(() => {
                      setCurrentQuestionIndex((prev) => prev + 1);
                    }, 500);
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
