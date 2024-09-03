import {useTeacherHistoryLkpdStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useTeacherHistoryLkpdStore(
//     (state: IUseTeacherHistoryLkpd) => state.errorMessage,
//   );
// };

export const useTeacherHistoryLkpdReqBodyHistory = () => {
  return useTeacherHistoryLkpdStore(
    (state: IUseTeacherHistoryLkpd) => state.reqBodyHistory,
  );
};

export const useTeacherHistoryLkpdDataHistory = () => {
  return useTeacherHistoryLkpdStore(
    (state: IUseTeacherHistoryLkpd) => state.dataHistory,
  );
};

export const useTeacherHistoryLkpdMode = () => {
  return useTeacherHistoryLkpdStore(
    (state: IUseTeacherHistoryLkpd) => state.mode,
  );
};

export const useTeacherHistoryLkpdSearch = () => {
  return useTeacherHistoryLkpdStore(
    (state: IUseTeacherHistoryLkpd) => state.search,
  );
};

// 🎉 one selector for all our actions
export const useTeacherHistoryLkpdActions = () =>
  useTeacherHistoryLkpdStore((state: IUseTeacherHistoryLkpd) => state.actions);
