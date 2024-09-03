import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {useState, useEffect} from 'react';

const useUserIdentityWidget = () => {
  const [decoded, setDecoded] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded: any = jwtDecode(data) as {avatar: string};

        setDecoded(decoded);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return {
    decoded,
  };
};

export default useUserIdentityWidget;
