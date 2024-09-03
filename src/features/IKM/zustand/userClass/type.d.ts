interface UserClassAction {
  getListClass: Callback<Promise<void>>;
  setListClass: Callback<void, Array<IClass>>;
  setActiveClass: CallbackW<void, IClass>;
  setActiveClassWithoutApi: CallbackW<void, IClass>;
  getActiveClass: Callback<void, IClass>;
}

interface UserClassState {
  activeClass: IClass;
  listClass: Array<IClass>;
}

type IUserClass = BaseZustandAction<UserClassAction> &
  BaseZustandState<UserClassState>;

interface IClass {
  id?: number;
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

interface IReqSetActiveClass {
  phase_id: number;
}
