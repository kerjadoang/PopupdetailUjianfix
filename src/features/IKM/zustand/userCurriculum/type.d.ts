interface UserCurriculumAction {
  setActiveCurriculum: CallBackWithParams<void, ICurriculum>;
  getListCurriculum: CallBack<void>;
  getActiveCurriculum: CallBack<void>;
  setListCurriculum: CallBack<void, Array<ICurriculum>>;
}

interface UserCurriculumState {
  activeCurriculum: ICurriculum;
  listCurriculum: Array<ICurriculum>;
}

type IUserCurriculum = BaseZustandAction<UserCurriculumAction> &
  BaseZustandState<UserCurriculumState>;

interface ICurriculum {
  id?: number;
  name?: string;
  value?: any;
}

interface IReqSetActiveCurriculum {
  curriculum_id: number;
}
