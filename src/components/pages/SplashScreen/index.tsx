import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import Colors from '@constants/colors';
import SplashImage from '@assets/svg/splash.svg';
import {useSplashScreen} from './useSplashScreen';
import {PopUp} from '@components/atoms';
import RobotUpdate from '@assets/svg/robot_update.svg';

type Props = {
  navigation: any;
};

const SplashScreen: FC<Props> = ({navigation}) => {
  const {showPopupUpdate, handleUpdateVersion} = useSplashScreen(navigation);

  return (
    <>
      <View style={styles.container}>
        <SplashImage />
      </View>

      <PopUp
        show={showPopupUpdate}
        Icon={RobotUpdate}
        title="Update Version"
        subtitle="Hai Sobat Pintar! 🌟 Aplikasi-mu membutuhkan pembaruan ke versi terbaru agar tetap berjalan dengan baik 😊📲"
        titleConfirm="Update Versi Terbaru"
        actionConfirm={handleUpdateVersion}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

export {SplashScreen};
