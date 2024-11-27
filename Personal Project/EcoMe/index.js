document.addEventListener('DOMContentLoaded', function() {
    const answerButton = document.querySelector('.answer-button');
    const answerText = document.querySelector('.answer-text');

    answerButton.addEventListener('click', function() {
        answerText.classList.remove('hidden');
        answerButton.classList.add('hidden');    // 추가: 버튼 숨기기
    });
});