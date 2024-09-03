import Colors from '@constants/colors';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import ChecklistWhite from '@assets/svg/ic_checklist_white.svg';

type Props = {
  isChecked: boolean;
  onPressCheck?: () => void | any;
  right?: number;
  customStyle?: StyleProp<ViewStyle>;
};

const CCheckBox = ({isChecked, onPressCheck, right, customStyle}: Props) => {
  return (
    <TouchableOpacity
      style={[
        {...styles.container, marginRight: right ? right : 0},
        customStyle,
      ]}
      onPress={onPressCheck}>
      {isChecked ? (
        <View style={styles.isCheckedContainer}>
          <ChecklistWhite height={10} width={10} />
        </View>
      ) : (
        <View style={styles.isNotCheckedContainer} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  isCheckedContainer: {
    backgroundColor: Colors.primary.base,
    borderRadius: 5,
    padding: 7,
  },
  isNotCheckedContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderColor: Colors.dark.neutral50,
    borderWidth: 2,
    padding: 10,
  },
});

export {CCheckBox};
