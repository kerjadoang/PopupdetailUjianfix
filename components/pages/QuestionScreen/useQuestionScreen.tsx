import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ChildrenSwipeUpServices} from '@components/molecules/ChildrenSwipeUpServices';
import LogoSoal from '@assets/svg/logo_soal.svg';
import SoalIcon1 from '@assets/svg/ic_soal1.svg';
import SoalIcon2 from '@assets/svg/ic_soal2.svg';
import SoalIcon3 from '@assets/svg/ic_soal3.svg';
import SoalIcon4 from '@assets/svg/ic_soal4.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {Keys} from '@constants/keys';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useActiveCurriculum, useActivePhaseClass} from '@features/IKM/zustand';
import {ParamList} from 'type/screen';

const useQuestionScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'QuestionScreen'>>();
  const [isShowServicesSubjects, setIsShowServicesSubjects] = useState(false);
  const [swipeUpType, setSwipeUpType] = useState<'subject' | 'akm'>('subject');
  const [isHidden, setIsHidden] = useState(false);
  const [lastAccessed, setLastAccessed] = useState([]);
  const activeCuriculum = useActiveCurriculum();
  const activePhaseClass = useActivePhaseClass();
  const [isShowForbiddenAccess, setIsShowForbiddenAccess] =
    useState<boolean>(false);
  const dispatch: any = useDispatch();
  const {getAllAkm}: any = useSelector(state => state);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getLastAccessed = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get('/soal/v1/history/last-accessed', {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        });

        if (response.status === 200) {
          const data = response.data || {};
          const promises = data.data?.map(async (obj: any) => {
            if (obj?.subject?.icon_mobile) {
              const imgRes = await api.get(
                `/media/v1/image/${obj.subject.icon_mobile}`,
              );

              if (imgRes.status === 200 && imgRes.data?.code === 100) {
                obj.subject.path_url = imgRes.data?.data?.path_url;
              }
            }
          });

          await Promise.all(promises);
          if (data?.data?.length > 0) {
            setLastAccessed(data.data);
          } else {
            setLastAccessed([]);
            setIsHidden(true);
          }
        }
      } catch (err) {
        return;
      }
    };

    getLastAccessed();
  }, [isFocused, activeCuriculum, activePhaseClass]);

  const renderChildrenSwipeUpSoal = () => {
    const data = [
      {
        icon: <SoalIcon1 />,
        text: 'Learn, Practice, Test',
        textSubject:
          'Menyajikan materi, soal latihan, dan tes pembelajaran secara interaktif.',
      },
      {
        icon: <SoalIcon2 />,
        text: 'Kuis',
        textSubject:
          'Kumpulan soal latihan yang dapat digunakan untuk mengukur tingkat pemahaman kamu.',
      },
      {
        icon: <SoalIcon3 />,
        text: 'Try Out',
        textSubject: 'Uji kemampuan dan kesiapan kamu dalam menghadapi ujian.',
      },
      {
        icon: <SoalIcon4 />,
        text: 'Laporan',
        textSubject:
          'Mengetahui progres belajar murid pada setiap mata pelajaran yang telah dipelajari.',
      },
    ];
    return (
      <View>
        <ChildrenSwipeUpServices
          data={data}
          logo={<LogoSoal />}
          title={'Puluhan ribu soal latihan persiapan berbagai ujian.'}
          OnPressButton1={() => {
            navigation.navigate('Cart');
            setIsShowServicesSubjects(false);
          }}
          setIsShowServicesSubjects={setIsShowServicesSubjects}
          singleButton
          ButtonLabel1={'Berlangganan'}
        />
      </View>
    );
  };

  return {
    dispatch,
    getAllAkm,
    isShowServicesSubjects,
    isHidden,
    navigation,
    lastAccessed,
    swipeUpType,
    setSwipeUpType,
    setIsHidden,
    setIsShowServicesSubjects,
    renderChildrenSwipeUpSoal,
    isShowForbiddenAccess,
    setIsShowForbiddenAccess,
  };
};

export default useQuestionScreen;
