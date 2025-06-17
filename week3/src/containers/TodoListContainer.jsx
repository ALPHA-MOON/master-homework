// TodoListContainer.jsx
// 상태관리 및 데이터 처리 로직 작성
// container component로 작성

import { useState } from "react";
import InputComponent from "../components/InputComponent";
import ListComponent from "../components/ListComponent";
import { useTodos } from "../hooks/useTodos"; // Suspense-aware 훅

const TodoListContainer = () => {
  const [input, setInput] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [todos, setTodos] = useState(useTodos()); // 처음 로드될 때만 Suspense에 의해 대기

  const writeTodo = (e) => {
    setIsWriting(true);
    setInput(e.target.value);
  };

  const doSubmit = () => {
    if (input.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    setTodos([...todos, { title: input, id: Math.random() * 10000 }]);
    setInput("");
    setIsWriting(false);
  };

  return (
    <div>
      <h1 style={{ color: isWriting ? "red" : "blue" }}>
        할 일 목록 관리 애플리케이션
      </h1>
      <InputComponent writeTodo={writeTodo} input={input} doSubmit={doSubmit} />
      <ListComponent todos={todos} />
      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
        <small>버전 0.1 - 실습용으로 간단히 구현된 예제입니다.</small>
      </footer>
    </div>
  );
};

export default TodoListContainer;
