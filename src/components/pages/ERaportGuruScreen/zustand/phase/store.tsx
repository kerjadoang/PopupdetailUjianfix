import {create} from 'zustand';

const initialState: BaseZustandState<PhaseState> = {
  phase: {
    id: 0,
    type: '',
  },
};

export const usePhaseStore = create<IPhase>()(set => ({
  ...initialState,
  actions: {
    setPhase: (data: PhaseType) => {
      set({phase: data});
    },
    resetState: () => set(initialState),
  },
}));
