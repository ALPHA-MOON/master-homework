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
