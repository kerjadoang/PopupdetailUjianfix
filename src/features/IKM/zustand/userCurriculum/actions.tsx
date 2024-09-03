import {apiGet, apiPost} from '@api/wrapping';
import {dismissLoading, showLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';

const getActiveCurriculum = async (set: ZustandSet<IUserCurriculum>) => {
  try {
    const resData = await apiGet<ICurriculum>({
      url: URL_PATH.post_set_active_curiculum(),
      // tags: 'getActiveCuriculum',
    });
    set({activeCurriculum: resData});
  } catch (error) {
  } finally {
  }
};

const getListCurriculum = async (set: ZustandSet<IUserCurriculum>) => {
  try {
    const resData = await apiGet<Array<ICurriculum>>({
      url: URL_PATH.get_curiculums(),
      //   tags: 'getListCurriculum',
    });
    set({listCurriculum: resData});
  } catch (error) {
  } finally {
  }
};

const setActiveCurriculum = async (
  activeCurriculum: ICurriculum,
  set: ZustandSet<IUserCurriculum>,
) => {
  try {
    showLoading();
    const body: IReqSetActiveCurriculum = {
      curriculum_id: activeCurriculum.id || 0,
    };

    await apiPost({
      url: URL_PATH.post_set_active_curiculum(),
      body,
      // tags: 'setActiveCurriculum',
    });
  } catch (error) {
  } finally {
    set({activeCurriculum});
    dismissLoading();
  }
};

export {setActiveCurriculum, getListCurriculum, getActiveCurriculum};
