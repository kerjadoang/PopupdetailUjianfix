import {apiGet, apiPut} from '@api/wrapping';
import {getHomeSubject} from '@components/pages/HomeScreen/utils';
import {dismissLoading, showLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';

const getListClass = async (set: ZustandSet<IUserClass>) => {
  try {
    // showLoading();
    const resData = await apiGet<Array<IClass>>({
      url: URL_PATH.get_list_phase_class(),
      // tags: 'getListClass',
    });
    set({listClass: resData});
  } catch (error) {
  } finally {
    // dismissLoading();
  }
};

const setActiveClass = async (
  activeClass: IClass,
  set: ZustandSet<IUserClass>,
) => {
  try {
    showLoading();
    await apiPut({
      url: URL_PATH.put_edit_class(activeClass.id || 0),
    });
    getHomeSubject(activeClass.id);

    // set({activeClass})
    // rdxDispatch(fetchGetSubjectsByClass());
    // rdxDispatch(fetchGetSubjectsByUserClass());
    // rdxDispatch(fetchGetSubjectsFavorite());
  } catch (error) {
  } finally {
    set({activeClass});
    dismissLoading();
  }
};

export {getListClass, setActiveClass};
