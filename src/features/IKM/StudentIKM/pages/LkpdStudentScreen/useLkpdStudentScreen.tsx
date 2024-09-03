import {useLkpdActions, useLkpdMode, useLkpdSearch} from './zustand';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect} from 'react';
import {LkpdStudentScreenParam} from 'type/screen';

const useLkpdStudentScreen = () => {
  const {navigateScreen, getRouteParams} = useNavigate();
  const {id: lkpd_id} = getRouteParams<LkpdStudentScreenParam>();
  const lkpdSearch = useLkpdSearch();
  const lkpdMode = useLkpdMode();

  const {
    setMode: setLkpdMode,
    setSearch: setLkpdSearch,
    setUserRole,
    resetState: resetLKPD,
  } = useLkpdActions();

  useEffect(() => {
    setUserRole('MURID');
    return () => {
      resetLKPD();
    };
  }, []);

  return {
    navigateScreen,
    lkpdMode,
    lkpdSearch,
    setLkpdMode,
    setLkpdSearch,
    lkpd_id,
  };
};
export default useLkpdStudentScreen;
