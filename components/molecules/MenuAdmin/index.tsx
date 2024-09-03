/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import DaftarMurid from '@assets/svg/ic48_daftar_murid.svg';
import DaftarGuru from '@assets/svg/ic48_daftar_guru.svg';
import RapatVirtual from '@assets/svg/ic48_Rapat_Virtual.svg';
import FGD from '@assets/svg/ic48_Forum_alert.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {PopUp, SwipeUp} from '@components/atoms';
import {showErrorToast, useMergeState} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {SCREEN_NAME} from '@constants/screen';
import provider from '@services/lms/provider';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import Arrow from '@assets/svg/ic_arrow_grey_right.svg';
import IconKehadiran from '@assets/svg/ic24_kehadiran.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const numColumns = 4; // jumlah kolom yang diinginkan
const MenuAdmin = () => {
  const navigation: any = useNavigation();
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    isShowSwipe: false,
    totalUnreadsDiscussionGroup: 0,
  });

  const {
    isLoading,
    isShowPopup,
    popupData,
    totalUnreadsDiscussionGroup,
    isShowSwipe,
  }: any = state;
  const {getClassByDegree}: any = useSelector((state: RootState) => state);
  const classByDegree = getClassByDegree?.data;
  useEffect(() => {
    _handlerGetUnreadDiscussionGroup();
  }, []);

  const menuadmin = [
    {
      name: 'Daftar Guru',
      image: <DaftarGuru height={48} width={48} />,
      onPress: () => {
        navigation.navigate('TeacherListMenuScreen');
      },
      totalUnreads: 0,
    },
    {
      name: 'Daftar Murid',
      image: <DaftarMurid height={48} width={48} />,
      onPress: () => {
        setState({isShowSwipe: true});
      },
      totalUnreads: 0,
    },
    {
      name: 'Rapat Virtual',
      image: <RapatVirtual height={48} width={48} />,
      onPress: () =>
        navigation.navigate('RapatVirtualTeacherScreen', {type: 'ADMIN'}),
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

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
          navigation.navigate(SCREEN_NAME.DiscussionGrupMessageScreen, {});
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
      const isError544 = errorCode === 544;
      const isError545 = errorCode === 545;

      if (isError544) {
        setState({
          popupData: {
            icon: Maskot3,
            title: 'Belum Ada Grup',
            description: 'Apakah Anda yakin untuk membuat Grup Diskusi?.',
            labelConfirm: 'Buat Grup',
            labelCancel: 'Batal',
            onPressConfirm: () => {
              navigation?.navigate('DiscussionCreateGroupScreen');
              setState({isShowPopup: false});
            },
            onPressCancel: () => {
              setState({isShowPopup: false});
            },
          },
          isLoading: false,
          isShowPopup: true,
        });
      } else if (isError545) {
        showErrorToast(e?.response?.data?.message);
        setTimeout(() => {
          setState({isLoading: false});
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
        {menuadmin?.map((i, index) => {
          return (
            <TouchableOpacity
              onPress={i?.onPress}
              key={index}
              style={styles.item}>
              {i?.image}
              {i.totalUnreads > 0 ? (
                <View style={styles.unreadsContainer}>
                  <Text style={styles.unreadsTitle}>
                    {i.totalUnreads > 9 ? '9+' : i.totalUnreads}
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
      <SwipeUp
        height={500}
        visible={isShowSwipe}
        isSwipeLine={true}
        onClose={() => setState({isShowSwipe: false})}
        children={
          <>
            <View style={styles.containerSwipe}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StudentAbsenceListRombelScreen');
                  setState({isShowSwipe: false});
                }}
                style={styles.itemClass}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <IconKehadiran width={20} height={20} />
                    <Text
                      style={[
                        styles.titleSwipe,
                        {fontSize: 14, marginVertical: 0},
                      ]}>
                      Pengajuan Ketidakhadiran Murid
                    </Text>
                  </View>
                  <Text style={styles.desc}>
                    Lihat pengajuan murid yang izin atau sakit
                  </Text>
                </View>
                <Arrow />
              </TouchableOpacity>
              <Text style={styles.titleSwipe}>Daftar Kelas</Text>
              <ScrollView>
                {classByDegree?.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.itemClass}
                      onPress={() => {
                        navigation.navigate('StudentListMenuScreen', {
                          classId: item.id,
                          className: item.name,
                        });
                        setState({isShowSwipe: false});
                      }}>
                      <Text
                        style={[
                          styles.titleSwipe,
                          {fontSize: 14, marginVertical: 0},
                        ]}>
                        {item.name}
                      </Text>
                      <Arrow />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <TouchableOpacity style={styles.btnSwipe}>
                <Text style={styles.btnSwipeLabel}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row', // membuat kolom berdasarkan arah row
    flexWrap: 'wrap', // wrap item ke baris baru jika tidak cukup tempat
  },
  item: {
    alignItems: 'center',
    width: Dimensions.get('window').width / numColumns - 20, // mengatur lebar item
    padding: 5,
    marginVertical: 8,
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
  containerSwipe: {
    height: 500,
    paddingBottom: 50,
    padding: 16,
    backgroundColor: Colors.white,
  },
  btnSwipe: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.primary.base,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    marginVertical: 16,
  },
  itemClass: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 5,
    alignItems: 'center',
  },
  btnSwipeLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
  },
});

export {MenuAdmin};
