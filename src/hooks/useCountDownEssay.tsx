import {useEffect, useState} from 'react';

const useCountdownEssay = (targetDate: any, isPaused: any, isContinue: any) => {
  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() - new Date().getTime(),
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

      return () => clearInterval(interval);
    }
    setCountDown(countDown);
  }, [countDown, isPaused, isContinue]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  hours = (hours < 1 ? '00' : hours < 10 ? `0${hours}` : hours) as number;
  minutes = (
    minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes
  ) as number;
  seconds = (
    seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds
  ) as number;

  return {days, hours, minutes, seconds, countDown};
};

export {useCountdownEssay};
