// ErrorBoundary.jsx
// useEffect를 사용해서 window.addEventListener를 사용해서 에러를 처리
// 에러가 발생하면 에러 메시지를 출력하고 에러 메시지를 콘솔에 출력
// 에러가 발생하지 않으면 children을 반환

import { useState, useEffect } from "react";

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (err) => {
      setHasError(true);
      setError(err);
      alert("데이터를 불러오는 중 문제가 발생했습니다.");
      console.log(error);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
};

export default ErrorBoundary;
