// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [input, setInput] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(res => {
          setTodos(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          alert("데이터를 불러오는 중 문제가 발생했습니다.");
          console.log(err);
        })
    }
  }, [isLoading]);

  function clicked(e) {
    setIsWriting(true);
    setInput(e.target.value);
  }

  function doSubmit() {
    if (input.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    setTodos([...todos, { title: input, id: Math.random() * 10000 }]);
    setInput("");
    setIsWriting(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ color: isWriting ? "red" : "blue" }}>할 일 목록 관리 애플리케이션</h1>
      <p>추가하고 싶은 할 일을 입력하신 후, 아래 버튼을 눌러주세요.</p>
      <input
        onChange={clicked}
        value={input}
        placeholder="예: 프레젠테이션 준비하기"
        style={{ padding: "4px", marginRight: "8px", width: "60%" }}
      />
      <button onClick={doSubmit}>할 일 추가</button>
      <hr />
      {isLoading ? <p>잠시만 기다려 주세요. 데이터를 불러오고 있습니다...</p> : null}
      {todos.length > 0 ? (
        <ul>
          {todos.map(i => (
            <li key={i.id} style={{ background: i.id % 2 === 0 ? "#eef" : "#fee", padding: "4px", marginBottom: "4px" }}>
              {i.title || "제목 없음"} {i.completed ? "✅ 완료됨" : ""}
            </li>
          ))}
        </ul>
      ) : <p>등록된 할 일이 없습니다.</p>}
      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
        <small>버전 0.1 - 실습용으로 간단히 구현된 예제입니다.</small>
      </footer>
    </div>
  );
}
