import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';

type Props = {
  data?: any;
  action?: any;
};
const DropdownSkills = ({data, action}: Props) => {
  return (
    <View>
      {data?.skills?.map((item, key) => (
        <View key={key}>
          <View style={styles.listContentNoBorder}>
            <View style={styles.content}>
              <Text style={styles.textTitle}>{item?.subject_name}</Text>
            </View>
            <Pressable onPress={() => action(item)}>
              <Pencil width={24} height={24} />
            </Pressable>
          </View>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.textSubTitle}>KKM</Text>
              <Pressable style={styles.rowCenter}>
                <Text style={styles.textTitle}>{item?.kkm}</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.textSubTitle}>Nilai</Text>
              <Pressable style={styles.rowCenter}>
                <Text style={styles.textTitle}>{item?.score}</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.textSubTitle}>Predikat</Text>
              <Pressable style={styles.rowCenter}>
                <Text style={styles.textTitle}>{item?.predicate}</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={styles.textSubTitle}>Deskripsi</Text>
            <Pressable style={styles.rowCenter}>
              <Text style={styles.textTitle}>{item?.description}</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DropdownSkills;
