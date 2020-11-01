import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    let difference = +new Date(`12/25/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <>
      <div>
        <h1>Christmas {year} countdown</h1>
      </div>
      <div>
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>MERRY CHRISTMAS!</span>
        )}
      </div>
    </>
  );
}

export default App;
