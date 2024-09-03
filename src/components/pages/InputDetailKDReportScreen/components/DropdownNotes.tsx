import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';

type Props = {
  data?: any;
  action?: any;
};
const DropdownNotes = ({data, action}: Props) => {
  return (
    <View>
      <View style={styles.listContentNoBorder}>
        <View style={styles.content}>
          <Text style={styles.textSubTitle}>Catatan Saran</Text>
          <Text style={styles.textTitle}>{data?.suggestion}</Text>
        </View>
        <Pressable onPress={() => action(data)}>
          <Pencil width={24} height={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default DropdownNotes;
