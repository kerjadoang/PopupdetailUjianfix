import {defaultLimitOffset, removeEmptyProperty} from '@constants/functional';
import {create} from 'zustand';
import {getDataChecked, getDataSchedule} from './actions';

export const LKPD_DEFAULT_OFFSET = defaultLimitOffset(5, 0);

const initialReqBody: IReqScheduleLKPD = {
  ...LKPD_DEFAULT_OFFSET,
  userRole: 'GURU',
  search: '',
  type: ['LKPD'],
};

const initialState: BaseZustandState<UseTeacherLkpdState> = {
  dataChecked: {},
  dataSchedule: {},
  reqBodyChecked: initialReqBody,
  reqBodySchedule: initialReqBody,
  mode: 'default',
  searchSchedule: '',
  searchChecked: '',
  userRole: 'GURU',
  currentType: 'Checked',
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useTeacherLkpdStore = create<IUseTeacherLkpd>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    getDataChecked: () => getDataChecked(get().reqBodyChecked, set),
    setReqBodyChecked: (reqBodyChecked: Partial<IReqCheckedLKPD>) => {
      return set({
        reqBodyChecked: {
          ...get().reqBodyChecked,
          ...reqBodyChecked,
          currentType: get().currentType,
        },
      });
    },
    getDataSchedule: () => getDataSchedule(get().reqBodySchedule, set),
    setReqBodySchedule: (reqBodySchedule: Partial<IReqScheduleLKPD>) =>
      set({
        reqBodySchedule: {
          ...get().reqBodySchedule,
          ...reqBodySchedule,
          currentType: get().currentType,
        },
      }),
    setMode: (mode: ILKPDMode) => set({mode}),
    setSearch: (search: string, type: ILKPDType) => {
      if (type === 'Checked') {
        return set({searchChecked: search});
      }
      return set({searchSchedule: search});
    },
    setUserRole: (userRole: UserRole) => set({userRole}),
    setCurrentType: (currentType: ILKPDType) => set({currentType}),
    resetSearch: currentType => {
      const newState = removeEmptyProperty({
        search: '',
        reqBodySchedule:
          currentType === 'Schedule'
            ? {...get().reqBodySchedule, search: ''}
            : undefined,
        reqBodyChecked:
          currentType === 'Schedule'
            ? {...get().reqBodyChecked, search: ''}
            : undefined,
      }) as Partial<UseTeacherLkpdState>;
      return set(state => ({...state, ...newState}));
    },
  },
}));
