import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Down from '@assets/svg/ic_arrow_bottom_blue.svg';

type Props = {
  handleFilter?: any;
  handleFilterClass?: any;
  choosenClass?: any;
  firstClass?: any;
  choosenDate?: any;
  firstAcademic?: any;
};

const ChooseItem = ({
  handleFilter,
  handleFilterClass,
  choosenClass,
  firstClass,
  choosenDate,
  firstAcademic,
}: Props) => {
  return (
    <View style={[styles.row, {paddingHorizontal: 16}]}>
      <Pressable style={styles.dropdownBlue} onPress={handleFilter}>
        <Text style={styles.textBlue}>
          {choosenDate ? choosenDate.years : firstAcademic?.years}
        </Text>
        <Down width={16} height={16} />
      </Pressable>
      <Pressable style={styles.dropdownBlue} onPress={handleFilterClass}>
        <Text style={styles.textBlue}>
          {choosenClass ? choosenClass?.name : firstClass?.name}
        </Text>
        <Down width={16} height={16} />
      </Pressable>
    </View>
  );
};

export {ChooseItem};
