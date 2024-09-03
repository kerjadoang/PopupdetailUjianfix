import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Pencil from '@assets/svg/ic_edit.svg';
import Plus from '@assets/svg/ic24_plus.svg';
import Colors from '@constants/colors';
import Delete from '@assets/svg/ic_trash_red.svg';
import {Button} from '@components/atoms';
type Props = {
  data?: any;
  action?: any;
  actionDelete?: any;
  handleSwipeAddGrow?: any;
};
const DropdownGrow = ({
  data,
  action,
  handleSwipeAddGrow,
  actionDelete,
}: Props) => {
  return (
    <View>
      {data?.physical_development_record?.map((item, key) => (
        <View key={key}>
          <View>
            <View style={styles.listContentNoBorder}>
              <View style={styles.content}>
                <Text style={styles.textTitle}>{item?.title}</Text>
              </View>
              <View style={styles.row}>
                <Pressable
                  onPress={() => action(item)}
                  style={{marginRight: 10}}>
                  <Pencil width={24} height={24} />
                </Pressable>
                <Pressable onPress={() => actionDelete(item)}>
                  <Delete width={24} height={24} />
                </Pressable>
              </View>
            </View>
            <Text style={styles.textSubTitle}>Ukuran</Text>
            <Text style={styles.textTitle}>{item?.size}</Text>
            <Text style={styles.textSubTitle}>Lain-lain</Text>
            <Text style={styles.textTitle}>{item?.description}</Text>
          </View>
        </View>
      ))}
      <Button
        label={'Tambah Perkembangan Fisik'}
        background={Colors.white}
        borderWidth={1}
        action={() => handleSwipeAddGrow('add')}
        color={Colors.primary.base}
        iconLeft={<Plus width={25} height={25} />}
        style={{marginTop: 25}}
      />
    </View>
  );
};

export default DropdownGrow;
