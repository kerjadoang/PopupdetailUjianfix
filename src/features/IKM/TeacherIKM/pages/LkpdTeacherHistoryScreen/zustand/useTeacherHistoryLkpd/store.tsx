import {defaultLimitOffset} from '@constants/functional';
import {create} from 'zustand';
import {getDataHistory} from './actions';

export const LKPD_DEFAULT_OFFSET = defaultLimitOffset(5, 0);

const initialReqBody: IReqScheduleLKPD = {
  ...LKPD_DEFAULT_OFFSET,
  userRole: 'GURU',
  search: '',
  type: ['LKPD'],
};

const initialState: BaseZustandState<UseTeacherHistoryLkpdState> = {
  dataHistory: {},
  reqBodyHistory: initialReqBody,
  mode: 'default',
  search: '',
  userRole: 'GURU',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useTeacherHistoryLkpdStore = create<IUseTeacherHistoryLkpd>()(
  (set, get) => ({
    ...initialState,
    // ⬇️ separate "namespace" for actions
    actions: {
      resetState: () => set(initialState),
      getDataHistory: () => getDataHistory(get().reqBodyHistory, set),
      setReqBodyHistory: (reqBodyHistory: Partial<IReqHistoryLKPD>) => {
        return set({
          reqBodyHistory: {...get().reqBodyHistory, ...reqBodyHistory},
        });
      },
      setMode: (mode: ILKPDMode) => set({mode}),
      setSearch: (search: string) => set({search}),
      setUserRole: (userRole: UserRole) => set({userRole}),
    },
  }),
);
