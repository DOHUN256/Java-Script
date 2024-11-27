document.addEventListener('DOMContentLoaded', function() {
    const answerButton = document.querySelector('.answer-button');
    const answerText = document.querySelector('.answer-text');

    // 답변 버튼 클릭 이벤트
    answerButton.addEventListener('click', function() {
        answerText.classList.remove('hidden');
        answerButton.classList.add('hidden');
    });

    // 페이드인 효과를 적용할 요소들 선택
    const fadeElements = document.querySelectorAll('.menu, .main-text, .info-section, .quiz-section, .bottom-info, .footer');
    
    // 각 요소에 fade-in 클래스 추가
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
});