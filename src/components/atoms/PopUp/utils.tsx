const startCountdown = (
  refCountdown: React.MutableRefObject<NodeJS.Timer | undefined>,
  currentCountdown: number,
  setCountdown: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (currentCountdown == 0) {
    return;
  }
  const cd: NodeJS.Timer = setInterval(() => {
    setCountdown(prevState => {
      if (prevState <= 0) {
        clearInterval(refCountdown.current);
        return 0;
      }
      return prevState - 1;
    });
  }, currentCountdown * 330);
  refCountdown.current = cd;
};

const stopCountdown = (
  refCountdown: React.MutableRefObject<NodeJS.Timer | undefined>,
  setCountdown: React.Dispatch<React.SetStateAction<number>>,
) => {
  clearInterval(refCountdown.current);
  setCountdown(0);
  refCountdown.current = undefined;
};

export {startCountdown, stopCountdown};
