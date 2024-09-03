import React, {useEffect} from 'react';
import Logo from '@assets/svg/maskot_8.svg';
import {Text, View} from 'react-native';
import {styles} from './style';
import useSuccessRegister from './useSuccessRegister';

const SuccessRegisterScreen = ({}) => {
  const {_handlerNavigationToBottomNavigator} = useSuccessRegister();

  useEffect(() => {
    setTimeout(() => {
      _handlerNavigationToBottomNavigator();
    }, 1500);
  }, []);

  const _renderScreen = () => {
    return (
      <View style={styles.contentContainer}>
        <Logo width={180} height={180} style={styles.maskotIcon} />
        <Text style={styles.title}>{'Daftar Sukses!'}</Text>
        <Text style={styles.subtitle}>
          {'Akun Kelas Pintar berhasil dibuat.'}
        </Text>
      </View>
    );
  };

  return _renderScreen();
};

export {SuccessRegisterScreen};
