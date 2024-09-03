import {useUserPhaseClassStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useUserPhaseClassStore(
//     (state: IUserPhaseClass) => state.errorMessage,
//   );
// };

export const useActivePhaseClass = () => {
  return useUserPhaseClassStore(
    (state: IUserPhaseClass) => state.activePhaseClass,
  );
};

export const useListPhaseClass = () => {
  return useUserPhaseClassStore(
    (state: IUserPhaseClass) => state.listPhaseClass,
  );
};

// 🎉 one selector for all our actions
export const useUserPhaseClassActions = () =>
  useUserPhaseClassStore((state: IUserPhaseClass) => state.actions);
