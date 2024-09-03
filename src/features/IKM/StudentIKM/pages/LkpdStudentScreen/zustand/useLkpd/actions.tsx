import {
  getHistoryLKPD,
  getScheduleLKPD,
} from '@features/IKM/services/lkpdServices';
import {LKPD_DEFAULT_OFFSET} from './store';
import {dismissLoading, showLoading, sleep} from '@constants/functional';
type DynamicObject = {
  [key: string]: any;
};

function removeDuplicatesByKey<T extends DynamicObject>(
  arr: T[],
  key: keyof T & string,
): T[] {
  return arr.filter(
    (obj, index, array) => array.findIndex(o => o[key] === obj[key]) === index,
  );
}

const getDataHistory = async (
  body: IReqHistoryLKPD,
  set: ZustandSet<IUseLkpd>,
) => {
  try {
    await sleep(50);
    showLoading();
    const resData = await getHistoryLKPD(body);
    if (body.offset == LKPD_DEFAULT_OFFSET.offset) {
      set({dataHistory: resData});
      return;
    }

    return set(state => ({
      ...state,
      dataHistory: {
        total_rows: resData?.total_rows,
        list: removeDuplicatesByKey(
          [...(state.dataHistory.list || []), ...(resData?.list || [])],
          'id',
        ),
      },
    }));
  } catch (error) {
  } finally {
    dismissLoading();
  }
};

const getDataSchedule = async (
  body: IReqScheduleLKPD,
  set: ZustandSet<IUseLkpd>,
) => {
  try {
    await sleep(50);
    showLoading();
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
  } finally {
    dismissLoading();
  }
};

export {getDataHistory, getDataSchedule};
