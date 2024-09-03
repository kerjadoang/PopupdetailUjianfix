interface UseLkpdAction {
  getDataHistory: CallBack<void>;
  getDataSchedule: CallBack<void>;
  setSearch: CallBackWithParams<void, string>;
  setMode: CallBackWithParams<void, ILKPDMode>;
  setReqBodyHistory: CallBackWithParams<void, Partial<IReqHistoryLKPD>>;
  setReqBodySchedule: CallBackWithParams<void, Partial<IReqScheduleLKPD>>;
  setUserRole: CallBackWithParams<void, UserRole>;
}

interface UseLkpdState {
  dataHistory: IResHistoryLKPD;
  dataSchedule: IResScheduleLKPD;
  reqBodyHistory: IReqHistoryLKPD;
  reqBodySchedule: IReqScheduleLKPD;
  search: string;
  mode: ILKPDMode;
  userRole: UserRole;
}

type IUseLkpd = BaseZustandAction<UseLkpdAction> &
  BaseZustandState<UseLkpdState>;

type ILKPDMode = 'search' | 'default' | 'filter mapel';

interface IReqLKPDData {
  search: '';
}
