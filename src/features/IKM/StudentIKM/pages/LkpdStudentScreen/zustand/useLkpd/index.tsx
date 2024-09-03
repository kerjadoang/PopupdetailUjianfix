import {useLkpdStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useUseLkpdStore(
//     (state: IUseLkpd) => state.errorMessage,
//   );
// };

export const useLkpdReqBodySchedule = () => {
  return useLkpdStore((state: IUseLkpd) => state.reqBodySchedule);
};

export const useLkpdReqBodyHistory = () => {
  return useLkpdStore((state: IUseLkpd) => state.reqBodyHistory);
};

export const useLkpdDataHistory = () => {
  return useLkpdStore((state: IUseLkpd) => state.dataHistory);
};

export const useLkpdDataSchedule = () => {
  return useLkpdStore((state: IUseLkpd) => state.dataSchedule);
};

export const useLkpdMode = () => {
  return useLkpdStore((state: IUseLkpd) => state.mode);
};

export const useLkpdSearch = () => {
  return useLkpdStore((state: IUseLkpd) => state.search);
};

// 🎉 one selector for all our actions
export const useLkpdActions = () =>
  useLkpdStore((state: IUseLkpd) => state.actions);
