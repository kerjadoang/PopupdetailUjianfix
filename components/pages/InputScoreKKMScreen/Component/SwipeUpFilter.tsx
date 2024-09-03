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
  selectedDate?: any;
  handleApplyDate?: any;
  firstAcademic?: any;
};
const SwipeUpFilter = ({
  data,
  onItemSelected,
  handleApplyDate,
  firstAcademic,
  selectedDate,
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
      <Text style={styles.textSubTitleModal}>Tahun Ajaran</Text>
      <View style={[styles.row, {flexWrap: 'wrap'}]}>
        {data?.map((item, key) => (
          <Pressable
            style={
              selectedItem
                ? selectedItem?.id === item?.id
                  ? styles.dateChoose
                  : styles.dateUnchoose
                : selectedDate && selectedDate?.id === item?.id
                ? styles.dateChoose
                : firstAcademic &&
                  !selectedDate &&
                  firstAcademic?.id === item?.id
                ? styles.dateChoose
                : styles.dateUnchoose
            }
            key={key}
            onPress={() => handleItemSelection(item)}>
            <Text
              style={
                selectedItem
                  ? selectedItem?.id === item?.id
                    ? styles.textChoose
                    : styles.textUnchoose
                  : selectedDate && selectedDate.id === item?.id
                  ? styles.textChoose
                  : firstAcademic &&
                    !selectedDate &&
                    firstAcademic?.id === item?.id
                  ? styles.textChoose
                  : styles.textUnchoose
              }>
              {item?.years}
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
        />
        <Button
          label="Terapkan"
          style={{width: '40%', height: 40}}
          action={() => handleApplyDate(selectedItem)}
        />
      </View>
    </View>
  );
};

export default SwipeUpFilter;
