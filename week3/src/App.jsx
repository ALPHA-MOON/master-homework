import React, { Suspense } from "react";
import TodoListContainer from "./containers/TodoListContainer";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <ErrorBoundary
        fallback={<p>데이터를 불러오는 중 문제가 발생했습니다.</p>}
      >
        <Suspense
          fallback={<p>잠시만 기다려 주세요. 데이터를 불러오고 있습니다...</p>}
        >
          <TodoListContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
