import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import Icon_logo from '@assets/svg/ic_logo.svg';
import Colors from '@constants/colors';
import FormAuthentication from '@components/organism/FormAuthentication';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const AutentikasiScreen = () => {
  const navigation: any = useNavigation();

  const fetchUserRole = useCallback(async () => {
    const data = await getToken();
    const dataUser = (await AsyncStorage.getItem(Keys.dataUser)) || false;
    if (!dataUser) {
      return;
    }
    const decoded: any = jwtDecode(data) as {user_type_id: Number};
    if (decoded.user_type_id === 1) {
      await navigation.replace('BottomTabNavigator');
    }
    if (decoded.user_type_id === 2) {
      await navigation.replace('BottomTabNavigatorParent');
    }
    if (decoded.user_type_id === 3) {
      await navigation.replace('BottomTabNavigatorMentor');
    }
    if (decoded.user_type_id === 4) {
      await navigation.replace('BottomTabNavigatorKepsek');
    }
    if (decoded.user_type_id === 5) {
      await navigation.replace('BottomTabNavigatorGuru');
    }
    if (decoded.user_type_id === 6) {
      await navigation.replace('BottomTabNavigatorAdmin');
    }
    if (decoded.user_type_id === 7) {
      await navigation.replace('BottomTabNavigatorAdmin');
    }
  }, [navigation]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Bg width={'100%'} height={297} style={styles.bgPosition} />
        <View style={[styles.headerContainer]} />
        <View style={styles.boxTitle}>
          <Icon_logo width={80} height={80} style={styles.marginBottom} />
          <Text style={[styles.title, styles.fontSize]}>Selamat Datang!</Text>
          <Text style={[styles.title, styles.subTitle]}>
            Masuk atau Daftar dengan menggunakan nomor handphone atau email.
          </Text>
        </View>
        <FormAuthentication />
      </View>
    </ScrollView>
  );
};

export {AutentikasiScreen};

const styles = StyleSheet.create({
  marginBottom: {marginBottom: 10},
  bgPosition: {position: 'absolute'},
  fontSize: {fontSize: 24},
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '80%',
    backgroundColor: Colors.primary.base,
  },
  title: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  boxTitle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 40,
  },
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Regular'},
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : 8,
    paddingVertical: 20,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
});
