import api from '@api/index';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchRank} from '@redux';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
const useFormTryOutDetailHistory = (dataHistory: any) => {
  const {rank}: any = useSelector<any>(state => state);
  const dispatch = useDispatch();
  const [allData, setAllData] = useState<any>();
  const classRecommendation: PTNClassRecomendation =
    allData?.class_recommendation;
  const bankSoalRecommendation: PTNBankSoalRecommendation =
    allData?.bank_question_recommendation;
  const [dataBarTPS, setDataBarTPS] = useState({
    labels: [],
    datasets: [{data: [], point: [], labelFull: []}],
  });
  const [dataBarSoshum, setDataBarSoshum] = useState({
    labels: [],
    datasets: [{data: [], point: [], labelFull: []}],
  });
  const [dataBarSaintek, setDataBarSaintek] = useState({
    labels: [],
    datasets: [{data: [], point: [], labelFull: []}],
  });
  useEffect(() => {
    dispatch(fetchRank());
  }, [dispatch]);

  const formStateRef = useRef<any>({
    module: {
      saintek: [],
      soshum: [],
      tps: [],
    },
  });
  const getTryOutDetail = useCallback(async (dataHistory: any) => {
    try {
      showLoading();
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      const response = await api.get(
        `/tryout/v1/history/detail/${
          dataHistory?.tryout_id ?? dataHistory?.id
        }/${dataHistory?.register_id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        setAllData(response?.data?.data);
        const moduleData = response?.data?.data?.module;
        formStateRef.current.module = moduleData;
      } else {
        showErrorToast(
          'Terjadi kesalahan pada sistem kami,\n silahkan coba lagi',
        );
      }
    } catch (err) {
      showErrorToast(
        'Terjadi kesalahan pada sistem kami,\n silahkan coba lagi',
      );
    } finally {
      dismissLoading();
    }
  }, []);
  useEffect(() => {
    getTryOutDetail(dataHistory);
  }, [dataHistory, getTryOutDetail]);
  useEffect(() => {
    if (allData?.module?.tps?.length > 0) {
      const data = allData?.module?.tps?.reduce(
        (prev: any, curr: any) => {
          prev?.labels?.push(curr.subject?.name?.substring(0, 10 - 3) + '...');
          prev?.datasets[0]?.data?.push(curr?.point);
          prev?.datasets[0]?.point?.push(curr?.point);
          prev?.datasets[0]?.labelFull?.push(curr?.subject?.name);
          return prev;
        },
        {
          labels: [],
          datasets: [{data: [], point: [], labelFull: []}],
        },
      );
      setDataBarTPS(data);
    } else {
      setDataBarTPS({
        labels: [],
        datasets: [{data: [], point: [], labelFull: []}],
      });
    }
  }, [allData]);
  useEffect(() => {
    if (allData?.module?.soshum?.length > 0) {
      const data = allData?.module?.soshum?.reduce(
        (prev: any, curr: any) => {
          prev?.labels?.push(curr.subject?.name?.substring(0, 10 - 3) + '...');
          prev?.datasets[0]?.labelFull?.push(curr?.subject?.name);
          prev?.datasets[0]?.data?.push(curr?.point);
          prev?.datasets[0]?.point?.push(curr?.point);
          return prev;
        },
        {
          labels: [],
          datasets: [{data: [], point: [], labelFull: []}],
        },
      );
      setDataBarSoshum(data);
    } else {
      setDataBarSoshum({
        labels: [],
        datasets: [{data: [], point: [], labelFull: []}],
      });
    }
  }, [allData]);
  useEffect(() => {
    if (allData?.module?.saintek?.length > 0) {
      const data = allData?.module?.saintek?.reduce(
        (prev: any, curr: any) => {
          prev?.labels?.push(curr.subject?.name?.substring(0, 10 - 3) + '...');
          prev?.datasets[0]?.labelFull?.push(curr?.subject?.name);
          prev?.datasets[0]?.data?.push(curr?.point);
          prev?.datasets[0]?.point?.push(curr?.point);
          return prev;
        },
        {
          labels: [],
          datasets: [{data: [], point: [], labelFull: []}],
        },
      );
      setDataBarSaintek(data);
    } else {
      setDataBarSaintek({
        labels: [],
        datasets: [{data: [], point: [], labelFull: []}],
      });
    }
  }, [allData]);
  return {
    rank,
    allData,
    dataBarTPS,
    formStateRef,
    dataBarSaintek,
    dataBarSoshum,
    classRecommendation,
    bankSoalRecommendation,
  };
};

export default useFormTryOutDetailHistory;
