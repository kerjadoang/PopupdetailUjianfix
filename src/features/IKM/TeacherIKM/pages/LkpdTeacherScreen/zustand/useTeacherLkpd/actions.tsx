import {
  getCheckedLKPD,
  getScheduleLKPD,
} from '@features/IKM/services/lkpdServices';
import {LKPD_DEFAULT_OFFSET} from './store';
import {
  removeDuplicatesByKey,
  removeEmptyProperty,
} from '@constants/functional';
const getDataChecked = async (
  body: IReqCheckedLKPD,
  set: ZustandSet<IUseTeacherLkpd>,
) => {
  try {
    const resData = await getCheckedLKPD(body);
    if (body.offset === LKPD_DEFAULT_OFFSET.offset) {
      set({dataChecked: resData});
      return;
    }

    return set(state => ({
      ...state,
      dataChecked: {
        total_rows: resData?.total_rows,
        list: removeDuplicatesByKey(
          [...(state.dataChecked.list || []), ...(resData?.list || [])],
          'id',
        ),
      },
    }));
  } catch (error) {
    if (body.offset === LKPD_DEFAULT_OFFSET.offset) {
      const emptyData = {total_rows: 0, list: []};
      const newState = removeEmptyProperty({
        dataChecked: body.currentType === 'Checked' ? emptyData : undefined,
        dataSchedule: body.currentType === 'Schedule' ? emptyData : undefined,
      }) as Partial<UseTeacherLkpdState>;

      set(() => ({...newState}));
      return;
    }
  }
};

const getDataSchedule = async (
  body: IReqScheduleLKPD,
  set: ZustandSet<IUseTeacherLkpd>,
) => {
  try {
    const resData = await getScheduleLKPD(body);
    if (body.offset == LKPD_DEFAULT_OFFSET.offset) {
      set({dataSchedule: resData});
      return;
    }

    return set(state => ({
      ...state,
      dataSchedule: {
        total_rows: resData?.total_rows,
        list: removeDuplicatesByKey(
          [...(state.dataSchedule.list || []), ...(resData?.list || [])],
          'id',
        ),
      },
    }));
  } catch (error) {
    if (body.offset === LKPD_DEFAULT_OFFSET.offset) {
      const emptyData = {total_rows: 0, list: []};
      const newState = removeEmptyProperty({
        dataChecked: body.currentType === 'Checked' ? emptyData : undefined,
        dataSchedule: body.currentType === 'Schedule' ? emptyData : undefined,
      }) as Partial<UseTeacherLkpdState>;

      set(() => ({...newState}));
      return;
    }
  }
};

export {getDataChecked, getDataSchedule};
