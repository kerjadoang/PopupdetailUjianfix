import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SCREEN_NAME} from '@constants/screen';

interface RootState {
  xp: any;
  reward: any;
}

const useCardUserWidget = () => {
  const navigation: any = useNavigation();
  const reward = useSelector((state: RootState) => state.reward);
  const xp = useSelector((state: RootState) => state.xp);

  const rankData = reward?.data?.filter?.(
    (item: any) => (item?.full_name || '') == (xp?.data?.full_name || ''),
  );
  const rank = rankData?.[0]?.rank || 0;

  const navigateToLinkAccount = () => {
    navigation.navigate(SCREEN_NAME.LinkAccountScreen, {
      title: 'anak',
    });
  };

  return {
    xp,
    rank,
    navigateToLinkAccount,
  };
};

export default useCardUserWidget;
