import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import useRemoveAccount from './useRemoveAccount';
import {Button, Header, PopUp} from '@components/atoms';
import Ic24_info from '@assets/svg/ic24_info_custom.svg';
import Colors from '@constants/colors';
import {styles} from './styles';
import RobotIcon from '@assets/svg/robot_sedih.svg';
import CryRobotIcon from '@assets/svg/Robot_cry.svg';
import IconClose from '@assets/svg/ic24_x_round_red.svg';
import Checkbox from '@assets/svg/Checkbox_unselect.svg';
import CheckboxSelected from '@assets/svg/Checkbox_selected.svg';

const RemoveAccountScreen = () => {
  const {
    navigation,
    checkedAgreement,
    setCheckedAgreement,
    isShowPopUp,
    setIsShowPopUp,
    _handleSendOTP,
  } = useRemoveAccount();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Hapus Akun'} />,
    });
  }, [navigation]);

  const _renderApproveSection = () => {
    const features = [
      {
        text: 'Fitur Kelas Pintar Reguler',
      },
      {
        text: 'Fitur Tanya',
      },
      {
        text: 'Fitur Guru',
      },
      {
        text: 'Fitur Perguruan Tinggi Negeri',
      },
    ];
    return (
      <View>
        <View style={styles.infoHeader}>
          <Ic24_info
            width={24}
            height={24}
            style={styles.iconInfo}
            color={Colors.primary.light1}
          />
          <View style={{width: '90%'}}>
            <Text style={styles.textInfo}>
              <Text style={[styles.textInfo, styles.textInfoBold]}>
                Akses akun akan hilang
              </Text>{' '}
              dan tidak bisa diakses kembali.
            </Text>
          </View>
        </View>
        <View>
          <RobotIcon width={100} height={100} style={styles.robotIcon} />
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Jika Kamu menghapus akun, kamu akan kehilangan akses ke fitur:
            </Text>
            {features?.map((obj: any, index: number) => (
              <View key={index} style={styles.featuresContainer}>
                <IconClose width={24} height={24} />
                <Text style={styles.textFeature}>{obj?.text}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.textTitle, styles.textTitleLeft]}>
            Konsekuensi Penghapusan Akun
          </Text>
          <Text style={styles.textDescription}>
            Proses penghapusan akun ini tidak dapat dibatalkan. Jika kamu masih
            ingin menghapus akun, maka akunmu akan hilang secara permanen dan
            semua data akan hilang, silahkan klik tombol lanjutkan untuk
            penghapusan secara permanen.
          </Text>
          <View style={styles.agreementContainer}>
            <TouchableOpacity
              onPress={() => setCheckedAgreement(!checkedAgreement)}>
              {checkedAgreement ? (
                <CheckboxSelected width={24} height={24} />
              ) : (
                <Checkbox width={24} height={24} />
              )}
            </TouchableOpacity>
            <Pressable
              onPress={() =>
                navigation.navigate('PusatBantuanScreen', {
                  type: 'WEBVIEW',
                  webviewUrl: 'https://www.kelaspintar.id/syarat-dan-ketentuan',
                  title: 'Syarat & Ketentuan',
                })
              }>
              <Text style={styles.agreementText}>
                {'Saya telah membaca '}
                <Text style={[styles.agreementText, styles.agreementTextBlue]}>
                  Kebijakan Privasi Kelas Pintar
                </Text>
                {' dan menyetujui penghapusan akun '}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {_renderApproveSection()}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          label="Lanjutkan"
          style={styles.button}
          isDisabled={!checkedAgreement}
          action={() => setIsShowPopUp(true)}
        />
      </View>
      <PopUp
        show={isShowPopUp}
        title="Hapus Akun"
        desc={
          'Apakah kamu yakin untuk menghapus Akun? Akun akan dihapus permanen setelah 30 Hari.'
        }
        Icon={CryRobotIcon}
        titleCancel="Batal"
        titleConfirm="Hapus"
        actionCancel={() => {
          setIsShowPopUp(false);
        }}
        actionConfirm={_handleSendOTP}
      />
    </View>
  );
};

export {RemoveAccountScreen};
