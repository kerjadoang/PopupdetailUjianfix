import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';

type Props = {
  allDate?: any;
  handleFilterAcademic?: any;
  choosen?: any;
  showChoose?: any;
  setShowChoose?: any;
  firstAcademic?: any;
};
const SwipeDate = ({
  allDate,
  handleFilterAcademic,
  choosen,
  setShowChoose,
  showChoose,
  firstAcademic,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleItemSelection = (item: any) => {
    setSelectedItem(item);
  };
  return (
    <View style={{padding: 16}}>
      <Text style={styles.textTitleModal}>Filter</Text>
      <Text style={[styles.textSub, {fontFamily: 'Poppins-Bold'}]}>
        Tahun Ajaran
      </Text>
      <View style={[styles.row, {marginTop: 20}]}>
        {allDate?.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => handleItemSelection(item)}
            style={
              selectedItem
                ? selectedItem?.id === item?.id
                  ? styles.buttonChoosenItem
                  : styles.buttonUnChoosenItem
                : choosen && choosen?.id === item?.id
                ? styles.buttonChoosenItem
                : firstAcademic && !choosen && firstAcademic?.id === item?.id
                ? styles.buttonChoosenItem
                : styles.buttonUnChoosenItem
            }>
            <Text
              style={
                selectedItem
                  ? selectedItem?.id === item?.id
                    ? styles.textChoosenItem
                    : styles.textUnChoosenItem
                  : choosen && choosen?.id === item?.id
                  ? styles.textChoosenItem
                  : firstAcademic && !choosen && firstAcademic?.id === item?.id
                  ? styles.textChoosenItem
                  : styles.textUnChoosenItem
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
          action={() => {
            setSelectedItem(firstAcademic);
          }}
        />
        <Button
          label="Terapkan"
          style={{width: '40%', height: 40}}
          action={() => {
            setShowChoose(!showChoose);
            handleFilterAcademic(selectedItem);
          }}
        />
      </View>
    </View>
  );
};

export {SwipeDate};
