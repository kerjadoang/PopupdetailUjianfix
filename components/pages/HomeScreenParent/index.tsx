/* eslint-disable react-native/no-inline-styles */
import {
  // AboutSchool,
  HeaderBerandaNonMurid,
  // MenuGuru,
} from '@components/molecules';
import {AnakSaya} from '@components/organism';
import useAnakSaya from '@components/organism/AnakSaya/useAnakSaya';
import UnlinkAccount from '@components/organism/UnlinkAccount';

import Colors from '@constants/colors';
import {SCREEN_NAME} from '@constants/screen';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';

import MaskotSad from '@assets/svg/maskot_11.svg';
import {Keys} from '@constants/keys';
import {useCoachmark} from '@hooks/useCoachmark';
import RobotSad from '@assets/svg/robot_sedih.svg';
import {Button, PopUp} from '@components/atoms';
import Fonts from '@constants/fonts';
import {useCheckListPackageNotAssigned} from '@services/uaa';

import RobotGembira from '@assets/svg/robot_gembira.svg';
import {useNavigate} from '@hooks/useNavigate';
import Information from '@components/organism/Information';
import Promo from '@components/organism/Promo';

const HomeScreenParent = () => {
  const {navigateScreen} = useNavigate();

  const {
    visible,
    show,
    onCloseAlert,
    onCancelConnection,
    onCloseSwipeUp,
    setShow,
    setVisible,
    getAllChildren,
  } = useAnakSaya();

  const {isHaveUnAssignedPackages} = useCheckListPackageNotAssigned();
  const [openModalAssignMurid, setOpenModalAssignMurid] = useState(false);

  const {Coachmarks, doneCoachMark, _handlerCoachmark} = useCoachmark(
    Keys.coachmark_mobile_dashboard,
  );
  const [refForScroll, setRefForScroll] = useState<any>(null);

  useEffect(() => {
    // dispatch(fetchGetUser());
    if (isHaveUnAssignedPackages) {
      setOpenModalAssignMurid(isHaveUnAssignedPackages);
    }
  }, [isHaveUnAssignedPackages]);

  const onVisible = (student_id: string) => {
    setVisible({status: true, student_id});
  };

  const navigateToLinkAccount = () => {
    navigateScreen(SCREEN_NAME.LinkAccountScreen, {
      title: 'orangtua',
    });
  };

  const _renderEmptyChildren = () => (
    <View style={[styles.cardEmpty, styles.shadowProp]}>
      <RobotSad width={100} height={100} />
      <Text style={styles.label}>Anak Belum Terhubung</Text>
      <Text style={styles.text}>
        Tambah akun anak untuk pantau aktivitas dan progres belajar anak.
      </Text>
      <Button
        label="+ Tambah Akun Anak"
        style={styles.button}
        action={navigateToLinkAccount}
      />
    </View>
  );

  const onCheckAvailablePackage = () => {
    setOpenModalAssignMurid(false);
    navigateScreen(SCREEN_NAME.CartHistoryScreen, {
      activeTab: 1,
    });
  };

  return (
    <SafeAreaView
      style={[
        {
          flexDirection: 'column',
          flex: 1,
        },
      ]}>
      <View style={{height: 'auto'}}>
        <HeaderBerandaNonMurid type={'Orang Tua'} />
      </View>
      <View
        style={{
          flex: 2,
          position: 'relative',
          backgroundColor: '#F9FCFF',
          zIndex: 1,
          padding: 16,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: '-5%',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(ref: any) => setRefForScroll(ref)}>
          {getAllChildren?.data?.length !== 0 ? (
            <View>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.anakSaya}>Anak Saya</Text>
                <Pressable onPress={navigateToLinkAccount}>
                  <Text style={styles.tambahAkun}>+ Tambah Akun</Text>
                </Pressable>
              </View>
              <AnakSaya
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                scrollViewRef={refForScroll}
                cancelConnection={onVisible}
                _handlerCoachmark={_handlerCoachmark}
              />
            </View>
          ) : (
            _renderEmptyChildren()
          )}

          <Promo />
          <Information />
        </ScrollView>
        <PopUp
          close={() => setOpenModalAssignMurid(false)}
          Icon={RobotGembira}
          title="Paket Telah Aktif"
          desc="Yeay ! Mari mulai perjalanan belajar anda bersama kelas pintar!"
          titleCancel="Kembali"
          titleConfirm="Masuk"
          actionConfirm={onCheckAvailablePackage}
          actionCancel={() => setOpenModalAssignMurid(false)}
          show={openModalAssignMurid}
        />
      </View>
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
        setShow={setShow}
        close={onCloseAlert}
        desc="Permintaan hubungkan akun yang telah dikirim ke anak akan dibatalkan."
        Icon={MaskotSad}
        coverScreen
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  anakSaya: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
  tambahAkun: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  sectionContainer: {
    // flex: 1,
  },
  content: {
    // backgroundColor: 'red',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height: '100%',
    // marginTop: -40,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  cardEmpty: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  label: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: 'center',
    marginTop: 12,
    color: Colors.dark.neutral100,
  },
  text: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    marginTop: 6,
    color: Colors.dark.neutral60,
    marginBottom: 12,
  },
});

export default HomeScreenParent;
