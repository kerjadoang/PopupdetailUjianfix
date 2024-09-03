import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../style';
import ArrowIcon from '@assets/svg/ic_arrow_bottom_blue.svg';

type _FilterButtonComponent = {
  title: string;
  onPress: any;
};

const FilterButtonComponent = ({onPress, title}: _FilterButtonComponent) => {
  return (
    <Pressable onPress={onPress} style={styles.tabKOFilterTab}>
      <Text style={styles.tabKOFilterTabTextLeft}>{title}</Text>
      <View style={styles.tabKoFilterTabTextRight}>
        <ArrowIcon />
      </View>
    </Pressable>
  );
};

export default FilterButtonComponent;
