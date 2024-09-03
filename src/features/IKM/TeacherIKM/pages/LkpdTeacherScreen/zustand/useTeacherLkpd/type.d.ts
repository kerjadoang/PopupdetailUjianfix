interface UseTeacherLkpdAction {
  getDataChecked: CallBack<void>;
  setReqBodyChecked: CallBackWithParams<void, Partial<IReqCheckedLKPD>>;
  getDataSchedule: CallBack<void>;
  setReqBodySchedule: CallBackWithParams<void, Partial<IReqScheduleLKPD>>;
  setSearch: CallBackWith2Params<void, string, ILKPDType>;
  setMode: CallBackWithParams<void, ILKPDMode>;
  setUserRole: CallBackWithParams<void, UserRole>;
  setCurrentType: CallBackWithParams<void, ILKPDType>;
  resetSearch: CallBackWithParams<void, ILKPDType>;
}

interface UseTeacherLkpdState {
  dataChecked: IResCheckedLKPD;
  reqBodyChecked: IReqCheckedLKPD;
  dataSchedule: IResScheduleLKPD;
  reqBodySchedule: IReqScheduleLKPD;
  searchChecked: string;
  searchSchedule: string;
  mode: ILKPDMode;
  userRole: UserRole;
  currentType: ILKPDType;
}

type IUseTeacherLkpd = BaseZustandAction<UseTeacherLkpdAction> &
  BaseZustandState<UseTeacherLkpdState>;

type ILKPDMode = 'search' | 'default' | 'filter mapel';

interface IReqLKPDData {
  search: '';
}
