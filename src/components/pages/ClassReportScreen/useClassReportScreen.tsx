import api from '@api/index';
import {dismissLoading, showLoading} from '@constants/functional';
import {useEffect, useState} from 'react';

const useClassReportScreen = (route: any) => {
  const [search, setSearch] = useState('');
  const [murid, setMurid] = useState([]);
  const [task, setTaskCount] = useState<any>();
  const [exam, setExamCount] = useState<any>();

  useEffect(() => {
    taskCount();
    examCount();
  }, []);

  useEffect(() => {
    if (search?.length == 0) {
      _handlerOnSubmitSearch();
    }
  }, [search]);

  const _handlerOnSubmitSearch = async () => {
    showLoading();
    try {
      const res = await api.get(
        `/lms/v1/rombel-user/1?rombelClassId=${route?.params?.id?.id}&search=${search}`,
      );

      if (res?.data?.data?.rombel_user === null) {
        setMurid([]);
        dismissLoading();
      } else {
        const data = res?.data?.data?.rombel_user;
        const promises = data.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        setMurid(data);
        dismissLoading();
      }
    } catch (err) {
      return;
    }
  };

  const taskCount = async () => {
    try {
      const res = await api.get(
        `/lms/v1/task/count/history-by-rombel/${route?.params?.id?.id}`,
      );
      setTaskCount(res?.data?.data);
    } catch (err) {
      return;
    }
  };

  const examCount = async () => {
    try {
      const res = await api.get(
        `/lms/v1/count/exam/history-by-rombel/${route?.params?.id?.id}`,
      );
      setExamCount(res?.data?.data);
    } catch (err) {
      return;
    }
  };

  return {
    search,
    setSearch,
    murid,
    task,
    exam,
    _handlerOnSubmitSearch,
  };
};

export default useClassReportScreen;
