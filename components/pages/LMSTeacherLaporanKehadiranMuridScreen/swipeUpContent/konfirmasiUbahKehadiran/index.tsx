/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';

type _IKonfirmasiUbahKehadiran = {
  handleClose: any;
  handleSubmit: any;
  className?: string;
  studentName?: string;
  absentStatus?: string;
  requestDate?: string;
};

const KonfirmasiUbahKehadiran = ({
  handleClose,
  handleSubmit,
  absentStatus,
  className,
  requestDate,
  studentName,
}: _IKonfirmasiUbahKehadiran) => {
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
          paddingHorizontal: 30,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: Colors.dark.neutral100,
            lineHeight: 24,
            marginBottom: 10,
          }}>
          Hapus Konfirmasi Kehadiran
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            textAlign: 'center',
            color: Colors.dark.neutral80,
          }}>
          {`Apakah Anda yakin untuk menghapus kehadiran tatap muka murid ${
            studentName ?? ''
          } ${className ?? ''} dengan keterangan ${absentStatus ?? ''} pada ${
            requestDate !== ''
              ? dayjs(requestDate).locale('id').format('DD MMMM YYYY')
              : ''
          } ?`}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 5}}>
          <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
            <Button
              label="Hapus"
              background="white"
              color={Colors.primary.base}
              borderColor={Colors.primary.base}
              borderWidth={1}
              action={handleSubmit}
            />
          </View>
          <View style={{flex: 1, paddingRight: 5}}>
            <Button label="Kembali" action={handleClose} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default KonfirmasiUbahKehadiran;
