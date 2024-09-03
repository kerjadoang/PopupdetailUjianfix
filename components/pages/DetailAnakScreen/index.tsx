import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Fonts from '@constants/fonts';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
// import {GroupMentorWidget} from './component/GroupMentorWidget';
import {ActivePackageWidget} from './component/ActivePackageWidget';
import {UserIdentityWidget} from './component/UserIdentityWidget';
import {ScoreStatusWidget} from './component/ScoreStatusWidget';
import ViewTwoColumns from './component/ViewTwoColumns';
import {AnnouncementWidget} from './component/AnnouncementWidget';
import {ScheduleWidget} from './component/ScheduleWidget';
import {ActivitiesWidget} from './component/ActivitiesWidget';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons2 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {SwipeUp, Button} from '@components/atoms';
import {SvgUri} from 'react-native-svg';
import IconPhone from '@assets/svg/ic24_phone.svg';
import IconMail from '@assets/svg/mail.svg';
import IconSchool from '@assets/svg/Sekolah.svg';
import {fetchSchool, fetchXp} from '@redux';
import UnlinkAccount from '@components/organism/UnlinkAccount';
import {useCancelConnection} from '@services/uaa';
import MaskotSad from '@assets/svg/maskot_11.svg';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import apiWithoutToken from '@api/withoutToken';
import {rdxDispatch} from '@constants/functional';
import {RootState} from 'src/redux/rootReducer';
import useRankTable from '@components/organism/RankTable/useRankTable';
/*
  USER_TYPE_ID
  1. Murid
  2. Parent
  3. Mentor
  4. Kepsek
  5. Guru
  6. Admin
 */
const window = Dimensions.get('window');
// interface RootState {
//   school: any;
// }

const DetailAnakScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  const [detailUser, setDetailUser] = useState<IBaseUser>({});
  const [isShowAboutSchool, setIsShowAboutSchool] = useState(false);
  const {currentUserRank} = useRankTable(route?.params?.user?.access_token);
  const school = useSelector((state: RootState) => state.school);
  const data = [
    {
      title: 'Laporan Belajar',
      description: 'Presensi, Nilai, Rapor',
      image: require('@assets/images/ic24_erapor.png'),
      action: () =>
        navigation.navigate('LearningReportStudentOnParentScreen', {
          data: route?.params?.user,
        }),
    },
    {
      title: 'Administrasi',
      description: 'Unggah bukti pembayaran',
      image: require('@assets/images/ic24_administrasi.png'),
      action: () =>
        navigation.navigate('AdminListDetailScreen', {
          ...detailUser,
          user_id: detailUser?.id,
          full_name: detailUser?.full_name,
          rombel_class_school_name:
            detailUser?.rombel_class_school_user?.[0]?.rombel_class_school
              ?.name,
          rombel_class_school_id:
            detailUser?.rombel_class_school_user?.[0]?.rombel_class_school?.id,
          class_id:
            detailUser?.rombel_class_school_user?.[0]?.rombel_class_school
              ?.class_id,
          class_name:
            detailUser?.rombel_class_school_user?.[0]?.rombel_class_school
              ?.name,
          registration_number: detailUser?.registration_number,
        }),
    },
    {
      title: 'Tentang Sekolah',
      description: '',
      image: require('@assets/images/ic24_school.png'),
      action: () => setIsShowAboutSchool(true),
    },
    {
      title: 'Grup',
      description: '2 Grup dengan mentor',
      image: require('@assets/images/ic24_user_group.png'),
      // eslint-disable-next-line no-console
      action: () => console.log('Group'),
    },
  ];

  useEffect(() => {
    if (route?.params?.user?.school_id !== 0) {
      rdxDispatch(fetchSchool(route?.params?.user?.school_id));
    }
    getUser();
  }, []);

  const getUser = async () => {
    rdxDispatch(fetchXp(route?.params?.user?.access_token));
    apiWithoutToken
      .get(`/uaa/v1/user/get-user/${route?.params?.user?.user_id}`, {
        headers: {
          Authorization: `Bearer ${route?.params?.user?.access_token}`,
        },
      })
      .then(response => {
        setDetailUser(response?.data?.data);
      });
  };

  const renderChildrenSwipeUpAboutSchool = () => {
    const {params} = route;
    const {user} = params;
    const {account_type, school_name} = user;
    const {data}: any = school;
    if (account_type === 'b2b') {
      return (
        <View style={styles.swipeUpContainer}>
          {data?.degree?.icon_path_url?.endsWith('svg') ? (
            <SvgUri uri={data?.degree?.icon_path_url} height={72} width={72} />
          ) : (
            <Image
              style={{width: 72, height: 72}}
              source={{
                uri: data?.icon_path_url,
              }}
            />
          )}
          <Text style={[styles.schoolTitle, {marginTop: 12, fontSize: 18}]}>
            {data?.name || '-'}
          </Text>
          <View style={styles.address}>
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <IconSchool />
              <Text style={styles.addressTitle}>{data?.name}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <IconPhone />
              <Text style={styles.addressTitle}>{data?.phone_number}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <IconMail />
              <Text style={styles.addressTitle}>{data?.email}</Text>
            </View>
          </View>
          <Button
            label={'Tutup'}
            style={styles.closeButton}
            background={Colors.primary.base}
            color={Colors.white}
            action={() => {
              setIsShowAboutSchool(false);
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.swipeUpContainer}>
          <Text
            style={[styles.schoolTitle, {marginVertical: 14, fontSize: 18}]}>
            {school_name}
          </Text>
        </View>
      );
    }
  };

  const onVisible = (student_id: string) => {
    setVisible({status: true, student_id});
  };
  const [show, setShow] = useState<boolean>(false);
  const [visible, setVisible] = useState<{status: boolean; student_id: string}>(
    {
      status: false,
      student_id: '',
    },
  );
  const onCloseSwipeUp = useCallback(() => {
    setVisible({status: false, student_id: ''});
  }, []);

  const onCloseAlert = useCallback(() => {
    setShow(false);
  }, []);

  const {mutate} = useCancelConnection();
  const onCancelConnection = () => {
    mutate('orangtua', {student_id: Number(visible.student_id)}).then(() => {
      navigation.goBack();
      setShow(false);
      setVisible({status: false, student_id: ''});
      Toast.show({
        type: 'success',
        text1: 'Hubungkan akun berhasil dibatalkan.',
      });
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.flexRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="chevron-left" size={24} style={{color: Colors.white}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{route?.params?.user?.full_name}</Text>
        <TouchableOpacity
          onPress={() => onVisible(route?.params?.user?.user_id)}>
          <Icons2 name="ellipsis-h" size={24} style={{color: Colors.white}} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

        <View style={styles.cardContainer}>
          <UserIdentityWidget
            image={route?.params?.user?.path_url}
            name={route?.params?.user?.full_name}
            class_name={route?.params?.user?.rombel_name}
            school_name={route?.params?.user?.school_name}
          />

          <View style={{marginTop: 16}}>
            <ScoreStatusWidget
              data={route?.params?.user}
              coin={detailUser?.coin}
              xp={currentUserRank?.xp}
            />
          </View>

          <View style={styles.hrStyle} />

          <ActivePackageWidget
            userTypeId={1}
            token={route?.params?.user?.access_token}
          />

          <ViewTwoColumns data={data} />
          <AnnouncementWidget />
          <View style={{marginTop: '0%'}}>
            <ScheduleWidget dataAnak={route?.params?.user} create={true} />
          </View>
          <ActivitiesWidget userData={route.params.user} />
        </View>
      </ScrollView>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowAboutSchool}
        onClose={() => {
          setIsShowAboutSchool(false);
        }}
        height={500}
        children={renderChildrenSwipeUpAboutSchool()}
      />

      <UnlinkAccount
        height={100}
        title="Batal Hubungkan Akun Anak"
        visible={visible.status}
        show={show}
        buttonPosition="vertical"
        onClose={onCloseSwipeUp}
        actionCancel={onCloseAlert}
        actionConfirm={onCancelConnection}
        titleCancel="Kembali"
        titleConfirm="Batalkan Akun"
        type={'orangtua'}
        additionalContent={
          <View>
            <Text style={styles.desc}>
              Akun anak{' '}
              <Text style={{fontWeight: 'bold'}}>
                {route?.params?.user?.full_name}
              </Text>{' '}
              yang terhubung akan dibatalkan.
            </Text>
          </View>
        }
        setShow={setShow}
        close={onCloseAlert}
        Icon={MaskotSad}
        coverScreen
      />
    </View>
  );
};

export {DetailAnakScreen};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  cardContainer: {
    // flex: 1,
    marginTop: '30%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    paddingBottom: 32,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  hrStyle: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.dark.neutral40,
    marginVertical: 16,
  },
  flexRow: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.base,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '600',
  },
  swipeUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginVertical: 8,
  },
  addressTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.25,
    paddingLeft: 5,
    color: Colors.dark.neutral80,
  },
  schoolTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  swpBottomContentSoal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  closeButton: {
    width: window.width * 0.9,
  },
  containerSwipeUp: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  titleSwipeUp: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 16,
  },
  desc: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral80,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
});
