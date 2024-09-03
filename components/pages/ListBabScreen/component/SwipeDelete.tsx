import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {ScrollView} from 'react-native-gesture-handler';
import Ic_check from '@assets/svg/Checkbox.svg';
import {Button} from '@components/atoms/Button';
import Colors from '@constants/colors';

type Props = {
  action?: any;
  action_batal?: any;
  data?: any[];
  checkedItems?: number[];
  action_check?: any;
};

const SwipeDelete = ({
  action,
  data,
  action_batal,
  checkedItems = [],
  action_check,
}: Props) => {
  const [checked, setChecked] = useState<number[]>(checkedItems);
  const toggleCheckedItem = (itemId: number) => {
    if (checked.includes(itemId)) {
      setChecked(checked.filter(id => id !== itemId));
      action_check(checked.filter(id => id !== itemId));
    } else {
      setChecked([...checked, itemId]);
      action_check([...checked, itemId]);
    }
  };
  return (
    <View style={{padding: 20, height: 500}}>
      <Text style={[styles.titleBlack, {textAlign: 'center'}]}>
        Pilih Bab Untuk Dihapus
      </Text>
      <ScrollView>
        {data?.map(item => (
          <View
            key={item.chapter.id}
            style={[styles.rowCheck, styles.card, styles.shadowProp]}>
            <Text style={styles.titleBlack}>{item?.chapter?.name}</Text>
            <Pressable
              style={
                checked.includes(item?.chapter?.id)
                  ? styles.checkBox
                  : styles.unCheckBox
              }
              onPress={() => toggleCheckedItem(item?.chapter?.id)}>
              {checked.includes(item?.chapter?.id) ? (
                <Ic_check width={24} height={24} />
              ) : null}
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.rowButton}>
          <Button
            label="Batal"
            background={Colors.white}
            color={Colors.primary.base}
            borderWidth={2}
            style={{width: '40%', height: 50}}
            action={action_batal}
          />
          <Button
            label="Lanjut"
            style={{width: '40%', height: 50}}
            action={action}
            background={
              checked.length === 0 ? Colors.dark.neutral60 : Colors.primary.base
            }
            isDisabled={checked.length === 0 ? true : false}
          />
        </View>
      </View>
    </View>
  );
};

export default SwipeDelete;
