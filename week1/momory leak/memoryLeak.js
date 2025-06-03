//1. 이벤트 리스너 해제 누락

const button = document.getElementById("button");
const handleClick = () => {
  console.log("button clicked");
};

button.addEventListener("click", handleClick);
document.body.removeChild(button);
// 버튼은 제거 되었으나 이벤트 리스너가 해제되지 않아 메모리 누수 발생

//✅ 해결방법: 이벤트 리스너 해제
button.removeEventListener("click", handleClick);

//---------------------------------------------------
//2. 타이머 해제 누락
function start() {
  setInterval(() => {
    console.log("working...");
  }, 1000);
}

start();
// 타이머는 해제되지 않아 메모리 누수 발생

//✅ 해결방법: clearInterval() 호출해서 타이머 해제
let intervalId;

function start() {
  intervalId = setInterval(() => {
    console.log("working...");
  }, 1000);
}
start();

clearInterval(intervalId);

//---------------------------------------------------
//3. 클로저로 인한 참조가 유지되는 경우
function outer() {
  const largeData = new Array(1000000).fill("data");

  return function inner() {
    console.log(largeData);
  };
}

const leakedFn = outer(); // largeData는 아직 참조되고 있어 해제 불가

//✅ 해결방법: 클로저 참조 해제
leakedFn = null;
