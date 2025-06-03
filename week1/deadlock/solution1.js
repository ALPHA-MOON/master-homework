const resourceA = { name: "resourceA", own: "" };
const resourceB = { name: "resourceB", own: "" };

const processQueue = {
  queue: [], //작업 큐

  //큐에 작업 넣기
  add(process) {
    this.queue.push(process);
  },

  //큐에서 작업 빼기
  shift() {
    return this.queue.shift();
  },

  //큐에 있는 작업 병렬 실행
  async do() {
    while (this.queue.length > 0) {
      const batch = [...this.queue];
      this.queue = [];
      await Promise.all(batch.map((p) => p())); // 병렬 실행
      await new Promise((r) => setTimeout(r, 500)); // 대기 후 다음 작업 실행
    }
  },
};

// 랜덤 대기 시간 함수(비동기 작업 묘사)
function randomSleep(name) {
  const ms = 3000 + Math.floor(Math.random() * 2000); // 3~5초
  return new Promise((resolve) => {
    console.log(`[${name}] 작업 중...`);
    setTimeout(resolve, ms);
  });
}

const createProcess = (name, firstRes, secondRes) => {
  let state = "start"; // 상태: start → done

  const fn = async () => {
    console.log(`[${name}] 작업 시작`);
    if (state === "start") {
      if (firstRes.own === "" && secondRes.own === "") {
        firstRes.own = name;
        secondRes.own = name;
        console.log(`[${name}] ${firstRes.name}, ${secondRes.name} 점유`);
        await randomSleep(name); // 작업 수행
        console.log(`[${name}] 자원 반납`);
        firstRes.own = "";
        secondRes.own = "";
        state = "done"; // 종료
        console.log(`[${name}] 작업 완료`);
      } else {
        console.log(`[${name}] 자원 획득을 위한 대기`);
        processQueue.add(fn); // 재도전 위해 다시 큐에 등록
      }
    }
  };

  Object.defineProperty(fn, "name", { value: `Process_${name}` });
  return fn;
};

function start() {
  const processA = createProcess("A", resourceA, resourceB);
  const processB = createProcess("B", resourceB, resourceA);

  processQueue.add(processA);
  processQueue.add(processB); //single task test 시 주석처리

  // 병렬 실행
  processQueue.do();
}

start();
