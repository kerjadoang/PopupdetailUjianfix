/* eslint-disable no-console */
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {showErrorToast} from '@constants/functional';
interface RootState {
  getUser: any;
}
const useFormInputScoreKKM = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const school_id: string = getUser?.data?.school?.id;
  const [data, setData] = useState([]);
  const [getClass, setGetClass] = useState([]);
  const [firstClass, setFirstClass] = useState([]);
  const [firstAcademic, setFirstAcademic] = useState([]);
  const [allKnowledge, setAllKnowledge] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allExtra, setAllExtra] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAcademic, setSelectedAcademic] = useState(null);
  const snackBar = false;
  const [show, setShow] = useState(false);
  const [popUp, setPopUp] = useState(0);
  const [allKKMValue, setAllKKMValue] = useState<any>([]);
  const [selectedExtra, setSelectedExtra] = useState<any>([]);
  const [deleteInfo, setDeleteInfo] = useState({
    subjectId: '',
    name: '',
    title: '',
  });

  useEffect(() => {
    const getAllAcademic = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get(
          `/lms/v1/academic-year/get-all/${school_id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          setData(response?.data?.data);
          setFirstAcademic(response?.data?.data[0]);
        } else {
          console.log('gagal');
        }
      } catch (err) {
        return;
      }
    };

    getAllAcademic();
  }, [school_id]);

  useEffect(() => {
    const getAllClass = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get('/master/v1/class/', {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        });
        if (response.status === 200) {
          setGetClass(response?.data?.data);
          setFirstClass(response?.data?.data[0]);
        } else {
          console.log('failure');
        }
      } catch (err) {
        return;
      }
    };

    getAllClass();
  }, [selectedDate]);

  const getAllKnowledge = useCallback(
    async (
      selectedClass: any,
      firstClass: any,
      selectedDate: any,
      firstAcademic: any,
    ) => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/mcc/get-all-pengetahuan-mcc/${
            selectedDate
              ? selectedDate?.academic_phase[0]?.academic_year_id
              : firstAcademic?.academic_phase[0]?.academic_year_id
          }/${
            selectedClass ? selectedClass?.id : firstClass?.id
          }?limit=30&offset=1`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response?.data?.data;
          setAllKnowledge(data);
        } else {
          console.log('failure get Knowledge');
        }
      } catch (err) {
        return;
      }
    },
    [],
  );

  useEffect(() => {
    getAllKnowledge(selectedClass, firstClass, selectedDate, firstAcademic);
  }, [getAllKnowledge, selectedClass, firstClass, firstAcademic, selectedDate]);

  const getAllSkills = useCallback(
    async (
      selectedClass: any,
      firstClass: any,
      selectedDate: any,
      firstAcademic: any,
    ) => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/mcc/get-all-keterampilan-mcc/${
            selectedDate
              ? selectedDate?.academic_phase[0]?.academic_year_id
              : firstAcademic?.academic_phase[0]?.academic_year_id
          }/${selectedClass ? selectedClass?.id : firstClass?.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response?.data?.data;
          setAllSkills(data);
        } else {
          console.log('failure get Skills');
        }
      } catch (err) {
        return;
      }
    },
    [],
  );

  useEffect(() => {
    getAllSkills(selectedClass, firstClass, selectedDate, firstAcademic);
  }, [getAllSkills, selectedClass, firstClass, selectedDate, firstAcademic]);

  const getAllExtra = useCallback(
    async (
      selectedClass: any,
      firstClass: any,
      selectedDate: any,
      firstAcademic: any,
    ) => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/mcc/get-all-ekstrakurikuler-mcc/${
            selectedDate
              ? selectedDate?.academic_phase[0]?.academic_year_id
              : firstAcademic?.academic_phase[0]?.academic_year_id
          }/${
            selectedClass ? selectedClass?.id : firstClass?.id
          }?limit=10&offset=0`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response?.data?.data;
          setAllExtra(data);
        } else {
          console.log('failure get Skills');
        }
      } catch (err) {
        return;
      }
    },
    [],
  );

  useEffect(() => {
    getAllExtra(selectedClass, firstClass, selectedDate, firstAcademic);
  }, [getAllExtra, selectedClass, firstClass, selectedDate, firstAcademic]);

  const submitEdit = (form: any) => {
    const body = {
      form,
    };
    const submit = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.post(
          '/lms/v1/mcc/upsert-pengetahuan-mcc',
          body?.form,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'KKM berhasil simpan.',
          });
          getAllKnowledge(
            selectedClass,
            firstClass,
            selectedDate,
            firstAcademic,
          );
        } else {
          Toast.show({
            type: 'error',
            text1: 'KKM tidak berhasil simpan.',
          });
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };

  const submitAddSkills = (form: any) => {
    const body = {
      form,
    };

    const submit = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.post(
          '/lms/v1/mcc/create-keterampilan-mcc',
          body?.form,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'KKM berhasil ditambahkan.',
          });
          getAllSkills(selectedClass, firstClass, selectedDate, firstAcademic);
        } else {
          Toast.show({
            type: 'error',
            text1: 'KKM tidak berhasil ditambahkan.',
          });
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };
  const submitEditSkills = (form: any, mcc_id: any) => {
    const body = {
      subject_name: form?.subject_name,
      kkm: form?.kkm,
      excelent_start: form?.excelent_start,
      excelent_end: form?.excelent_end,
      very_good_start: form?.very_good_start,
      very_good_end: form?.very_good_end,
      good_start: form?.good_start,
      good_end: form?.good_end,
      failed: form?.failed,
    };
    const submit = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.put(
          `/lms/v1/mcc/update-keterampilan-mcc/${mcc_id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'KKM berhasil simpan.',
          });
          getAllSkills(selectedClass, firstClass, selectedDate, firstAcademic);
        } else {
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };
  const submitAddExtra = (form: any) => {
    const body = {
      form,
    };
    const submit = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.post(
          '/lms/v1/mcc/create-ekstrakurikuler-mcc',
          body?.form,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'KKM berhasil ditambahkan.',
          });
          getAllExtra(selectedClass, firstClass, selectedDate, firstAcademic);
          setPopUp(0);
        } else {
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };
  const submitEditExtra = (form: any) => {
    const body = {
      form,
    };
    const mcc_id = selectedExtra?.id;
    const submit = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.put(
          `/lms/v1/mcc/update-ekstrakurikuler-mcc/${mcc_id}`,
          body?.form,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'KKM berhasil simpan.',
          });
          setPopUp(0);
          getAllExtra(selectedClass, firstClass, selectedDate, firstAcademic);
        } else {
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };
  const submitDelete = (
    form: any,
    selectedDate: any,
    selectedClass: any,
    firstAcademic: any,
    firstClass: any,
  ) => {
    const submit = async () => {
      setShow(false);
      const body = {
        academic_year_id: selectedDate
          ? selectedDate?.academic_phase[0]?.academic_year_id
          : firstAcademic?.academic_phase[0]?.academic_year_id,
        class_id: selectedClass ? selectedClass?.id : firstClass?.id,
        subject_id: form?.subjectId,
      };
      try {
        const response = await api.put(
          '/lms/v1/mcc/delete-pengetahuan-mcc',
          body,
        );
        if (response.status === 200) {
          getAllKnowledge(
            selectedClass,
            firstClass,
            selectedDate,
            firstAcademic,
          );
          Toast.show({
            type: 'success',
            text1: 'Pengetahuan berhasil dihapus.',
          });
        } else {
          const errMessage = response.data?.message;
          showErrorToast(errMessage);
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };

  const submitDeleteExtra = (item: any) => {
    const submit = async () => {
      setShow(false);
      const body = item?.subjectId;
      try {
        const response = await api.delete(
          `/lms/v1/mcc/delete-ekstrakurikuler-mcc/${body}`,
        );
        if (response.status === 200) {
          getAllExtra(selectedClass, firstClass, selectedDate, firstAcademic);
          Toast.show({
            type: 'success',
            text1: 'Ekstrakulikuler berhasil dihapus.',
          });
        } else {
          const errMessage = response.data?.message;
          showErrorToast(errMessage);
        }
      } catch (err) {
        return;
      }
    };
    submit();
  };

  const submitDeleteSkills = async (item: any) => {
    setShow(false);
    const body = item?.subjectId;
    try {
      const response = await api.delete(
        `/lms/v1/mcc/delete-keterampilan-mcc/${body}`,
      );
      // logApi({
      //   nameFunction: 'apiPut',
      //   res: response,
      //   tags: 'submitDelete',
      // });
      if (response.status === 200) {
        getAllSkills(selectedClass, firstClass, selectedDate, firstAcademic);
        Toast.show({
          type: 'success',
          text1: `Keterampilan berhasil dihapus.`,
        });
      } else {
        const errMessage = response.data?.message;
        showErrorToast(errMessage);
      }
    } catch (err) {
      return;
    }
  };

  const submitCount = (body: any, value: any) => {
    const getBody = {
      kkm: parseInt(value),
    };
    const getAllScore = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = JSON.parse(token || '');
        const response = await api.post(
          '/lms/v1/mcc/generate-predicate',
          getBody,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          setAllKKMValue(response?.data?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllScore();
  };

  const handleClassSelected = (item: any) => {
    setSelectedClass(item);
  };
  const handleDateSelected = (item: any) => {
    setSelectedDate(item);
  };
  return {
    data,
    getClass,
    firstClass,
    firstAcademic,
    allKnowledge,
    submitEdit,
    allSkills,
    handleClassSelected,
    handleDateSelected,
    selectedClass,
    setSelectedClass,
    selectedDate,
    setSelectedDate,
    selectedAcademic,
    setSelectedAcademic,
    submitDelete,
    snackBar,
    show,
    setShow,
    allExtra,
    popUp,
    submitCount,
    setPopUp,
    allKKMValue,
    submitEditSkills,
    submitAddSkills,
    submitAddExtra,
    selectedExtra,
    setSelectedExtra,
    submitEditExtra,
    setAllKKMValue,
    submitDeleteExtra,
    submitDeleteSkills,
    deleteInfo,
    setDeleteInfo,
  };
};

export default useFormInputScoreKKM;
