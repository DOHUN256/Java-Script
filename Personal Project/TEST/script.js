// JavaScript를 사용해 글씨가 특정 타이밍에 나타나도록 설정
document.addEventListener("DOMContentLoaded", () => {
    const text = document.querySelector(".fade-in-text");
  
    // 약간의 지연 후에 클래스 추가
    setTimeout(() => {
      text.style.animationDelay = "0.5s";
    }, 500);
  });