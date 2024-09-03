import {create} from 'zustand';

const initialState: BaseZustandState<SearchModalState> = {
  showModal: false,
  subjectData: '',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useSearchModalStore = create<ISearchModal>()(set => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    setShowModal: (showModal: boolean) => set({showModal}),
    setSubjectData: (subjectData: boolean) => set({subjectData}),
    resetState: () => set(initialState),
  },
}));
