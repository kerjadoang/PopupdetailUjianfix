import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Popable} from 'react-native-popable';
import Colors from '@constants/colors';

type Props = {
  label: string;
  showLabel?: boolean;
  visible?: boolean;
  countdown?: number | string;
};

const ReminderTimePopable: FC<Props> = props => {
  const showLabel = props.showLabel ?? true;
  return (
    <Popable
      style={styles.popableContainer}
      backgroundColor={Colors.dark.neutral20}
      animationType="spring"
      animated
      visible={props.visible}
      position="bottom"
      content={
        <View style={styles.popableContentContainer}>
          <Text style={styles.popableText}>
            Waktu kamu tinggal {props.countdown ?? 60} detik!
          </Text>
        </View>
      }>
      {showLabel ? <Text style={styles.subLabel}>{props.label}</Text> : null}
    </Popable>
  );
};

export default ReminderTimePopable;
