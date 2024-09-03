import {calculateTimerLeft} from '@components/atoms/HeaderQuestion/utils';
import {convertDate, deepClone, remainingDuration} from '@constants/functional';
import {create} from 'zustand';
const initRemainDuration = {remainDuration: ''};
const initialState: BaseZustandState<CountdownV2State> = {
  countDown: -1,
  isPaused: false,
  isFinish: false,
  resetTimer: true,
  remainDuration: initRemainDuration,
  endTime: '',
  startTime: '',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useCountdownV2Store = create<ICountdownV2>()((set, get) => ({
  ...deepClone(initialState),
  // ⬇️ separate "namespace" for actions
  actions: {
    setIsPaused: (isPaused: boolean) => {
      set({isPaused});
      if (!isPaused) {
        get().actions.startTimer(get().countDown);
      }
    },
    startTimer: (newCountdown: number) => {
      if (newCountdown === 0) {
        return;
      }

      set({resetTimer: false, timerRef: undefined});
      if (get().isFinish || get().isPaused) {
        set({isFinish: false});
      }

      const oneSec = 1000; // milliseconds
      const timer = setInterval(async () => {
        if (get().resetTimer) {
          clearInterval(timer);
          return;
        }

        const remainDuration = remainingDuration({
          remainDuration: {seconds: newCountdown.toString()},
        });

        if (newCountdown === 0 || get().isFinish) {
          set({
            countDown: newCountdown,
            remainDuration: remainDuration,
            // isFinish: true,
          });
          clearInterval(timer);
          // Emit CountdownTimerFinish event
          return;
        }
        if (get().isPaused) {
          set({countDown: newCountdown, remainDuration: remainDuration});
          clearInterval(timer);
          // Emit CountdownTimerPaused event
          return;
        }

        set({
          countDown: newCountdown,
          remainDuration: remainDuration,
        });
        newCountdown--;
      }, oneSec);
      set({timerRef: timer});
    },
    setIsFinish: (isFinish: boolean) => {
      set({isFinish});
      if (isFinish) {
        clearInterval(get().timerRef);
      }
    },
    setCountdown: (countDown: number) => set({countDown}),
    setEndTime: (endTime: string) => set({endTime}),
    setRemainDuration: remainDuration => set({remainDuration}),
    resetState: () => set(initialState),
    updateTimer: async (newCountDown?: number) => {
      set({
        ...initialState,
        countDown: get().countDown,
        remainDuration: get().remainDuration,
        endTime: get().endTime,
        startTime: get().startTime,
      });

      const realTimeLeft = calculateTimerLeft(
        convertDate(get().endTime),
        convertDate(),
      );
      clearInterval(get().timerRef);

      get().actions.startTimer(newCountDown ?? realTimeLeft);
    },
  },
}));
