import {useSearchModalStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useSearchModalStore(
//     (state: ISearchModal) => state.errorMessage,
//   );
// };
export const useSearchShowModal = () => {
  return useSearchModalStore((state: ISearchModal) => state.showModal);
};

// 🎉 one selector for all our actions
export const useSearchModalActions = () =>
  useSearchModalStore((state: ISearchModal) => state.actions);
