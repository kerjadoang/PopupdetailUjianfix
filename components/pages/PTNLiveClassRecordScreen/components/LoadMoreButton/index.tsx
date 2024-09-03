import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';

type Props = {
  onPress: () => void;
  showMore: boolean;
};

const LoadMoreButton: FC<Props> = ({showMore, onPress}) => {
  return (
    <Pressable key={'footer'} onPress={onPress} style={styles.button}>
      {showMore ? (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBtn}>Sembunyikan</Text>
          <Icon
            name="chevron-up"
            size={12}
            style={styles.icon}
            color={Colors.primary.base}
          />
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBtn}>Lihat Semua</Text>
          <Icon
            name="chevron-down"
            size={12}
            style={styles.icon}
            color={Colors.primary.base}
          />
        </View>
      )}
    </Pressable>
  );
};

export default LoadMoreButton;
