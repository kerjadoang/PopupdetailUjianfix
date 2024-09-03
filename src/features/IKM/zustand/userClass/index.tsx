import {useUserClassStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useUserClassStore(
//     (state: IUserClass) => state.errorMessage,
//   );
// };

export const useActiveClass = () => {
  return useUserClassStore((state: IUserClass) => state.activeClass);
};

export const useListClass = () => {
  return useUserClassStore((state: IUserClass) => state.listClass);
};

// 🎉 one selector for all our actions
export const useUserClassActions = () =>
  useUserClassStore((state: IUserClass) => state.actions);
