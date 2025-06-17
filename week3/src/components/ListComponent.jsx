// ListComponent.jsx
// 순수하게 presentational component로 작성
// 데이터를 받아서 보여주는 로직은 포함

const ListComponent = ({ todos }) => {
  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((i) => (
            <li
              key={i.id}
              style={{
                background: i.id % 2 === 0 ? "#eef" : "#fee",
                padding: "4px",
                marginBottom: "4px",
              }}
            >
              {i.title || "제목 없음"} {i.completed ? "✅ 완료됨" : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p>등록된 할 일이 없습니다.</p>
      )}
    </>
  );
};

export default ListComponent;
