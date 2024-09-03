/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {Text, View} from 'react-native';

type _IKonfirmasiKehadiran = {
  handleClose: any;
  handleSubmit: any;
};

const KonfirmasiKehadiran = ({
  handleClose,
  handleSubmit,
}: _IKonfirmasiKehadiran) => {
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
          maxWidth: 300,
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
          Apakah Anda wali kelas dari kelas 1 - A?{'\n'}
          Hanya wali kelas yang dapat{'\n'}
          melakukan konfirmasi ketidakhadiran{'\n'}
          murid.
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

export default KonfirmasiKehadiran;
