import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import IconTugas from '@assets/svg/ic64_pr_tugas.svg';
import dayjs from 'dayjs';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useGetLKSDetail} from '@services/lms';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {Header, PopUp} from '@components/atoms';
import {IDetailLKSResponse, ILKSStudent} from '@services/lms/type';
import {hostEndsWith} from '@constants/functional';
import {List} from 'react-native-paper';
import ChevronDown from '@assets/svg/blue_arrow_down.svg';
import ChevronUp from '@assets/svg/blueArrowUp.svg';
import RNFS from 'react-native-fs';
import IconDownload from '@assets/svg/ic24_download_blue.svg';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Config from 'react-native-config';

interface IDetailTaskProps {
  data?: IDetailLKSResponse;
}

const DetailTask: React.FC<IDetailTaskProps> = props => {
  return (
    <List.Accordion
      title={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.dark.neutral100,
            }}>
            Detail
          </Text>
        </View>
      }
      right={props => (props.isExpanded ? <ChevronUp /> : <ChevronDown />)}
      style={{backgroundColor: Colors.white}}>
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <Text style={styles.detailTitle}>Tanggal/Jam Pengerjaan</Text>
        <Text style={styles.detailDate}>
          {dayjs(props.data?.data?.time_start)
            .locale('id')
            .format('dddd, D MMM YYYY • HH:mm') ?? ''}
        </Text>
        <Text style={styles.detailTitle}>Tanggal/Jam Pengumpulan</Text>
        <Text style={styles.detailDate}>
          {dayjs(props.data?.data?.time_finish)
            .locale('id')
            .format('dddd, D MMM YYYY • HH:mm') ?? ''}
        </Text>
        {props.data?.data?.time_finish && (
          <>
            <Text style={styles.detailTitle}>Selesai Dinilai</Text>
            <Text style={styles.detailDate}>
              {dayjs(props.data?.data?.time_correction)
                .locale('id')
                .format('dddd, D MMM YYYY • HH:mm') ?? '-'}
            </Text>
          </>
        )}

        <Text style={styles.detailTitle}>Instruksi Pengerjaan</Text>
        <Text style={[styles.detailDate, {paddingBottom: 0}]}>
          {props.data?.data?.instructions}
        </Text>
      </View>
    </List.Accordion>
  );
};

interface IStudentItemProps {
  data?: ILKSStudent;
}

const StudentItem: React.FC<IStudentItemProps> = props => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
      <View
        style={{width: 36, height: 36, borderRadius: 18, overflow: 'hidden'}}>
        <Image
          source={hostEndsWith(props.data?.path_url ?? '')}
          style={{width: 36, height: 36}}
          resizeMode="contain"
        />
      </View>
      <View style={{flexGrow: 1}}>
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            fontSize: 14,
            color: Colors.dark.neutral100,
          }}>
          {props.data?.full_name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.RegularPoppins,
            fontSize: 12,
            color: Colors.dark.neutral60,
          }}>
          {props.data?.time_finish
            ? dayjs
                .tz(props.data?.time_finish ?? '', 'Asia/Jakarta')
                .locale('id')
                .format('dddd, DD MMM YYYY HH:mm')
            : 'Tidak Mengumpulkan'}
        </Text>
      </View>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor:
            (props.data?.point ?? 0) > 0
              ? Colors.green.light2
              : Colors.danger.light2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.SemiBoldPoppins,
            color:
              (props.data?.point ?? 0) > 0
                ? Colors.success.base
                : Colors.danger.base,
          }}>
          {props.data?.point}
        </Text>
      </View>
    </View>
  );
};

const DetailLKSScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailLKSScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'DetailLKSScreen'>>();

  const [showDownload, setShowDownload] = useState<boolean>(false);

  const {data: screenParam} = route.params;
  const {data: lksDetail} = useGetLKSDetail(
    screenParam.rombel_id,
    screenParam.subject_id,
    screenParam.chapter_id,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail LKS'}
          onPressIconRight={() => setShowDownload(true)}
          iconRight={<IconDownload width={24} height={24} />}
        />
      ),
    });
  }, [navigation]);

  const _renderNotFound = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.notFoundLabel}>Belum Ada LKS Dikumpulkan</Text>
        <Text style={styles.notFoundText}>
          Murid yang telah mengumpulkan LKS akan tampil di sini.
        </Text>
      </View>
    );
  };

  const onClose = () => {
    setShowDownload(false);
  };

  const onDownloadLKS = async () => {
    try {
      // const res = await provider.downloadLKS(
      //   screenParam.rombel_id,
      //   screenParam.subject_id,
      //   screenParam.chapter_id,
      // );

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      // const token = await AsyncStorage.getItem(Keys.token);

      const fileName = `laporan-lks_${year}-${month}-${day}_${hour}-${minute}-${second}.pdf`;
      const mime = 'application/pdf';
      // const url = URL.createObjectURL(new Blob([res.data]));
      // await RNFS.writeFile(filePath, res.data);
      /*await RNFS.downloadFile({
        fromUrl: `${Config.BASEURL}/lms/v1/student-report/lks/history/preview/${screenParam.rombel_id}/${screenParam.subject_id}/${screenParam.chapter_id}`,
        // fromUrl: 'https://www.africau.edu/images/default/sample.pdf',
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*',
          'Accept-Language': 'id',
          Authorization: `Bearer ${token}`,
        },
        toFile: filePath,
      }).promise.then(() => console.log('berhasil download'));*/
      const tokenParse = await JSON.parse(
        (await AsyncStorage.getItem(Keys.token)) || '',
      );

      ReactNativeBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName,
          title: fileName,
          mime,
        },
      })
        .fetch(
          'GET',
          `${Config.BASEURL}/lms/v1/student-report/lks/history/download/${screenParam.rombel_id}/${screenParam.subject_id}/${screenParam.chapter_id}`,
          {Authorization: `Bearer ${tokenParse}`},
        )
        .then(async ress => {
          if (Platform.OS === 'ios') {
            await ReactNativeBlobUtil.fs.cp(
              ress.path(),
              `${RNFS.LibraryDirectoryPath}/${fileName}`,
            );
          } else {
            await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
              {name: fileName, parentFolder: '', mimeType: mime},
              'Download',
              ress.path(),
            );
          }
          Toast.show({
            type: 'success',
            text1: 'Laporan LKS berhasil diunduh.',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Gagal didownload',
          });
        });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `Gagal download ${JSON.stringify(e)}`,
        autoHide: false,
      });
    } finally {
      setShowDownload(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.topContainer}>
          <IconTugas width={64} height={64} />
          <View style={styles.topRight}>
            <Text style={styles.topTitle}>
              {lksDetail?.data?.rombel ?? '-'} • LKS •{' '}
              {lksDetail?.data?.subject}
            </Text>
            <Text style={styles.topLabel}>
              {lksDetail?.data?.chapter ?? '-'}
            </Text>
          </View>
        </View>
        <View style={styles.rectangle} />
        <DetailTask data={lksDetail} />
        <View style={[styles.rectangle, {marginBottom: 0}]} />
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            fontSize: 14,
            color: Colors.dark.neutral100,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          {lksDetail?.data?.total_finish}
        </Text>
        {lksDetail?.data?.student && lksDetail?.data?.student.length < 1 ? (
          _renderNotFound()
        ) : (
          <View style={{padding: 16, gap: 28}}>
            {lksDetail?.data?.student?.map((studentItem, index: number) => {
              return <StudentItem data={studentItem} key={index} />;
            })}
          </View>
        )}
      </ScrollView>
      <PopUp
        title="Unduh Laporan LKS"
        desc={`Apakah Anda yakin untuk mengunduh 
Laporan LKS ${lksDetail?.data?.chapter}?`}
        show={showDownload}
        close={onClose}
        titleConfirm="Unduh"
        titleCancel="Batalkan"
        actionCancel={onClose}
        actionConfirm={onDownloadLKS}
      />
    </View>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  containerTab: {flex: 1, backgroundColor: Colors.white},
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  topRight: {flexDirection: 'column', marginLeft: 16, flex: 1},
  contentContainerStyle: {
    gap: 28,
    backgroundColor: Colors.white,
  },
  topTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    letterSpacing: 0.25,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  topLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    letterSpacing: 1,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  rectangle: {
    width: window.width,
    height: 4,
    backgroundColor: Colors.dark.neutral10,
  },
  taskDetail: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    letterSpacing: 0.25,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
  },
  detailContainer: {
    flexDirection: 'column',
  },
  detailTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    letterSpacing: 0.25,
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 8,
    color: Colors.dark.neutral60,
  },
  detailDate: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    letterSpacing: 0.25,
    fontSize: 14,
    lineHeight: 22,
    paddingBottom: 8,
    color: Colors.dark.neutral100,
  },

  navigatorTabBarStyle: {
    height: 45,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  navigatorTabIndicatorStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  labelStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  labelActiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary?.base,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  notFoundContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 86,
  },
  notFoundLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    letterSpacing: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 12,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  notFoundText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    letterSpacing: 1,
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 6,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonStyle: {
    alignSelf: 'center',
    width: window.width * 0.9,
  },
  textFinish: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '600',
  },
  popUpFinishContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  __wrapIconAndText: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    gap: 12,
  },
  __regularText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  swipeUpContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default DetailLKSScreen;
