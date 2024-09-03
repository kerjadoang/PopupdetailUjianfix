import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '@constants/colors';
import TambahKelas from '@assets/svg/ic48_Tambah_Kelas.svg';
import MateriSekolah from '@assets/svg/ic48_materi_sekolah_yellow.svg';
import Tugas from '@assets/svg/ic48_pr_tugas_alert.svg';
import Ujian from '@assets/svg/ic48_akm_alert.svg';
import AKM from '@assets/svg/ic48_akm.svg';
import IKM from '@assets/svg/ic48_IKM.svg';
import RPP from '@assets/svg/ic48_RPP.svg';
import RapatVirtual from '@assets/svg/ic48_Rapat_Virtual.svg';
import FGD from '@assets/svg/ic48_Forum_alert.svg';
import {useNavigation} from '@react-navigation/native';
import {PopUp} from '@components/atoms';
import {useMergeState} from '@constants/functional';
import provider from '@services/lms/provider';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import ProyekPancasila from '@assets/svg/ic48_ProjekPancasila.svg';

import Fonts from '@constants/fonts';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';

const numColumns = 4; // jumlah kolom yang diinginkan
interface IProps {
  show?: boolean;
}
const MenuGuru = ({show}: IProps) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'MenuGuru'>>();
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    totalUnreadsDiscussionGroup: 0,
  });
  const {isLoading, isShowPopup, popupData, totalUnreadsDiscussionGroup}: any =
    state;

  useEffect(() => {
    _handlerGetUnreadDiscussionGroup();
  }, []);

  const menuguru = [
    {
      name: 'Sesi Kelas',
      image: <TambahKelas height={48} width={48} />,
      onPress: () => {
        navigation.navigate('LMSTeacherClassSessionScreen', {});
      },
      totalUnreads: 0,
    },
    {
      name: 'Materi Sekolah',
      image: <MateriSekolah height={48} width={48} />,
      onPress: () => {
        navigation.navigate('ManageSchoolMaterialsScreen');
      },
      totalUnreads: 0,
    },
    {
      name: 'Tugas',
      image: <Tugas height={48} width={48} />,
      onPress: () => navigation.navigate('LMSTeacherTaskScreen'),
      totalUnreads: 0,
    },
    {
      name: 'Ujian',
      image: <Ujian height={48} width={48} />,
      onPress: () => {
        navigation.navigate('UjianScreen', {});
      },
      totalUnreads: 0,
    },
    {
      name: 'AKM',
      image: <AKM height={48} width={48} />,
      onPress: () => Alert.alert('Fitur Belum Tersedia'),
      totalUnreads: 0,
    },
    {
      name: 'IKM',
      image: <IKM height={48} width={48} />,
      onPress: () => Alert.alert('Fitur Belum Tersedia'),
      totalUnreads: 0,
    },
    {
      name: 'RPP',
      image: <RPP height={48} width={48} />,
      onPress: () => Alert.alert('Fitur Belum Tersedia'),
      totalUnreads: 0,
    },
    {
      name: 'Rapat Virtual',
      image: <RapatVirtual height={48} width={48} />,
      onPress: () => {
        navigation.navigate('RapatVirtualTeacherScreen', {type: 'GURU'});
      },
      totalUnreads: 0,
    },
    {
      name: 'Grup Diskusi',
      image: <FGD height={48} width={48} />,
      onPress: () => {
        _handlerGetGroupInformation();
      },
      totalUnreads: totalUnreadsDiscussionGroup,
    },
    {
      name: 'Projek Pancasila',
      image: <ProyekPancasila height={48} width={48} />,
      onPress: () => {
        navigation.navigate('ProjectPancasilaScreen', {
          service_type: 'guru',
        });
      },
      totalUnreads: totalUnreadsDiscussionGroup,
    },
  ];

  const _handlerGetUnreadDiscussionGroup = async () => {
    try {
      const res = await provider.getDiscusssionGroupUnreads();
      const totalUnreads = res?.data?.data?.unreads || 0;

      setState({
        totalUnreadsDiscussionGroup: totalUnreads,
      });
    } catch (e: any) {}
  };

  const _handlerGetGroupInformation = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getDiscusssionGroupInformation();

      if (res?.status === 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
          navigation.navigate('DiscussionGrupMessageScreen');
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e: any) {
      // errorCode 544 = Discussion group not found
      // errorCode 545 = User is not member of this group

      const errorCode = e?.response?.data?.code;
      const isError = errorCode === 544 || errorCode === 545;

      if (isError) {
        setState({
          popupData: {
            icon: Maskot3,
            title: 'Belum Ada Grup',
            description:
              'Hubungi Admin sekolah untuk dapat mengaktifkan fitur Grup Diskusi.',
            labelCancel: 'Kembali',
            onPressCancel: () => {
              setState({isShowPopup: false});
            },
          },
          isLoading: false,
          isShowPopup: true,
        });
      } else {
        setTimeout(() => {
          setState({isLoading: false});
        }, 500);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {menuguru?.slice(0, show ? 10 : 4).map((i, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={i?.onPress}>
              {i?.image}
              {i.totalUnreads > 0 ? (
                <View style={styles.unreadsContainer}>
                  <Text style={styles.unreadsTitle}>
                    {i.totalUnreads > 10 ? '10+' : i.totalUnreads}
                  </Text>
                </View>
              ) : null}
              <Text style={styles.itemText}>{i.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isLoading ? <LoadingIndicator /> : null}

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
        close={popupData?.onPressCancel}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row', // membuat kolom berdasarkan arah row
    flexWrap: 'wrap', // wrap item ke baris baru jika tidak cukup tempat
    marginBottom: 16,
  },
  item: {
    alignItems: 'center',
    width: Dimensions.get('window').width / numColumns - 10, // mengatur lebar item
    padding: 5,
    marginVertical: 8,
  },
  unreadsContainer: {
    position: 'absolute',
    right: 8,
    top: 0,
    backgroundColor: Colors.danger.base,
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadsTitle: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.white,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    color: Colors.dark.neutral100,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});

export {MenuGuru};
