import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchImage} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {useQueryFetchUser} from '@services/uaa';
interface RootState {
  decode: any;
  navigation: any;
  image: any;
}
const useHeaderBerandaNonMurid = () => {
  // setup dispatch
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [decode, setDecoded] = useState({});
  const navigation = useNavigation();
  const {refetch: refetchUser} = useQueryFetchUser();
  // get state of redux
  const {image} = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded = jwtDecode(data) as {avatar: string};
        setDecoded(decoded);
        dispatch(fetchImage(decoded?.avatar));
        refetchUser();
        // dispatch(fetchGetUser());
      } catch (error) {
        // console.error(error);
      }
    };
    fetchData();
  }, [isFocused]);

  return {
    decode,
    image,
    navigation,
  };
};

export default useHeaderBerandaNonMurid;
