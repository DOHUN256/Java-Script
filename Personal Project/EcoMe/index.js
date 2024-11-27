// 기존 코드 아래에 추가
document.addEventListener('DOMContentLoaded', function() {
    const answerButton = document.querySelector('.answer-button');
    const answerText = document.querySelector('.answer-text');

    answerButton.addEventListener('click', function() {
        answerText.classList.remove('hidden');
    });
});