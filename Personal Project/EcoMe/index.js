document.addEventListener('DOMContentLoaded', function() {
    const answerButton = document.querySelector('.answer-button');
    const answerText = document.querySelector('.answer-text');

    // 페이드인 효과를 적용할 요소들 선택 (더 구체적인 선택자 추가)
    const fadeElements = document.querySelectorAll(`
        .main-text,
        .main-title,
        .main-subtitle,
        .info-section,
        .info-title,
        .info-box,
        .quiz-section,
        .gray-box-text,
        .gray-box-subtext,
        .answer-button,
        .answer-text,
        .bottom-info
    `);
    
    // 각 요소에 fade-in 클래스 추가
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // 스크롤 이벤트 핸들러
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }

    // 초기 로드 시 체크
    checkFade();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', checkFade);

    // 답변 버튼 클릭 이벤트
    answerButton.addEventListener('click', function() {
        answerText.classList.remove('hidden');
        answerButton.classList.add('hidden');
    });
});