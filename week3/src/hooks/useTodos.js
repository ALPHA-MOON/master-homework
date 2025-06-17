// useTodos.js
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
