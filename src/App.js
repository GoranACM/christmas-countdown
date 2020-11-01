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
      <div className='interval'>
        <span>
          {timeLeft[interval]} <br /> {interval}{' '}
        </span>
      </div>
    );
  });

  return (
    <main>
      {/* <div className='container'> */}
      <svg viewBox='0 0 500 200'>
        <path
          id='curve'
          d='M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97'
        />
        <text width='500'>
          <textPath href='#curve'>Christmas {year} countdown</textPath>
        </text>
      </svg>
      <div className='timer'>
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>MERRY CHRISTMAS!</span>
        )}
      </div>
      {/* <div className='title'><h1>Christmas {year} countdown</h1></div> */}
      {/* </div> */}
    </main>
  );
}

export default App;
