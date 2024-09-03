import {create} from 'zustand';
import {getDataHistory, getDataSchedule} from './actions';
import {defaultLimitOffset} from '@constants/functional';

export const LKPD_DEFAULT_OFFSET = defaultLimitOffset(5, 0);

const initialReqBody: IReqScheduleLKPD = {
  ...LKPD_DEFAULT_OFFSET,
  userRole: 'MURID',
  search: '',
  type: ['LKPD'],
};

const initialState: BaseZustandState<UseLkpdState> = {
  dataHistory: {},
  dataSchedule: {},
  reqBodyHistory: initialReqBody,
  reqBodySchedule: initialReqBody,
  mode: 'default',
  search: '',
  userRole: 'MURID',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useLkpdStore = create<IUseLkpd>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    getDataHistory: () => getDataHistory(get().reqBodyHistory, set),
    getDataSchedule: () => getDataSchedule(get().reqBodySchedule, set),
    setReqBodyHistory: (reqBodyHistory: Partial<IReqHistoryLKPD>) =>
      set({reqBodyHistory: {...get().reqBodyHistory, ...reqBodyHistory}}),
    setReqBodySchedule: (reqBodySchedule: Partial<IReqScheduleLKPD>) =>
      set({reqBodySchedule: {...get().reqBodySchedule, ...reqBodySchedule}}),
    setMode: (mode: ILKPDMode) => set({mode}),
    setSearch: (search: string) => set({search}),
    setUserRole: (userRole: UserRole) => set({userRole}),
  },
}));
