import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';

type Props = {
  handleCancel?: any;
  data?: any;
  type?: number;
  onItemSelected?: (item: {id: string; name: string}) => void;
  selectedClass?: any;
  firstClass?: any;
  handleApplyClass?: any;
};

const SwipeUpFilterClass = ({
  data,
  onItemSelected,
  handleApplyClass,
  firstClass,
  selectedClass,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemSelection = (item: any) => {
    setSelectedItem(item);
    if (onItemSelected) {
      onItemSelected(item);
    }
  };
  return (
    <View style={styles.modal}>
      <Text style={styles.textTitleModal}>Filter</Text>
      <Text style={styles.textSubTitleModal}>Title</Text>
      <View style={[styles.row, {flexWrap: 'wrap'}]}>
        {data?.map((item, key) => (
          <Pressable
            style={
              selectedItem
                ? selectedItem?.id === item?.id
                  ? styles.dateChoose
                  : styles.dateUnchoose
                : selectedClass && selectedClass?.id === item?.id
                ? styles.dateChoose
                : firstClass && !selectedClass && firstClass?.id === item?.id
                ? styles.dateChoose
                : styles.dateUnchoose
            }
            key={key}
            onPress={() => handleItemSelection(item)}>
            <Text
              style={
                selectedItem
                  ? selectedItem.id === item.id
                    ? styles.textChoose
                    : styles.textUnchoose
                  : selectedClass && selectedClass?.id === item?.id
                  ? styles.textChoose
                  : firstClass && !selectedClass && firstClass?.id === item?.id
                  ? styles.textChoose
                  : styles.textUnchoose
              }>
              {item?.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.row, {alignSelf: 'center', marginVertical: 10}]}>
        <Button
          label="Atur Ulang"
          background="white"
          color={Colors.primary.base}
          borderWidth={1}
          style={{width: '40%', height: 40, marginRight: 10}}
          action={() => handleItemSelection(firstClass)}
        />
        <Button
          label="Terapkan"
          style={{width: '40%', height: 40}}
          action={() => handleApplyClass(selectedItem)}
        />
      </View>
    </View>
  );
};

export {SwipeUpFilterClass};
