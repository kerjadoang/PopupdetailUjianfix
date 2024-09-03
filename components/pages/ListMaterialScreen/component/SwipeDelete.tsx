import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {ScrollView} from 'react-native-gesture-handler';
import Ic_check from '@assets/svg/Checkbox.svg';
import {Button} from '@components/atoms/Button';
import Colors from '@constants/colors';
import Icon1 from '@assets/svg/roundPorgressBook.svg';
import Icon2 from '@assets/svg/ic_play_btn_blue.svg';
import Icon3 from '@assets/svg/roundProgressBookPurple.svg';
type Props = {
  action?: any;
  action_delete?: any;
  data?: any[];
  checkedItems?: number[];
  action_check?: any;
  action_cancel: any;
};

const SwipeDelete = ({
  action,
  data,
  checkedItems = [],
  action_check,
  action_cancel,
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
        Pilih Materi Untuk Dihapus
      </Text>
      <ScrollView>
        {data?.map(item => (
          <Pressable style={[styles.card, styles.shadowProp]} key={item?.id}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item?.learning_method?.type === 'presentation' ? (
                <Icon1 width={64} height={64} />
              ) : item?.learning_method?.type === 'ebook' ? (
                <Icon3 width={64} height={64} />
              ) : (
                <Icon2 width={64} height={64} />
              )}
              <View style={styles.containerTitle}>
                <Text style={styles.subTitle}>
                  {item?.learning_method?.name}
                </Text>
                <Text style={styles.titleBlack}>{item?.title}</Text>
              </View>
            </View>
            <Pressable
              style={
                checked.includes(item?.id) ? styles.checkBox : styles.unCheckBox
              }
              onPress={() => toggleCheckedItem(item?.id)}>
              {checked.includes(item?.id) ? (
                <Ic_check width={24} height={24} />
              ) : null}
            </Pressable>
          </Pressable>
        ))}
        <View style={styles.buttonContainer}>
          <View style={styles.rowButton}>
            <Button
              label="Batal"
              background={Colors.white}
              color={Colors.primary.base}
              borderWidth={2}
              style={{width: '40%', height: 50}}
              action={action_cancel}
            />
            <Button
              label="Lanjut"
              style={{width: '40%', height: 50}}
              action={action}
              background={
                checked.length === 0
                  ? Colors.dark.neutral60
                  : Colors.primary.base
              }
              isDisabled={checked.length === 0 ? true : false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SwipeDelete;
