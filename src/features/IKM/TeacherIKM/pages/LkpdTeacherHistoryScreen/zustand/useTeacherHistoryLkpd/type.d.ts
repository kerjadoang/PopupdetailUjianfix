interface UseTeacherHistoryLkpdAction {
  getDataHistory: CallBack<void>;
  setReqBodyHistory: CallBackWithParams<void, Partial<IReqHistoryLKPD>>;
  setSearch: CallBackWithParams<void, string>;
  setMode: CallBackWithParams<void, ILKPDMode>;
  setUserRole: CallBackWithParams<void, UserRole>;
}

interface UseTeacherHistoryLkpdState {
  dataHistory: IResHistoryLKPD;
  reqBodyHistory: IReqHistoryLKPD;
  search: string;
  mode: ILKPDMode;
  userRole: UserRole;
}

type IUseTeacherHistoryLkpd = BaseZustandAction<UseTeacherHistoryLkpdAction> &
  BaseZustandState<UseTeacherHistoryLkpdState>;

type ILKPDMode = 'search' | 'default' | 'filter mapel';

interface IReqLKPDData {
  search: '';
}
