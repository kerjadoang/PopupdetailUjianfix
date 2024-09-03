import {create} from 'zustand';
import {
  getActiveCurriculum,
  getListCurriculum,
  setActiveCurriculum,
} from './actions';

const initialState: BaseZustandState<UserCurriculumState> = {
  listCurriculum: [],
  activeCurriculum: {},
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useUserCurriculumStore = create<IUserCurriculum>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    getListCurriculum: () => getListCurriculum(set, get),
    getActiveCurriculum: () => getActiveCurriculum(set, get),
    setActiveCurriculum: (activeCurriculum: ICurriculum) =>
      setActiveCurriculum(activeCurriculum, set),
    setListCurriculum: (listCurriculum: Array<ICurriculum>) =>
      set({listCurriculum}),
  },
}));
