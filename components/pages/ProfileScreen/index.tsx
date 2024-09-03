import React from 'react';
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
// import {GroupMentorWidget} from './component/GroupMentorWidget';
import {ActivePackageWidget} from './component/ActivePackageWidget';
import {AccountSettingsWidget} from './component/AccountSettingsWidget';
import {HelpCenterWidget} from './component/HelpCenterWidget';
import {Button, PopUp} from '@components/atoms';
import useProfile from './useProfile';
import {CardUserWidget} from './component/CardUserWidget';
import UnlinkAccount from '@components/organism/UnlinkAccount';
import MaskotSad from '@assets/svg/maskot_11.svg';
import {UserIdentityWidget} from './component/UserIdentityWidget';
import {appVersion} from '@constants/functional';
import Maskot1 from '@assets/svg/maskot_1.svg';

/*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

const ProfileScreen = () => {
  const {
    isShowPopup,
    popupData,
    userTypeId,
    data,
    visible,
    show,
    packageDetail,
    setShow,
    setVisible,
    onCloseSwipeUp,
    onCloseAlert,
    onCancelConnection,
    _handlerLogout,
    showLogoutPopup,
    setShowLogoutPopup,
  } = useProfile();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

        <View style={styles.cardContainer}>
          <UserIdentityWidget userTypeId={userTypeId} />
          <CardUserWidget
            userData={data}
            setVisible={setVisible}
            userTypeId={userTypeId}
          />
          {/* <GroupMentorWidget /> */}
          <ActivePackageWidget
            userTypeId={userTypeId}
            packageDetail={packageDetail}
          />
          <AccountSettingsWidget userTypeId={userTypeId} />
          <HelpCenterWidget />
          <Button
            danger
            label={'Keluar'}
            action={() => setShowLogoutPopup(true)}
          />
          <Text style={styles.version}>v.{appVersion}</Text>
        </View>
      </ScrollView>

      <UnlinkAccount
        height={100}
        title="Batal Hubungkan Akun orang tua"
        visible={visible}
        show={show}
        buttonPosition="vertical"
        onClose={onCloseSwipeUp}
        actionCancel={onCloseAlert}
        actionConfirm={onCancelConnection}
        titleCancel="Kembali"
        titleConfirm="Batalkan"
        type={'anak'}
        setShow={setShow}
        close={onCloseAlert}
        desc="Permintaan hubungkan akun yang telah dikirim ke orang tua akan dibatalkan."
        Icon={MaskotSad}
        coverScreen
      />

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
      />

      <PopUp
        show={showLogoutPopup}
        Icon={Maskot1}
        title={'Keluar Aplikasi'}
        desc={'Apakah kamu yakin untuk keluar dari akun Kelas Pintar?'}
        titleConfirm={'Batal'}
        actionConfirm={() => setShowLogoutPopup(false)}
        titleCancel={'Keluar'}
        actionCancel={_handlerLogout}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  cardContainer: {
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
  version: {
    textAlign: 'center',
    marginVertical: 16,
    color: Colors.dark.neutral100,
  },
});
