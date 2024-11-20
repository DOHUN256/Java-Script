document.addEventListener('DOMContentLoaded', function() {
    // 섹션을 변수로 지정
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    
    // 슬라이드 페이지 수를 체크할 변수
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

    // 로고 클릭 시 홈 섹션으로 이동
    document.querySelector('.logo').addEventListener('click', function() {
        // 섹션을 변수로 지정
        const homeSection = document.getElementById('home-section');
        const timerSection = document.getElementById('timer-section');
        const memoSection = document.getElementById('memo-section');

        // 모든 섹션 숨기기.... 숨겨놓고 클릭시 반응형으로 표시하는 식으로
        timerSection.style.display = 'none';
        memoSection.style.display = 'none';
        
        // 홈 섹션 보이기
        homeSection.style.display = 'block';
    });
});

document.querySelectorAll('.menu-item').forEach(item => {
    //메뉴바 아이템에 클릭시 이벤트를 넣어 페이지를 이동시키게 만들기
    item.addEventListener('click', function() {
        //어떤 메뉴를 눌렀는지 확인하기 위한 text 변수
        const text = this.querySelector('span').textContent;
        //각 페이지 마다 아이디 이름을 할당
        const homeSection = document.getElementById('home-section');
        const timerSection = document.getElementById('timer-section');
        const memoSection = document.getElementById('memo-section');

        // 모든 섹션 숨기기
        homeSection.style.display = 'none';
        timerSection.style.display = 'none';
        memoSection.style.display = 'none';

        switch(text) {
            case '타이머':
                timerSection.style.display = 'flex';
                //body 안에 있는 메인에 타이머 섹션 표시 후 함수호출
                initTimer();
                break;
            case '메모 저장':
                memoSection.style.display = 'flex';
                //body 안에 있는 메인에 메모 섹션 표시 후 함수호출
                initMemo();
                break;
            default:
                homeSection.style.display = 'block';
                break;
        }
    });
});
function initTimer() {
    // 현재 시간 표시
    const currentTimeDiv = document.querySelector('.current-time');
    function updateCurrentTime() {
        //Date 객체 불러오기        
        const now = new Date();
        //현재시간 불러와서 텍스트에 넣기
        currentTimeDiv.textContent = now.toLocaleTimeString();
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // 스톱워치 기능
    let timeInterval;
    let seconds = 0;
    const timeDisplay = document.querySelector('.time-display');
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');

    function updateDisplay() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        //가져온 시간 값들을 텍스트에 표시
        timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    //버튼 기능 설정
    startBtn.addEventListener('click', () => {
        clearInterval(timeInterval);
        timeInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timeInterval);
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timeInterval);
        seconds = 0;
        updateDisplay();
    });
}


function initMemo() {
    const saveButton = document.getElementById('save-memo');
    const titleInput = document.getElementById('memo-title');
    const contentInput = document.getElementById('memo-content');
    const savedMemosDiv = document.getElementById('saved-memos');

    // 저장된 메모 불러오기
    function loadMemos() {
        const memos = JSON.parse(localStorage.getItem('memos') || '[]');
        savedMemosDiv.innerHTML = '';
        
        memos.forEach((memo, index) => {
            const memoElement = document.createElement('div');
            memoElement.className = 'saved-memo';
            memoElement.innerHTML = `
                <h4>${memo.title}</h4>
                <p>${memo.content}</p>
                <button class="delete-memo" data-index="${index}">삭제</button>
            `;
            savedMemosDiv.appendChild(memoElement);
        });
    }

    // 메모 저장
    saveButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        const memos = JSON.parse(localStorage.getItem('memos') || '[]');
        memos.push({ title, content });
        localStorage.setItem('memos', JSON.stringify(memos));

        titleInput.value = '';
        contentInput.value = '';
        loadMemos();
    });

    // 메모 삭제
    savedMemosDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-memo')) {
            const index = e.target.dataset.index;
            const memos = JSON.parse(localStorage.getItem('memos') || '[]');
            memos.splice(index, 1);
            localStorage.setItem('memos', JSON.stringify(memos));
            loadMemos();
        }
    });

    // 초기 메모 로드
    loadMemos();
}