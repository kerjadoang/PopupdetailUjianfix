import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';

type Props = {};

const DividerHeight: FC<Props> = ({}) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLineContainer}>
        <View style={styles.separatorLine} />
      </View>
      <View style={styles.separatorPadding} />
    </View>
  );
};

export default DividerHeight;
