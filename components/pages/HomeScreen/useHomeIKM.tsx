import {apiGet} from '@api/wrapping';
import {
  _handleUserTypeId,
  isStringContains,
  showErrorToast,
} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {
  useActiveClass,
  useActiveCurriculum,
  useActivePhaseClass,
  useListClass,
  useListCuriculum,
  useListPhaseClass,
  useUserClassActions,
  useUserCurriculumActions,
  useUserPhaseClassActions,
} from '@features/IKM/zustand';
import {useDisclosure} from '@hooks/useDisclosure';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {PDFViewerIKMScreenParam} from 'type/screen';
type generalContentFlag =
  | 'info_ikm'
  | 'buku_saku_ikm'
  | 'profil_pelajar_pancasila_ikm';

const useHomeIKM = () => {
  const {navigateScreen} = useNavigate();
  const {isVisible: showActivePhase, toggle: toggleActivePhase} =
    useDisclosure();
  const {isVisible: showActiveClass, toggle: toggleActiveClass} =
    useDisclosure();
  const {isVisible: showActiveCuriculum, toggle: toggleActiveCuriculum} =
    useDisclosure();
  const {setActiveCurriculum, getActiveCurriculum} = useUserCurriculumActions();
  const {getListPhaseClass, setActivePhaseClass, getActivePhaseClass} =
    useUserPhaseClassActions();
  const {setActiveClass, setActiveClassWithoutApi} = useUserClassActions();
  const activeCuriculum = useActiveCurriculum();
  const activeClass = useActiveClass();
  const isIKM = isStringContains(activeCuriculum.name || '', 'merdeka');
  const activePhaseClass = useActivePhaseClass();
  const listPhaseClass = useListPhaseClass();
  const listClass = useListClass();
  const listCurriculum = useListCuriculum();
  const user: IBaseUser = useSelector(
    (state: RootState) => (state.getUser as any)?.data,
  );
  const isB2B = !!user?.school_id;
  const isTeacher = _handleUserTypeId(user?.user_type_id || 1).role === 'GURU';

  useEffect(() => {
    getActiveCurriculum();
    // getListCurriculum();
    getActivePhaseClass();
    // getListClass();
  }, [getActiveCurriculum, getActivePhaseClass]);

  useEffect(() => {
    getListPhaseClass();
  }, [activeCuriculum, getListPhaseClass]);

  useEffect(() => {
    if (!isTeacher || !user?.class || activeClass.id) {
      return;
    }
    setActiveClassWithoutApi(user?.class);
  }, [activeClass.id, isTeacher, setActiveClassWithoutApi, user?.class]);

  useEffect(() => {
    if (isB2B || isIKM) {
      return;
    }
    const curriculum13 = listCurriculum.find(curriculum =>
      isStringContains(curriculum.name || '', '2013'),
    );
    curriculum13 && setActiveCurriculum(curriculum13);
  }, [isB2B, isIKM, listCurriculum, setActiveCurriculum]);

  const getGeneralContent = async (flag: generalContentFlag) => {
    try {
      const resData = await apiGet({
        url: URL_PATH.get_general_content(flag),
      });

      if (resData?.data?.content_extention === 'pdf') {
        navigateScreen<PDFViewerIKMScreenParam>('PDFViewerIKMScreen', {
          data: resData?.data,
          title:
            flag === 'info_ikm'
              ? 'Info IKM'
              : flag === 'buku_saku_ikm'
              ? 'Buku Saku IKM'
              : 'Profil Pelajar Pancasila',
        });
      }
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    }
  };

  return {
    showActiveCuriculum,
    toggleActiveCuriculum,
    activeCuriculum,
    activePhaseClass,
    setActiveCurriculum,
    toggleActivePhase,
    showActivePhase,
    listCurriculum,
    listPhaseClass,
    setActivePhaseClass,
    getGeneralContent,
    isIKM,
    listClass,
    activeClass,
    setActiveClass,
    toggleActiveClass,
    showActiveClass,
  };
};

export default useHomeIKM;
