import {useFetchAllSubjectStore} from './store';

// Example :
// export const useErrorMessage = () => {
//   return useFetchAllSubjectStore(
//     (state: IFetchAllSubject) => state.errorMessage,
//   );
// };

export const useAllSubjects = () => {
  return useFetchAllSubjectStore((state: IFetchAllSubject) => state.subjects);
};

// 🎉 one selector for all our actions
export const useFetchAllSubjectActions = () =>
  useFetchAllSubjectStore((state: IFetchAllSubject) => state.actions);
