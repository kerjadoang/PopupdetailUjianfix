import {useUserCurriculumStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useUserCurriculumStore(
//     (state: IUserCurriculum) => state.errorMessage,
//   );
// };

export const useActiveCurriculum = () => {
  return useUserCurriculumStore(
    (state: IUserCurriculum) => state.activeCurriculum,
  );
};

export const useListCuriculum = () => {
  return useUserCurriculumStore(
    (state: IUserCurriculum) => state.listCurriculum,
  );
};

// 🎉 one selector for all our actions
export const useUserCurriculumActions = () =>
  useUserCurriculumStore((state: IUserCurriculum) => state.actions);
