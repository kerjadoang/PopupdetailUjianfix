import {create} from 'zustand';
import {
  getActivePhaseClass,
  getListPhaseClass,
  setActivePhaseClass,
} from './actions';

const initialState: BaseZustandState<UserPhaseClassState> = {
  activePhaseClass: {},
  listPhaseClass: [],
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useUserPhaseClassStore = create<IUserPhaseClass>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    getListPhaseClass: () => getListPhaseClass(set, get),
    getActivePhaseClass: () => getActivePhaseClass(set, get),
    setActivePhaseClass: (activePhaseClass: IPhaseClass) =>
      setActivePhaseClass(activePhaseClass, set),
    setListPhaseClass: (listPhaseClass: Array<IPhaseClass>) =>
      set({listPhaseClass}),
  },
}));
