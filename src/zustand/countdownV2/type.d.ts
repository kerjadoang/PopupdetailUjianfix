interface CountdownV2Action {
  setIsFinish: CallBackWithParams<void, boolean>;
  setIsPaused: CallBackWithParams<void, boolean>;
  startTimer: CallBackWithParams<void, number>;
  updateTimer: CallBackWithParams<void, number | undefined>;
  setCountdown: CallBackWithParams<void, number>;
  setEndTime: CallBackWithParams<void, string>;
  setStartTime: CallBackWithParams<void, string>;
  setRemainDuration: CallBackWithParams<void, RemainingDuration>;
}

interface CountdownV2State {
  isFinish: boolean;
  isPaused: boolean;
  countDown: number;
  resetTimer: boolean;
  endTime: string;
  startTime: string;
  remainDuration: RemainingDuration;
  timerRef?: any;
}

type ICountdownV2 = BaseZustandAction<CountdownV2Action> &
  BaseZustandState<CountdownV2State>;
