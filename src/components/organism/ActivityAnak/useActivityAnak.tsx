import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {convertDate} from '@constants/functional';

const useActivityAnak = (token: any, user: any) => {
  // get state of redux/
  const navigation: any = useNavigation();
  // const {getActivity} = useSelector((state: RootState) => state);
  const {data: activities} = useQuery({
    queryKey: ['activity-anak', token],
    queryFn: async () => {
      const endDate = convertDate().format('YYYY-MM-DD');
      const startDate = convertDate().subtract(1, 'month').format('YYYY-MM-DD');
      const data = await apiGet({
        url: URL_PATH.get_list_activity(1, 1, startDate, endDate),
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return data;
    },
  });

  // setup dispatch
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchGetActivity(10, 1, token));
  // }, [token]);

  const onPress = () => {
    navigation.navigate('MyActivityScreen', {
      userData: {
        access_token: token,
        full_name: user?.full_name || '-',
        rombel_name: user?.rombel_name || '-',
      },
    });
  };

  return {
    activities,
    onPress,
  };
};

export default useActivityAnak;
