import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const timerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timerId);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {String(min).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}

export default Timer;
