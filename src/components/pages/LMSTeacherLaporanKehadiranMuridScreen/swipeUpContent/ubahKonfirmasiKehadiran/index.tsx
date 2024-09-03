/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import EditIcon from '@assets/svg/ic_edit_task.svg';
import RemoveIcon from '@assets/svg/ic_trash_red.svg';

const UbahKonfirmasiKehadiran = ({handleEdit, handleRemove}: any) => {
  return (
    <View style={{marginTop: '5%', paddingHorizontal: '5%', marginBottom: 10}}>
      <Pressable
        onPress={handleEdit}
        style={{width: '100%', flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 0.12, justifyContent: 'center'}}>
          <EditIcon />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              lineHeight: 24,
              color: Colors.dark.neutral100,
            }}>
            Ubah Kehadiran
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={handleRemove}
        style={{width: '100%', flexDirection: 'row', marginTop: '5%'}}>
        <View style={{flex: 0.12, justifyContent: 'center'}}>
          <RemoveIcon />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              lineHeight: 24,
              color: Colors.dark.neutral100,
            }}>
            Hapus Kehadiran
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UbahKonfirmasiKehadiran;
