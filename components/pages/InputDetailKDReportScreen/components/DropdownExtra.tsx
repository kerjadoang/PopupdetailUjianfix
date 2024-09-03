import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';
import Delete from '@assets/svg/ic_trash_red.svg';
import Plus from '@assets/svg/ic24_plus.svg';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
type Props = {
  data?: any;
  action?: any;
  actionDelete?: any;
  handleSwipeAddExtra?: any;
};
const DropdownExtra = ({
  data,
  action,
  actionDelete,
  handleSwipeAddExtra,
}: Props) => {
  return (
    <View>
      {data?.extracurricular?.map((item, key) => (
        <View key={key}>
          <View style={styles.listContentNoBorder}>
            <View style={styles.content}>
              <Text style={styles.textTitle}>{item?.extracurricular_name}</Text>
            </View>
            <View style={styles.row}>
              <Pressable onPress={() => action(item)} style={{marginRight: 10}}>
                <Pencil width={24} height={24} />
              </Pressable>
              <Pressable onPress={() => actionDelete(item)}>
                <Delete width={24} height={24} />
              </Pressable>
            </View>
          </View>
          <View style={styles.rowBetween}>
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
            <View />
          </View>
          <View>
            <Text style={styles.textSubTitle}>Deskripsi</Text>
            <Pressable style={styles.rowCenter}>
              <Text style={styles.textTitle}>{item?.description}</Text>
            </Pressable>
          </View>
        </View>
      ))}
      <Button
        label={'Tambah Ekstrakurikuler'}
        background={Colors.white}
        borderWidth={1}
        style={{marginTop: 12}}
        action={() => handleSwipeAddExtra('add')}
        color={Colors.primary.base}
        iconLeft={<Plus width={25} height={25} />}
      />
    </View>
  );
};

export default DropdownExtra;
