document.addEventListener('DOMContentLoaded', function() {
    // 섹션을 변수로 지정
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    
    // 슬라이드 페이지 수를 체크할 변수
    let currentSlide = 0;
    
    // 첫 번째 이미지의 복사본을 마지막에 추가 (자연스러운 전환을 위해)
    const firstClone = images[0].cloneNode(true);
    slides.appendChild(firstClone);
    
    function nextSlide() {
        currentSlide++;
        // X축으로 이동시키는 애니메이션 이미지 비율은 100% -부호로 왼쪽으로
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        // 애니메이션 속도
        slides.style.transition = 'transform 0.5s ease-in-out';
        
        // 마지막 슬라이드(복제본)에 도달했을 때
        if (currentSlide === images.length) {
            // 애니메이션이 끝난 후 첫 번째 슬라이드로 즉시 이동
            setTimeout(() => {
                slides.style.transition = 'none'; //애니메이션 중지
                currentSlide = 0; //첫번째 슬라이드로 위치 초기화
                slides.style.transform = `translateX(0)`; //지정 위치로 이동
            }, 500);// 0.5초후 실행
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
        //각 페이지 섹션 변수 지정
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
                Timer();
                break;
            case '메모장':
                memoSection.style.display = 'flex';
                //body 안에 있는 메인에 메모 섹션 표시 후 함수호출
                Memo();
                break;
            default:
                homeSection.style.display = 'block';
                break;
        }
    });
});
function Timer() {
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
        }, 1000);//1초마다 실행시키고 함수를 반복할때마다 초를 1씩 증가 그리고 display 함수 호춫
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


function Memo() {
    //메모 css영역 변수로 지정
    const saveButton = document.getElementById('save-memo');
    const titleInput = document.getElementById('memo-title');
    const contentInput = document.getElementById('memo-content');
    const savedMemosDiv = document.getElementById('saved-memos');

    // 저장된 메모 불러오기
    function loadMemos() {
        //JSON.parse를 통해 자바스크립트에서 사용 가능한 객체로 불러오기
        const memos = JSON.parse(localStorage.getItem('memos') || '[]');
        //초기화
        savedMemosDiv.innerHTML = '';

        //갱신된 정보로 다시 불러오기
        memos.forEach((memo, index) => {
            const memoElement = document.createElement('div');
            //saved-memo 클래스에 div 요소 추가
            memoElement.className = 'saved-memo';
            memoElement.innerHTML = `
                <h4>${memo.title}</h4>
                <p>${memo.content}</p>
                <button class="delete-memo" data-index="${index}">삭제</button>
            `;
            //메모 요소 추가
            savedMemosDiv.appendChild(memoElement);
        });
    }

    // 메모 저장
    saveButton.addEventListener('click', () => {
        //제목과 내용 변수 지정 및 trim 함수로 공백 제거로 오류 방지
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        //둘 중 하나가 비면 알림창 띄우기
        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }
        //기존 메모들 가져오기
        const memos = JSON.parse(localStorage.getItem('memos') || '[]');

        //이후 끝에 입력한 제목과 내용을 담은 메모추가
        memos.push({ title, content });

        //localStorage는 문자열만 받기 때문에 JSON.stringify를 통해 문자열로 변환
        localStorage.setItem('memos', JSON.stringify(memos));

        //입력창 초기화
        titleInput.value = '';
        contentInput.value = '';
        //저장된 메모 불러오기
        loadMemos();
    });
  

    // 메모 삭제
    savedMemosDiv.addEventListener('click', (e) => {
        //(e)는 이벤트 객체, 클릭된 요소가 delete-memo 클래스를 가지고 있으면 실행
        if (e.target.classList.contains('delete-memo')) {
            //저장된 메모 요소마다 삭제 버튼을 넣어야 하므로 메모 생성에서 만들었던 dataset.index 값 가져오기
            const index = e.target.dataset.index;
            const memos = JSON.parse(localStorage.getItem('memos') || '[]');
            //splice 함수로 요소 삭제
            memos.splice(index, 1);
            localStorage.setItem('memos', JSON.stringify(memos));
            //메모장 불러오기
            loadMemos();
        }
    });

    //메모장 불러오기
    loadMemos();
}