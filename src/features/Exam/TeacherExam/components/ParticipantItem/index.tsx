import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Checkbox, PoppinsText} from '@components/atoms';

type Props = {
  data: String;
  onPress: VoidCallBack;
  isSelected: boolean;
};

const ParticipantItem = ({data, isSelected, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Checkbox
        onPress={onPress}
        isChecked={isSelected}
        height={20}
        width={20}
        containerStyle={styles.dropdownChecboxContainer}
      />
      <PoppinsText>{data}</PoppinsText>
    </View>
  );
};

export {ParticipantItem};
