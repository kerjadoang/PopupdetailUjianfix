import {useCallback, useEffect, useState} from 'react';
import api from '@api/index';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {dismissLoading, showLoading} from '@constants/functional';
import {ParamList} from 'type/screen';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
const useFormInputDetailKD = () => {
  const route = useRoute<RouteProp<ParamList, 'InputDetailKDScreen'>>();
  const [allData, setAllData] = useState([]);
  const getUser: IGetUser = useSelector((state: RootState) => state.getUser);
  const [snackbar, setSnackbar] = useState(false);
  const [showSwipe, setShowSwipe] = useState(false);
  const [showSwipeEdit, setShowSwipeEdit] = useState(false);
  const [allKnowledge, setAllKnowledge] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(false);
  const [swipeUpType, setSwipeUpType] = useState<SwipeUpKDFormType>();

  const getKD = useCallback(async () => {
    try {
      const response = await api.get(
        URL_PATH.get_teacher_basic_competency_list({
          school_id: getUser?.data?.school_id,
          academic_year_id: route?.params?.academic_year_id,
          class_id: route?.params?.class_id,
          user_id: getUser?.data?.id,
        }),
        // `/lms/v1/assessment/basiccompetency/listdetail/${getUser?.data?.school_id}/${route?.params?.academic_year_id}/${route?.params?.class_id}/${getUser?.data?.id}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${tokenParse}`,
        //   },
        // },
      );
      if (response.status === 200) {
        const data = response?.data?.data;
        setAllData(data);
      }
    } catch (err) {
      return;
    }
  }, [
    getUser?.data?.id,
    getUser?.data?.school_id,
    route?.params?.academic_year_id,
    route?.params?.class_id,
  ]);

  useEffect(() => {
    getKD();
  }, [getKD]);

  const submitAddKD = useCallback(
    async (item: any, id: any, subject_id: any) => {
      try {
        const isAddMode = swipeUpType == 'add';
        showLoading();

        const requestBody = {
          school_id: getUser?.data?.school_id,
          academic_year_id: route?.params?.academic_year_id,
          class_id: route?.params?.class_id,
          // id: id,
          subject_id: subject_id,
          basic_competency_detail: item?.map((item: any) => ({
            no: item.no,
            name: item.name,
            chapter: item.chapter,
            title: item.title,
            notes: item.notes,
          })),
        };

        let response;
        if (isAddMode) {
          response = await api.post(
            URL_PATH.post_teacher_input_basic_competency(),
            requestBody,
          );
        } else {
          response = await api.put(
            URL_PATH.post_teacher_input_basic_competency(),
            {...requestBody, id: id},
          );
        }

        if (response.status === 200) {
          setSnackbar(true);
          getKD();
          setShowSwipe(false);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
        }
      } catch (err) {
        return;
      } finally {
        dismissLoading();
      }
    },
    [
      swipeUpType,
      getKD,
      selectedItem,
      setSelectedItem,
      getUser?.data?.school_id,
      route?.params?.academic_year_id,
      route?.params?.class_id,
    ],
  );
  const getAllKnowledge = useCallback(async () => {
    try {
      const response = await apiGet({
        url: URL_PATH.get_dropdown_mapel_teacher(route?.params?.class_id!),
        // url: `lms/v1/teacher/task/dropdown/subject/${route?.params?.class_id}`,
      });

      setAllKnowledge(response);
    } catch (err) {
      return;
    }
  }, [route?.params?.academic_year_id, route?.params?.class_id]);

  useEffect(() => {
    getAllKnowledge();
  }, [getAllKnowledge]);

  const showSwipeUpFormKD = (type: SwipeUpKDFormType) => {
    setType(true);
    setSwipeUpType(type);
    setShowSwipe(true);
  };

  const closeSwipeUpFormKD = () => {
    setType(true);
    setSelectedItem(null);
    setSwipeUpType(undefined);
    setShowSwipe(false);
  };

  return {
    allData,
    submitAddKD,
    setSnackbar,
    snackbar,
    showSwipe,
    setShowSwipe,
    allKnowledge,
    selectedItem,
    setSelectedItem,
    showSwipeEdit,
    setShowSwipeEdit,
    showSwipeUpFormKD,
    closeSwipeUpFormKD,
    swipeUpType,
    type,
    setType,
  };
};

export default useFormInputDetailKD;
