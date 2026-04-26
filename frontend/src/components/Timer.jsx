import React, { useEffect, useState } from "react";

function Timer({ startTime }) {

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startTime);
      const now = new Date();

      const diff = Math.floor((now - start) / 1000); // seconds

      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = () => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <h3>⏱ {formatTime()}</h3>;
}

export default Timer;