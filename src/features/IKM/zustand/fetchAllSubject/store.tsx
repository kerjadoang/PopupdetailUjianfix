import {useGetAllSubject} from '@services/lms';
import {create} from 'zustand';

const initialState: BaseZustandState<FetchAllSubjectState> = {
  subjects: [],
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useFetchAllSubjectStore = create<IFetchAllSubject>()(
  (set, get) => ({
    ...initialState,
    // ⬇️ separate "namespace" for actions
    actions: {
      getAllSubject: async reqAllSubject => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const subjects = await useGetAllSubject(reqAllSubject);
        get().actions.setSubjects(subjects || []);
      },
      setSubjects: subjects => set({subjects}),
      resetState: () => set(initialState),
    },
  }),
);
