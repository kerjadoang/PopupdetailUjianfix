import React, {FC} from 'react';
import {View, Text, Pressable, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';

type Props = {
  name: string;
  onPress: () => void;
  isActive?: boolean;
  customStyle?: StyleProp<ViewStyle>;
};

const DaftarProyekFilterButton: FC<Props> = ({
  onPress,
  name,
  isActive,
  customStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isActive
            ? Colors.primary.base
            : Colors.primary.light3,
        },
        customStyle,
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={[
            styles.textBtn,
            {color: isActive ? Colors.primary.light3 : Colors.primary.base},
          ]}>
          {name}
        </Text>
        <Icon
          name="chevron-down"
          size={12}
          style={styles.icon}
          color={isActive ? Colors.primary.light3 : Colors.primary.base}
        />
      </View>
    </Pressable>
  );
};

export default DaftarProyekFilterButton;
