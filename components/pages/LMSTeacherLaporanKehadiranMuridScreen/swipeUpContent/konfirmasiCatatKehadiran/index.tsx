/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {Text, View} from 'react-native';

type _IKonfirmasiCatatKehadiran = {
  handleClose: any;
  handleSubmit: any;
  className: string;
};

const KonfirmasiCatatKehadiran = ({
  handleClose,
  handleSubmit,
  className,
}: _IKonfirmasiCatatKehadiran) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(29, 37, 45, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          maxWidth: 320,
          borderRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            lineHeight: 24,
            marginBottom: 10,
          }}>
          Konfirmasi Wali Kelas
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: Colors.dark.neutral80,
            textAlign: 'center',
          }}>
          Apakah Anda wali kelas dari {className.toLowerCase()} ?{'\n'}
          Hanya wali kelas yang dapat mencatat kehadiran murid.
        </Text>
        <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 5}}>
          <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
            <Button
              label="Bukan"
              background="white"
              color={Colors.primary.base}
              borderColor={Colors.primary.base}
              borderWidth={1}
              action={handleClose}
            />
          </View>
          <View style={{flex: 1, paddingRight: 5}}>
            <Button label="Benar" action={handleSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default KonfirmasiCatatKehadiran;
