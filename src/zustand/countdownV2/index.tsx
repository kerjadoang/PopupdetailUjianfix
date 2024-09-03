import {useCountdownV2Store} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useCountdownV2Store(
//     (state: ICountdownV2) => state.errorMessage,
//   );
// };

export const useCountdownV2 = () => {
  return useCountdownV2Store((state: ICountdownV2) => state.countDown);
};

export const useCountdownV2RemainDuration = () => {
  return useCountdownV2Store((state: ICountdownV2) => state.remainDuration);
};

export const useCountdownV2IsPaused = () => {
  return useCountdownV2Store((state: ICountdownV2) => state.isPaused);
};
export const useCountdownV2IsFinish = () => {
  return useCountdownV2Store((state: ICountdownV2) => state.isFinish);
};

// 🎉 one selector for all our actions
export const useCountdownV2Actions = () =>
  useCountdownV2Store((state: ICountdownV2) => state.actions);
