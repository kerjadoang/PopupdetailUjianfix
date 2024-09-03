interface UserPhaseClassAction {
  getListPhaseClass: Callback<Promise<void>>;
  setListPhaseClass: Callback<void, Array<IPhaseClass>>;
  setActivePhaseClass: Callback<void, IPhaseClass>;
  getActivePhaseClass: Callback<void, IPhaseClass>;
}

interface UserPhaseClassState {
  activePhaseClass: IPhaseClass;
  listPhaseClass: Array<IPhaseClass>;
}

type IUserPhaseClass = BaseZustandAction<UserPhaseClassAction> &
  BaseZustandState<UserPhaseClassState>;

interface IPhaseClass {
  id?: number;
  curriculum_id?: number;
  degree_id?: number;
  major_id?: number;
  name?: string;
  order?: number;
  degree?: Degree;
  major?: Major;
}

interface Degree {
  id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
}

interface Major {
  id?: number;
  name?: string;
}

interface IReqSetActivePhaseClass {
  phase_id: number;
}
