import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import RadioOn from '@assets/svg/Radio_Button_On.svg';
import RadioOff from '@assets/svg/Radio_Button_Off.svg';

type Props = {
  index: number;
  item: any;
  isChecked: boolean;
  onPress: () => void;
};

const SemesterCard: FC<Props> = ({index, item, isChecked = false, onPress}) => {
  return (
    <View style={styles.cardSemester} key={index}>
      <Text style={isChecked ? styles.textSemesterActive : styles.textSemester}>
        {item.type}
      </Text>
      <TouchableOpacity onPress={onPress}>
        {isChecked ? <RadioOn /> : <RadioOff />}
      </TouchableOpacity>
    </View>
  );
};

export default SemesterCard;
