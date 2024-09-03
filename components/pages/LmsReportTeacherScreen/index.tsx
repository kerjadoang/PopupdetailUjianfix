import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '@constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {data_list} from './useDummy';
import Plus from '@assets/svg/ic56_floating_plus.svg';
import Right from '@assets/svg/ic_arrow_right_grey.svg';
import useFormLMSReportTeacher from './useFormLMSReportTeacher';
import Hat_red from '@assets/svg/ic_hat_red.svg';
import Hat_blue from '@assets/svg/ic_hat_blue.svg';
import Hat_grey from '@assets/svg/ic_hat_grey.svg';
import {SwipeUp} from '@components/atoms';
import Ic24TambahKelas from '@assets/svg/ic24_Tambah_Kelas.svg';
import Ic24TambahMateri from '@assets/svg/ic24_Tambah_materi.svg';
import Ic24TambahPR from '@assets/svg/ic24_tambah_PR.svg';
import Ic24TambahUjian from '@assets/svg/ic24_tambah_ujian.svg';
const LmsReportTeacherScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LmsReportTeacherScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Murid'}
          iconLeft
          backgroundColor={Colors.primary.base}
          colorLabel={Colors.white}
        />
      ),
    });
  }, [navigation]);
  const [isShowSwipeUpMenu, setIsShowSwipeUpMenu] = useState<boolean>(false);
  const MenuFAB = [
    {
      id: 1,
      icon: <Ic24TambahKelas width={24} height={24} />,
      title: 'Buat Sesi Kelas',
      backgroundColor: Colors.pink.light,
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('LMSTeacherFormClassSessionScreen', {});
      },
    },
    {
      id: 2,
      icon: <Ic24TambahMateri width={24} height={24} />,
      title: 'Unggah Materi Sekolah',
      backgroundColor: Colors.lightBlue.light2,
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('AddSchoolMaterialsScreen');
      },
    },
    {
      id: 3,
      icon: <Ic24TambahPR width={24} height={24} />,
      backgroundColor: Colors.green.light2,
      title: 'Buat PR/Projek/Tugas',
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('LMSTeacherTaskCreateScreen', {});
      },
    },
    {
      id: 4,
      icon: <Ic24TambahUjian width={24} height={24} />,
      backgroundColor: Colors.violet.light2,
      title: 'Jadwalkan Ujian',
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('UjianScreen', {});
      },
    },
  ];
  const _renderSwipeUpUpMenu = () => {
    return (
      <View style={styles.containerSwipeUp}>
        {MenuFAB?.map((i: any, idx: number) => (
          <TouchableOpacity
            key={idx}
            onPress={i?.onPress}
            style={[
              styles.containerFAB,
              {backgroundColor: i?.backgroundColor ? i.backgroundColor : null},
            ]}>
            <View style={styles.subContainerFAB}>
              {i?.icon}
              <Text style={styles.titleFAB}>{i?.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const handlePress = (itemId: number) => {
    switch (itemId) {
      case 1:
        navigation.navigate('InputScoreKKMScreen', {id: itemId});
        break;
      case 2:
        navigation.navigate('ChooseClassScreen', {});
        break;
      case 3:
        navigation.navigate('ERaportGuruChooseClassScreen');
        break;
      default:
        navigation.navigate('LMSTeacherLaporanKehadiranMuridScreen');
        break;
    }
  };
  const {listClass} = useFormLMSReportTeacher();

  return (
    <SafeAreaView style={styles.container}>
      <Bg width={'100%'} height={297} style={{position: 'absolute'}} />
      <View style={styles.scrollView}>
        <View style={styles.listRow}>
          {data_list.map((item: any) => (
            <Pressable
              key={`listMenuLMSRTS${item?.id * Math.random()}`}
              style={styles.buttonList}
              onPress={() => {
                handlePress(item?.id);
              }}>
              {item.icon}
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
        <View>
          <Text style={styles.title}>Laporan Kelas</Text>
          <Text style={styles.subTitle}>
            Daftar murid, laporan tugas, dan ujian
          </Text>
        </View>
        <View style={styles.listContent}>
          <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            {listClass?.map((item: any, key: any) => (
              <Pressable key={key}>
                <View style={{marginVertical: 5}}>
                  <View style={styles.contentHeader} key={key}>
                    {key % 3 === 0 ? (
                      <Hat_red width={20} height={20} />
                    ) : key % 3 === 1 ? (
                      <Hat_blue width={20} height={20} />
                    ) : (
                      <Hat_grey width={20} height={20} />
                    )}
                    <Text style={[styles.title, {fontSize: 14, marginLeft: 5}]}>
                      {item?.name}
                    </Text>
                  </View>
                  <View style={styles.contentClass}>
                    {item?.rombel_class_school?.map((i: any, key: any) => (
                      <Pressable
                        key={key}
                        onPress={() =>
                          navigation.navigate('ClassReportScreen', {
                            id: i,
                          })
                        }
                        style={[styles.buttonClass, styles.shadowProp]}>
                        <Text
                          style={[styles.title, {fontSize: 14, marginLeft: 5}]}>
                          {i.name}
                        </Text>
                        <Right width={16} height={16} />
                      </Pressable>
                    ))}
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <Pressable style={styles.circle}>
        <Plus
          width={56}
          height={56}
          onPress={() => setIsShowSwipeUpMenu(true)}
        />
      </Pressable>
      <SwipeUp
        height={100}
        visible={isShowSwipeUpMenu}
        onClose={() => setIsShowSwipeUpMenu(false)}
        children={_renderSwipeUpUpMenu()}
      />
    </SafeAreaView>
  );
};

export {LmsReportTeacherScreen};
