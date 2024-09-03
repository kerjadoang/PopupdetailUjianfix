import {useTeacherLkpdStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useTeacherLkpdStore(
//     (state: IUseTeacherLkpd) => state.errorMessage,
//   );
// };

export const useTeacherLkpdCurrentTye = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.currentType);
};

export const useTeacherLkpdReqBodyChecked = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.reqBodyChecked);
};

export const useTeacherLkpdDataChecked = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.dataChecked);
};

export const useTeacherLkpdReqBodySchedule = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.reqBodySchedule);
};

export const useTeacherLkpdDataSchedule = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.dataSchedule);
};

export const useTeacherLkpdMode = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.mode);
};

export const useTeacherLkpdSearchSchedule = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.searchSchedule);
};

export const useTeacherLkpdSearchChecked = () => {
  return useTeacherLkpdStore((state: IUseTeacherLkpd) => state.searchChecked);
};

// 🎉 one selector for all our actions
export const useTeacherLkpdActions = () =>
  useTeacherLkpdStore((state: IUseTeacherLkpd) => state.actions);
