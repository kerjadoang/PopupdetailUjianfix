import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';

type Props = {
  data?: any;
  action?: any;
};
const DropdownResult = ({data, action}: Props) => {
  return (
    <View>
      <View style={styles.listContentNoBorder}>
        <View style={styles.content}>
          <Text style={styles.textSubTitle}>
            Pada semester ini, Murid {data?.rapor_student?.full_name} dinyatakan
          </Text>
          <Text style={styles.textTitle}>
            {data?.graduation_status.toUpperCase()}
          </Text>
        </View>
        <Pressable onPress={() => action(data)}>
          <Pencil width={24} height={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default DropdownResult;
