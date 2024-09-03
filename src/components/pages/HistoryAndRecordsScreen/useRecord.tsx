import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {useEffect, useState} from 'react';
const useRecord = (id: number) => {
  const [dataRecord, setDataRecord] = useState<any>({});
  const getDataRecord = async () => {
    const resRecord = await api.get(URL_PATH.get_record_detail(id));
    if (resRecord?.status === 200) {
      setDataRecord(resRecord?.data?.data);
    }
  };
  useEffect(() => {
    getDataRecord();
  }, []);

  return {
    dataRecord,
  };
};
export default useRecord;
