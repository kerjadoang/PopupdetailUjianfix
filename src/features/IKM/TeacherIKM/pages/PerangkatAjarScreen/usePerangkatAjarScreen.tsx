import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList, ProjectPancasilaScreenParam} from 'type/screen';
import IconMateriSekolah from '@assets/svg/ic48_materi_sekolah_yellow.svg';
import IconSesiKelas from '@assets/svg/ic48_Tambah_Kelas.svg';
import IconProjekPancasila from '@assets/svg/ic48_ProjekPancasila.svg';
import IconLKPD from '@assets/svg/ic48_erapor_bgblue.svg';
import {useNavigate} from '@hooks/useNavigate';

const usePerangkatAjarScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PerangkatAjarScreen'>>();

  const {navigateScreen} = useNavigate();

  const menuItem = [
    {
      id: 1,
      name: 'Materi Sekolah',
      image: <IconMateriSekolah />,
      onPress: () => {
        navigateScreen('ManageSchoolMaterialsScreen');
      },
    },
    {
      id: 2,
      name: 'Sesi Kelas',
      image: <IconSesiKelas />,
      onPress: () => {
        navigateScreen('LMSTeacherClassSessionScreen');
      },
    },
    {
      id: 3,
      name: 'Projek Pancasila',
      image: <IconProjekPancasila />,
      onPress: () => {
        navigateScreen<ProjectPancasilaScreenParam>('ProjectPancasilaScreen', {
          service_type: 'guru',
        });
      },
    },
    {
      id: 4,
      name: 'LKPD',
      image: <IconLKPD />,
      onPress: () => {
        navigateScreen('LkpdTeacherScreen');
      },
    },
  ];

  return {navigation, menuItem};
};
export default usePerangkatAjarScreen;
