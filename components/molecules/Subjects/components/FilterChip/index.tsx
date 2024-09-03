import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  activeData: any;
  onPress: CallBack<void>;
  title: string;
};

const FilterChip: FC<Props> = ({title, activeData, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.kurikulum,
          {
            borderColor:
              !!activeData || title ? Colors.primary.base : Colors.white,
          },
        ]}
        onPress={onPress}>
        <Text style={styles.activeCuriculum}>{title}</Text>
        {(!!activeData || title) && (
          <Icon name="chevron-down" size={14} color={Colors.primary.base} />
        )}
      </Pressable>
    </View>
  );
};

export default FilterChip;
