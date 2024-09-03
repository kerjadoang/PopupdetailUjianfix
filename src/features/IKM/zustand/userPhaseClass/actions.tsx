import {apiGet, apiPost} from '@api/wrapping';
import {dismissLoading, showLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';

const getListPhaseClass = async (set: ZustandSet<IUserPhaseClass>) => {
  try {
    showLoading();
    const resData = await apiGet<Array<IPhaseClass>>({
      url: URL_PATH.get_list_phase_class(),
      // tags: 'getListPhaseClass',
    });
    set({listPhaseClass: resData});
  } catch (error) {
  } finally {
    dismissLoading();
  }
};

const getActivePhaseClass = async (set: ZustandSet<IUserPhaseClass>) => {
  try {
    showLoading();
    const resData = await apiGet<IPhaseClass>({
      url: URL_PATH.set_active_phase_class(),
    });
    set({activePhaseClass: resData});
  } catch (error) {
  } finally {
    dismissLoading();
  }
};

const setActivePhaseClass = async (
  activePhaseClass: IPhaseClass,
  set: ZustandSet<IUserPhaseClass>,
) => {
  try {
    showLoading();
    const body: IReqSetActivePhaseClass = {
      phase_id: activePhaseClass?.id || 0,
    };
    await apiPost({
      url: URL_PATH.set_active_phase_class(),
      body,
      // tags: 'getActivePhaseClass'
    });
    // rdxDispatch(fetchGetSubjectsByClass());
    // rdxDispatch(fetchGetSubjectsByUserClass());
    // rdxDispatch(fetchGetSubjectsFavorite());
  } catch (error) {
  } finally {
    set({activePhaseClass});
    dismissLoading();
  }
};

export {getListPhaseClass, setActivePhaseClass, getActivePhaseClass};
