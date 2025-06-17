// useTodos.js
// 원래 hook으로 작성하려 했으나 데이터를 받아오는 역할만 수행
// suspense로 처리하기 위해 준비 안됐을 경우 promise를 반환
// 기존에 cache가 있으면 그걸 반환

import axios from "axios";

let cache;
let promise;

export function fetchTodos() {
  if (!promise) {
    promise = axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        cache = res.data;
      })
      .catch((err) => {
        throw err; // Suspense에서 에러로 처리됨
      });
  }
  throw promise; // 아직 준비 안 됨 → Suspense fallback으로 전환됨
}

export function useTodos() {
  if (cache) return cache;
  throw fetchTodos(); // Suspense가 기다림
}
