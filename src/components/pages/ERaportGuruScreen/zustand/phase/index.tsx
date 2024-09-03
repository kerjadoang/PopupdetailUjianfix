import {usePhaseStore} from './store';

export const usePhase = () => usePhaseStore((state: IPhase) => state.phase);

export const usePhaseAction = () =>
  usePhaseStore((state: IPhase) => state.actions);
