import React from "react";
import "./StartScreen.css";
import "../App";

// Başlangıç ekranı: kullanıcıya bilgi verir ve teste başlatır
function StartScreen({ setScreen }) {
  return (
    <div className="start-screen">
      <div className="start box">
        <h1>Question App'e Hoşgeldiniz</h1>

        {/* Uygulama kurallarının ve yönergelerin listesi */}
        <ul>
          <li>
            <span>
              <strong>10 sorudan</strong> oluşur.
            </span>
          </li>
          <li>
            <span>
              Her soru için <strong>30 saniyen</strong> vardır.
            </span>
          </li>
          <li>
            <span>İlk 4 saniyede şıklar görünmez.</span>
          </li>
          <li>
            <span>Sorulara sadece bir kez cevap verebilirsin.</span>
          </li>
          <li>
            <span>Geri dönüş yoktur.</span>
          </li>
          <li>
            <span>Hadi bakalım, başarılar! 🍀</span>
          </li>
        </ul>

        {/* Başla butonu tıklanınca soru ekranına geçiş yapılır */}
        <div className="start-button-container">
          <button
            onClick={() => {
              setScreen("question");
            }}
          >
            Teste Başla
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
