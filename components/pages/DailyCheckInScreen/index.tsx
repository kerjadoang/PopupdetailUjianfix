/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

import {styles} from './style';
import {PopUp} from './components';
import Colors from '@constants/colors';
import GiftIcon from '@assets/svg/daily_check_in_giftIcon.svg';
import BottomBoxGift from '@assets/svg/daily_check_in_39942.svg';
import Vector1 from '@assets/svg/daily_check_in_vector1.svg';
import Vector2 from '@assets/svg/daily_check_in_vector2.svg';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';
import {claimReward} from '@redux';
const HEIGHT = Dimensions.get('window').height;

const DailyCheckInScreen: FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [giftBoxOpen, setGiftBoxOpen] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getToken();
        const decoded = jwtDecode(data) as {fullname: string};
        setName(decoded?.fullname);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={14} color={Colors.primary.base} />
          </TouchableOpacity>

          <Text style={styles.topBar__text}>Koin Hadiah</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('HomeCoinScreen')}>
            <GiftIcon />
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={require('@assets/images/daily_check_in_39941.png')}
          style={styles.middleContainer}>
          <Text style={styles.middleContainer__title}>
            {giftBoxOpen
              ? 'Hadiah Hari Ini Sudah Diklaim'
              : `Halo, ${name}!\nKlaim Hadiah Harianmu`}
          </Text>

          <Text style={styles.middleContainer__description}>
            {giftBoxOpen
              ? 'Klaim hadiahnya lagi besok!'
              : 'Ketuk hadiah di bawah ini'}
          </Text>
        </ImageBackground>

        <View
          style={[
            styles.giftBoxContainer,
            giftBoxOpen && {top: HEIGHT * 0.365},
          ]}>
          <TouchableOpacity
            onPress={() => {
              dispatch(claimReward());

              if (!giftBoxOpen) {
                setVisible(true);
              }
            }}
            style={{marginBottom: -23, zIndex: 1}}>
            <Image
              source={
                giftBoxOpen
                  ? require('@assets/images/daily_check_in_dci_opened.png')
                  : require('@assets/images/daily_check_in_dci.png')
              }
              style={
                giftBoxOpen
                  ? {width: 340, height: 137}
                  : {width: 193, height: 194}
              }
            />
          </TouchableOpacity>

          <BottomBoxGift
            width={'100%'}
            height={giftBoxOpen ? '70%' : '44.6%'}
          />
        </View>

        <View style={styles.robotContainer}>
          <Image
            source={
              giftBoxOpen
                ? require('@assets/images/daily_check_in_robot_opened.png')
                : require('@assets/images/daily_check_in_robot.png')
            }
            style={{
              width: 172.85,
              height: 172.85,
              position: 'absolute',
              bottom: -78,
            }}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainer__wrapper}>
            <View style={{flex: 0.9}}>
              <Vector1
                style={styles.bottomContainer__wrapper__vector1}
                width={'100%'}
                height={'100%'}
              />

              <Vector2
                style={styles.bottomContainer__wrapper__vector2}
                width={'100%'}
                height={'100%'}
              />
            </View>

            <Image
              source={require('@assets/images/daily_check_in_27.png')}
              style={styles.bottomContainer__wrapper__koinImage}
            />
          </View>
        </View>
      </SafeAreaView>

      <PopUp
        visible={visible}
        setVisible={setVisible}
        setGiftBoxOpen={setGiftBoxOpen}
      />
    </Provider>
  );
};

export {DailyCheckInScreen};
