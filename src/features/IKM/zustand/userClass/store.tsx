import {create} from 'zustand';
import {getListClass, setActiveClass} from './actions';

const initialState: BaseZustandState<UserClassState> = {
  activeClass: {},
  listClass: [],
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useUserClassStore = create<IUserClass>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    getListClass: () => getListClass(set, get),
    getActiveClass: () => {},
    setActiveClass: (activeClass: IClass) => setActiveClass(activeClass, set),
    setActiveClassWithoutApi: (activeClass: IClass) => set({activeClass}),
    setListClass: (listClass: Array<IClass>) => set({listClass}),
  },
}));
