/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import CheckIconComponent from '../../atoms/checkIconComponent';
import dayjs from 'dayjs';

const UbahKehadiran = ({
  handleClose,
  handleSubmit,
  attendanceStatus,
  attendanceDate,
}: {
  handleClose: any;
  handleSubmit: any;
  attendanceDate?: string;
  attendanceStatus?: string;
}) => {
  const [choosedAttendanceStatus, setChoosedAttendanceStatus] =
    useState<string>(attendanceStatus ?? 'hadir');
  return (
    <View style={{marginTop: '5%', paddingHorizontal: '5%'}}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            lineHeight: 28,
            color: Colors.dark.neutral100,
          }}>
          Konfirmasi Kehadiran
        </Text>
      </View>
      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            lineHeight: 22,
            color: Colors.dark.neutral100,
          }}>
          {attendanceDate
            ? dayjs(attendanceDate).locale('id').format('dddd, DD MMMM YYYY')
            : ''}
        </Text>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Pressable
            onPress={() => setChoosedAttendanceStatus('hadir')}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>Hadir</Text>
            <CheckIconComponent
              isChecked={choosedAttendanceStatus === 'hadir'}
            />
          </Pressable>
          <Pressable
            onPress={() => setChoosedAttendanceStatus('izin')}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>Izin</Text>
            <CheckIconComponent
              isChecked={choosedAttendanceStatus === 'izin'}
            />
          </Pressable>
          <Pressable
            onPress={() => setChoosedAttendanceStatus('sakit')}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>Sakit</Text>
            <CheckIconComponent
              isChecked={choosedAttendanceStatus === 'sakit'}
            />
          </Pressable>
          <Pressable
            onPress={() => setChoosedAttendanceStatus('alpha')}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>Alpha</Text>
            <CheckIconComponent
              isChecked={choosedAttendanceStatus === 'alpha'}
            />
          </Pressable>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
        <View style={{flex: 1}}>
          <Button
            label="Kembali"
            background={Colors.white}
            color={Colors.dark.neutral50}
            borderWidth={1}
            borderColor={Colors.dark.neutral50}
            action={handleClose}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button
            action={() => handleSubmit(choosedAttendanceStatus)}
            label="Simpan"
          />
        </View>
      </View>
    </View>
  );
};

export default UbahKehadiran;
