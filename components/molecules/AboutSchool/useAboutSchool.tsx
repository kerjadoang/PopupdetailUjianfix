import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchImage} from '@redux';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
interface RootState {
  decode: any;
  image: any;
}
const useAboutSchool = () => {
  // setup dispatch
  const dispatch = useDispatch();
  const [decode, setDecoded] = useState({});
  // get state of redux
  const {image} = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded = jwtDecode(data) as {avatar: string};
        setDecoded(decoded);
        dispatch(fetchImage(decoded?.avatar));
      } catch (error) {
        // console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return {
    decode,
    image,
  };
};

export default useAboutSchool;
