import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';

type Props = {
  data?: any;
  action?: any;
};

const DropdownAttitude = ({data, action}: Props) => {
  return (
    <View>
      {data?.attitude?.map((item, key) => (
        <View style={styles.listContentNoBorder} key={key}>
          <View style={styles.content}>
            <Text style={styles.textSubTitle}>{item?.title}</Text>
            <Text style={styles.textTitle}>{item?.description}</Text>
          </View>
          <Pressable onPress={() => action(item)}>
            <Pencil width={24} height={24} />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default DropdownAttitude;
