// InputComponent.jsx
// 순수하게 presentational component로 작성

const InputComponent = ({ writeTodo, input, doSubmit }) => {
  return (
    <>
      <p>추가하고 싶은 할 일을 입력하신 후, 아래 버튼을 눌러주세요.</p>
      <input
        onChange={writeTodo}
        value={input}
        placeholder="예: 프레젠테이션 준비하기"
        style={{ padding: "4px", marginRight: "8px", width: "60%" }}
      />
      <button onClick={doSubmit}>할 일 추가</button>
      <hr />
    </>
  );
};

export default InputComponent;
