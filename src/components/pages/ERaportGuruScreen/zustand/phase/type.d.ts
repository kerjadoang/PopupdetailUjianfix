interface PhaseAction {
  setPhase: (data: PhaseType) => void;
}

interface PhaseState {
  phase: PhaseType;
}

interface PhaseType {
  id: number;
  type: string;
}

type IPhase = BaseZustandAction<PhaseAction> & BaseZustandState<PhaseState>;
