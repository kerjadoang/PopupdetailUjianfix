import {useDetailSoalListStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useDetailSoalListStore(
//     (state: IDetailSoalList) => state.errorMessage,
//   );
// };
export const useDetailSoalListMode = () => {
  return useDetailSoalListStore((state: IDetailSoalList) => state.mode);
};

export const useDetailRawSoalList = () => {
  return useDetailSoalListStore((state: IDetailSoalList) => state.rawSoalList);
};

export const useDetailSoalList = () => {
  return useDetailSoalListStore((state: IDetailSoalList) => state.soalList);
};

// 🎉 one selector for all our actions
export const useDetailSoalListActions = () =>
  useDetailSoalListStore((state: IDetailSoalList) => state.actions);
