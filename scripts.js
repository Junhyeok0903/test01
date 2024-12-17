const startButton = document.getElementById("start-button");
const userInputs = document.querySelectorAll(".user-number");
const numbersContainer = document.getElementById("numbers-container");
const rankingDisplay = document.getElementById("ranking");

// 숫자 추첨 범위와 설정
const NUMBER_RANGE = 45;
const DRAW_COUNT = 6;

// 게임 상태 변수
let userNumbers = [];
let drawnNumbers = [];

// 추첨 시작
startButton.addEventListener("click", startDraw);

function startDraw() {
  // 초기화
  numbersContainer.innerHTML = "";
  drawnNumbers = [];
  rankingDisplay.textContent = "";
  
  // 사용자 숫자 가져오기
  userNumbers = Array.from(userInputs)
    .map(input => parseInt(input.value))
    .filter(num => num >= 1 && num <= 45);

  if (userNumbers.length !== 6 || new Set(userNumbers).size !== 6) {
    alert("1부터 45까지의 숫자 6개를 중복 없이 입력해주세요.");
    return;
  }

  // 랜덤 숫자 하나씩 추첨
  let availableNumbers = Array.from({ length: NUMBER_RANGE }, (_, i) => i + 1);
  let drawInterval = setInterval(() => {
    if (drawnNumbers.length < DRAW_COUNT) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomNumber = availableNumbers.splice(randomIndex, 1)[0];
      drawnNumbers.push(randomNumber);
      displayNumber(randomNumber);
    } else {
      clearInterval(drawInterval);
      checkRanking();
    }
  }, 1000); // 숫자 하나씩 1초 간격으로 추첨
}

// 추첨된 숫자 화면에 표시
function displayNumber(number) {
  const numberElement = document.createElement("div");
  numberElement.className = "number";
  numberElement.textContent = number;
  numbersContainer.appendChild(numberElement);
}

// 등수 판정
function checkRanking() {
  let matchCount = userNumbers.filter(num => drawnNumbers.includes(num)).length;

  if (matchCount === 6) {
    rankingDisplay.textContent = "1등! 모든 숫자가 일치합니다!";
  } else if (matchCount === 5) {
    rankingDisplay.textContent = "2등! 숫자 5개가 일치합니다!";
  } else if (matchCount === 4) {
    rankingDisplay.textContent = "3등! 숫자 4개가 일치합니다!";
  } else {
    rankingDisplay.textContent = "아쉽지만 꽝입니다! 다시 도전해보세요.";
  }
}
