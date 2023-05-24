import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = ({ path = "login" }) => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => --c);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="Text-center">Redirecting in {count} second </h1>
      <progress className="progress w-56 my-7"></progress>
      <p className="text-sm">Hold on...</p>
    </div>
  );
};

export default Loading;
