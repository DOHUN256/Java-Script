document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    let currentSlide = 0;
    
    // 첫 번째 이미지의 복사본을 마지막에 추가
    const firstClone = images[0].cloneNode(true);
    slides.appendChild(firstClone);
    
    function nextSlide() {
        currentSlide++;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.style.transition = 'transform 0.5s ease-in-out';
        
        // 마지막 슬라이드(복제본)에 도달했을 때
        if (currentSlide === images.length) {
            // 애니메이션이 끝난 후 첫 번째 슬라이드로 즉시 이동
            setTimeout(() => {
                slides.style.transition = 'none';
                currentSlide = 0;
                slides.style.transform = `translateX(0)`;
            }, 500);
        }
    }
    
    // 5초마다 다음 슬라이드로 이동
    setInterval(nextSlide, 5000);
});