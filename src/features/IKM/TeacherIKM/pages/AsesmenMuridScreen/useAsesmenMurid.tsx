import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import IconTugas from '@assets/svg/ic48_pr_tugas_alert.svg';
import IconUjian from '@assets/svg/ic48_ujian_yellow.svg';
import {useState} from 'react';

const useAsesmenMurid = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'AsesmenMuridScreen'>>();
  const {navigateScreen} = useNavigate();
  const [index, setIndex] = useState<any>(0);
  const [examId, setExamId] = useState<any>(null);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);

  const menuItem = [
    {
      id: 1,
      name: 'Tugas',
      image: <IconTugas />,
      onPress: () => {
        navigateScreen('LMSTeacherTaskScreen');
      },
    },
    {
      id: 2,
      name: 'Ujian',
      image: <IconUjian />,
      onPress: () => {
        navigateScreen('UjianScreen');
      },
    },
  ];

  return {
    navigation,
    navigateScreen,
    menuItem,
    index,
    setIndex,
    examId,
    setExamId,
    showMoreMenu,
    setShowMoreMenu,
  };
};
export default useAsesmenMurid;
