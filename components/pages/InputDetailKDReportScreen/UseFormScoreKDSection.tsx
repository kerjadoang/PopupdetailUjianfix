import api from '@api/index';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {downloadEraport} from '../ERaportGuruScreen/utils';
import {showErrorToast, showSuccessToast} from '@constants/functional';

const UseFormScoreKDSection = (student_data, class_id, _years, years_id) => {
  const {getUser} = useSelector((state: RootState) => state);
  const [allContent, setAllContent] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSwipeEdit, setShowSwipeEdit] = useState(false);
  const [showSnackBar, setShowShackBar] = useState(false);
  const [chooseSubject, setChooseSubject] = useState(null);
  const [raportEnable, setRaportEnable] = useState(false);
  const [allRaport, setAllRaport] = useState([]);
  const [firstId, setFirstId] = useState();
  const [academicPhase, setAcademicPhase] = useState();
  const [formState, setFormState] = useState({
    academic_year_id: student_data?.academic_year_id,
    school_id: student_data?.school_id,
    class_id: class_id?.class_id,
    user_id: student_data?.id,
    assessment_erapor_share_student_id: null,
    attitude: null,
    knowledge: null,
    skills: null,
    extracurricular: null,
    physical_development_record: null,
    suggestion: '',
    sick: null,
    permission: null,
    alpha: null,
    introductory_message: '',
    graduation_status: null,
  });
  const handleSetChooseAll = (id, data) => {
    const selectedSubjects = data?.find(item => item.id === id);
    if (selectedSubjects) {
      setChooseSubject(chooseSubject ? firstId : selectedSubjects);
      handleSetSubject(selectedSubjects);
    }
  };
  const getAllContent = useCallback(
    async id => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/assessment/basiccompetency/listdetail/${getUser?.data?.school_id}/${years_id?.id}/${class_id?.class_id}/${student_data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response.data;
          setAllContent(data);
          handleSetChooseAll(id, data?.data);
          setFirstId(data.data[0]);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while fetching allContent:', err);
      }
    },
    [
      getUser?.data?.school_id,
      years_id?.id,
      class_id?.class_id,
      student_data?.id,
    ],
  );
  useEffect(() => {
    getAllContent();
  }, [getAllContent]);
  const isUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      const response = await api.get(
        `/uaa/v1/user/get-user/${getUser?.data?.id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response.data?.data;
        setAcademicPhase(data?.academi_phase?.id);
        isReport(data?.academi_phase?.id);
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to get user:', response.data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while fetching user:', err);
    }
  }, [getUser?.data?.id]);

  useEffect(() => {
    isUser();
  }, [isUser]);

  const isReport = useCallback(
    async id => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/assessment/erapor/share/cekdownload/${student_data?.id}/${class_id?.id}/${years_id?.id}/${id}/${getUser?.data?.school_id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response.data?.data;
          setRaportEnable(data);
          setFormState(prevState => ({
            ...prevState,
            assessment_erapor_share_student_id: data?.erapor?.id,
          }));
          getAllRaport(data?.erapor?.id);
        } else {
          Toast.show({
            type: 'error',
            text1: response?.data?.message,
          });
        }
      } catch (err) {}
    },
    [
      student_data?.id,
      class_id?.id,
      years_id?.id,
      getUser?.data?.school_id,
      formState,
    ],
  );

  const getAllRaport = useCallback(
    async academicPhaseId => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = JSON.parse(token || '');
        const response = await api.get(
          `/lms/v1/assessment/erapor/share/detail/${academicPhaseId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response.status === 200) {
          const data = response.data;
          setAllRaport(data);
          setFormState(prevState => ({
            ...prevState,
            attitude: data?.data?.attitude?.map(item => item),
            knowledge: data?.data?.knowledge?.map(item => item),
            skills: data?.data?.skills?.map(item => item),
            extracurricular: data?.data?.extracurricular?.map(item => item),
            physical_development_record:
              data?.data?.physical_development_record?.map(item => item),
            suggestion: data?.data?.suggestion,
            sick: data?.data?.sick,
            permission: data?.data?.permission,
            alpha: data?.data?.alpha,
            graduation_status: data?.data?.graduation_status,
            introductory_message: data?.data?.introductory_message,
          }));
        } else {
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while fetching report:', err);
      }
    },
    [raportEnable?.erapor?.id, formState],
  );

  useEffect(() => {
    getAllRaport();
  }, [getAllRaport]);

  const submit = useCallback(
    async (_chooseList, _valueDaily, _valueMidle, _valueFinal) => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = JSON.parse(token || '');

        const requestBody = {
          basic_competency_id: _chooseList?.basic_competency_id,
          basic_competency_student_assessment_detail_id: _chooseList?.id,
          daily_assessment: parseInt(_valueDaily),
          midterm_assessment: parseInt(_valueMidle),
          final_assessment: parseInt(_valueFinal),
          user_id: student_data?.id,
        };

        const response = await api.post(
          '/lms/v1/assessment/basiccompetency/score/update',
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );

        if (response.status === 200) {
          setShowSwipeEdit(false);
          Toast.show({
            type: 'success',
            text1: 'Nilai KD berhasil disimpan.',
          });
          getAllContent(requestBody?.basic_competency_id);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Nilai KD gagal disimpan.',
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while updating score:', err);
      }
    },
    [getAllContent, student_data?.id],
  );

  const handleSetSubject = item => {
    setSelectedSubject(item);
  };

  const handleSetChoose = item => {
    setChooseSubject(item);
  };

  // useEffect(() => {
  //   formState;
  // }, [formState]);

  const submitAddExtra = async body => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      const mappedBody: typeof formState = {
        ...formState,
        extracurricular: [
          ...formState.extracurricular,
          {
            ...body,
            assessment_erapor_share_student_id:
              formState.assessment_erapor_share_student_id,
          },
        ],
      };

      const response = await api.post(
        '/lms/v1/assessment/erapor/share/detail/',
        mappedBody,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Data berhasil ditambah.',
        });
        isReport(academicPhase);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Data gagal ditambah.',
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while fetching report:', err);
    }
  };
  const submitEdit = async (body, status) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');

      const response = await api.post(
        '/lms/v1/assessment/erapor/share/detail/',
        body,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        status === 'delete'
          ? Toast.show({
              type: 'success',
              text1: 'Data berhasil diHapus.',
            })
          : Toast.show({
              type: 'success',
              text1: 'Data berhasil disimpan.',
            });
        isReport(academicPhase);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Data gagal disimpan.',
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while fetching report:', err);
    }
  };

  const submitDownload = async () => {
    try {
      await downloadEraport(
        student_data?.full_name,
        Number(formState?.assessment_erapor_share_student_id),
      );
      showSuccessToast('Berhasil didownload');
    } catch (_) {
      showErrorToast('Gagal didownload');
    }
  };

  return {
    allContent,
    selectedSubject,
    setSelectedSubject,
    submit,
    showSwipeEdit,
    setShowSwipeEdit,
    showSnackBar,
    setShowShackBar,
    chooseSubject,
    setChooseSubject,
    handleSetSubject,
    handleSetChoose,
    raportEnable,
    allRaport,
    submitEdit,
    formState,
    setFormState,
    firstId,
    submitDownload,
    submitAddExtra,
  };
};

export default UseFormScoreKDSection;
