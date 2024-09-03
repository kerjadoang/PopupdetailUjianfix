/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {Text} from 'react-native-paper';
import DateIcon from '@assets/svg/ic_calendar_blue.svg';
import {Button} from '@components/atoms';
import {StackNavigationProp} from '@react-navigation/stack';
import KonfirmasiKehadiran from '../LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/konfirmasiKehadiran';

const DetailKehadiranDokumenScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DetailKehadiranDokumenScreen'>
    >();
  const [isOpenSwipeUp, setIsOpenSwipeUp] = useState<boolean>(false);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Kehadiran'}
          backgroundColor={Colors.white}
          labelContent={
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 11,
                lineHeight: 16,
              }}>
              Kelas 1 - A • Kelas Online
            </Text>
          }
          colorLabel={Colors.dark.neutral100}
        />
      ),
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: Colors.primary.light3,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              lineHeight: 24,
              color: Colors.dark.neutral100,
              marginBottom: 3,
            }}>
            Andi Santoso
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              lineHeight: 16,
              color: Colors.dark.neutral80,
              marginBottom: 3,
            }}>
            NIS: 12345
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              lineHeight: 22,
              color: Colors.dark.neutral80,
              marginBottom: 3,
            }}>
            Sakit (3 hari)
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DateIcon />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                marginTop: 5,
                marginLeft: 8,
                color: Colors.dark.neutral80,
                marginBottom: 3,
              }}>
              29 Juli 2022 - 31 Juli 2022
            </Text>
          </View>
        </View>
      </View>
      <Text style={{marginLeft: '5%', marginVertical: 15}}>
        Diajukan pada 25 Juli 2022 9:15
      </Text>
      <View
        style={{
          backgroundColor: Colors.primary.light3,
          width: 190,
          alignItems: 'center',
          paddingVertical: 5,
          marginLeft: '5%',
          paddingHorizontal: 5,
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            lineHeight: 22,
            color: Colors.primary.base,
          }}>
          Menunggu persetujuan Guru
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          borderTopWidth: 4,
          marginVertical: 15,
          borderTopColor: Colors.dark.neutral10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginLeft: '5%',
        }}>
        Lampiran
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginTop: 10,
          marginLeft: '5%',
        }}>
        -
      </Text>
      <View
        style={{
          width: '100%',
          borderTopWidth: 4,
          marginVertical: 15,
          borderTopColor: Colors.dark.neutral10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginLeft: '5%',
        }}>
        Catatan
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginTop: 10,
          marginLeft: '5%',
        }}>
        -
      </Text>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, paddingLeft: 20}}>
          <Button
            label="Tolak"
            background="white"
            color={Colors.primary.base}
            borderColor={Colors.primary.base}
            borderWidth={1}
            action={() => {
              setIsOpenSwipeUp(true);
            }}
          />
        </View>
        <View style={{flex: 1, paddingRight: 20, paddingLeft: 10}}>
          <Button
            label="Terima"
            background={Colors.success.light1}
            action={() => {
              setIsOpenSwipeUp(true);
            }}
          />
        </View>
      </View>
      <Modal
        visible={isOpenSwipeUp}
        transparent={true}
        animationType="fade"
        children={
          <KonfirmasiKehadiran
            handleClose={() => setIsOpenSwipeUp(false)}
            handleSubmit={() => {}}
          />
        }
      />
    </View>
  );
};

export default DetailKehadiranDokumenScreen;
