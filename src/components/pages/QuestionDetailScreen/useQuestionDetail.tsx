/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {fetchPackageDetail, fetchGetSubjectsReport} from '@redux';
import Colors from '@constants/colors';
import UjianIcon from '@assets/svg/Ujian.svg';
import LatihanIcon from '@assets/svg/Latihan.svg';
import QuizIcon from '@assets/svg/quiz.svg';
import {SubjectType} from '@constants/subjectType';
import {RootState} from 'src/redux/rootReducer';
import {useCoachmark} from '@hooks/useCoachmark';
import {Keys} from '@constants/keys';
import {useFindSubscribePackage} from '@services/uaa';

const useQuestionDetail = (data: any) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [buttonSelected, setButtonSelected] = useState();
  const [, setSelectedSubjectData] = useState<any>([]);

  const subjectReport = useSelector((state: RootState) => state.subjectReport);
  const packageDetail = useSelector((state: RootState) => state.packageDetail);
  const {data: user}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );

  const {Coachmarks, scrollView, doneCoachMark, _handlerCoachmark} =
    useCoachmark(Keys.coachmark_mobile_soal);

  const user_progress = subjectReport?.data?.summary?.user_progress
    ? subjectReport?.data?.summary?.user_progress
    : 0;
  const total_question = subjectReport?.data?.summary?.total_question
    ? subjectReport?.data?.summary?.total_question
    : 0;

  const progress_percentage = subjectReport?.data?.summary?.progress_percentage
    ? subjectReport?.data?.summary?.progress_percentage + '%'
    : '0%';

  const isSuscribedToSubjectsServices = useFindSubscribePackage(
    'soal',
    user?.class_id || 0,
  );

  const handleOpenExercise = async (
    exerciseTypeId: number,
    subjectData: any,
  ) => {
    switch (exerciseTypeId) {
      case 1:
        setSelectedSubjectData(subjectData);
        navigation.navigate('ChapterSOALScreen', {
          subject_type: SubjectType?.SOAL.UlanganHarian,
          subject_data: subjectData,
        });
        break;
      case 2:
        setSelectedSubjectData(subjectData);
        navigation.navigate('ChapterSOALScreen', {
          subject_type: SubjectType?.SOAL.UjianTengahSemester,
          subject_data: subjectData,
        });
        break;
      case 3:
        setSelectedSubjectData(subjectData);
        navigation.navigate('ChapterSOALScreen', {
          subject_type: SubjectType?.SOAL.UjianAkhirSemester,
          subject_data: subjectData,
        });
        break;
      case 4:
        setSelectedSubjectData(subjectData);
        navigation.navigate('ChapterSOALScreen', {
          subject_type: SubjectType?.SOAL.UjianAkhirTahun,
          subject_data: subjectData,
        });
        break;
      case 5:
        setSelectedSubjectData(subjectData);
        navigation.navigate('ChapterSOALScreen', {
          subject_type: SubjectType?.SOAL.Kuis,
          subject_data: subjectData,
        });
        break;
      default:
        break;
    }
  };

  const [exerciseType] = useState([
    {
      id: 1,
      leftIcon: <LatihanIcon />,
      title: 'Ulangan Harian',
      colors: Colors.pink.light,
      onPress: (val: any) => handleOpenExercise(1, val),
      coachmark: Coachmarks[1],
      coachmarkTitle: 'Ulangan Harian',
      coachmarkMessage: 'Latihan soal ulangan harian agar kamu lebih siap.',
    },
    {
      id: 2,
      leftIcon: <UjianIcon />,
      title: 'Ujian',
      subTitle: 'UTS, UAS, Ujian Lainnya',
      colors: Colors.orange.light1,
      onPress: (val: any) => handleOpenExercise(2, val),
      coachmark: Coachmarks[2],
      coachmarkTitle: 'Ujian',
      coachmarkMessage: 'Latihan ragam soal Ujian agar kamu lebih siap.',
    },
    {
      id: 3,
      leftIcon: <QuizIcon />,
      title: 'Kuis',
      subTitle: 'Uji pemahaman materi belajarmu dan Tantang Teman dengan Kuis.',
      onPress: (val: any) => handleOpenExercise(5, val),
      colors: '#F9F3FF',
      coachmark: Coachmarks[3],
      coachmarkTitle: 'Kuis',
      coachmarkMessage:
        'Adu pemahaman materi belajarmu dengan teman melalui kuis.',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchGetSubjectsReport(data.id));
        dispatch(fetchPackageDetail());
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  return {
    buttonSelected,
    setButtonSelected,
    packageDetail,
    exerciseType,
    navigation,
    isSuscribedToSubjectsServices,
    user_progress,
    total_question,
    progress_percentage,
    Coachmarks,
    scrollView,
    doneCoachMark,
    _handlerCoachmark,
  };
};

export default useQuestionDetail;
