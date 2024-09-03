import {useEffect, useState} from 'react';

const useCountdown = (
  targetDate: any,
  isPaused: any,
  isContinue?: any,
  stopInterval?: boolean,
  startDate?: any,
) => {
  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() -
      (startDate ? new Date(startDate).getTime() : new Date().getTime()),
  );

  useEffect(() => {
    if (!isPaused) {
      let interval: any;

      if (isContinue) {
        interval = setInterval(() => {
          setCountDown(countDown - 1000);
        }, 1000);
      } else {
        interval = setInterval(() => {
          setCountDown(targetDate - new Date().getTime());
        }, 1000);
      }

      if (countDown < 1) {
        clearInterval(interval);
      }

      if (stopInterval) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }

    setCountDown(countDown);
  }, [isPaused, isContinue, countDown, stopInterval, targetDate]);

  return {...getReturnValues(countDown), setCountDown};
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  minutes = (
    minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes
  ) as number;
  let seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  seconds = (
    seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds
  ) as number;

  return {days, hours, minutes, seconds, countDown};
};

export {useCountdown};
