import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

interface RootState {
  coin: any;
  xp: any;
  image: any;
  getUser: any;
  packageDetail: any;
}

const useUserIdentityWidget = () => {
  const getUser = useSelector((state: RootState) => state.getUser);
  const xp = useSelector((state: RootState) => state.xp);
  const [decoded, setDecoded] = useState('');
  const imageUser = getUser?.data?.avatar;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded: any = jwtDecode(data) as {avatar: string};

        setDecoded(decoded);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return {
    xp,
    decoded,
    imageUser,
    getUser,
  };
};

export default useUserIdentityWidget;
