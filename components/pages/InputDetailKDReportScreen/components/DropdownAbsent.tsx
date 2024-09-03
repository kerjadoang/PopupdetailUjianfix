import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';
type Props = {
  data?: any;
  action?: any;
};
const DropdownAbsent = ({data, action}: Props) => {
  return (
    <View>
      <View style={styles.listContentNoBorder}>
        <View style={styles.content}>
          <Text style={styles.textSubTitle}>Ketidakhadiran Murid</Text>
        </View>
        <Pressable onPress={() => action(data)}>
          <Pencil width={24} height={24} />
        </Pressable>
      </View>
      <View style={styles.rowAround}>
        <View>
          <Text style={styles.textSubTitle}>Sakit</Text>
          <Pressable style={styles.rowCenter}>
            <Text style={styles.textTitle}>{data?.sick} hari</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.textSubTitle}>Izin</Text>
          <Pressable style={styles.rowCenter}>
            <Text style={styles.textTitle}>{data?.permission} hari</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.textSubTitle}>Alpha</Text>
          <Pressable style={styles.rowCenter}>
            <Text style={styles.textTitle}>{data?.alpha} hari</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DropdownAbsent;
