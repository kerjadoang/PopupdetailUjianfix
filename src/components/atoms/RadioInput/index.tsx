import Colors from '@constants/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

type RadioInputProps = {
  selected?: boolean;
  textLabelStyle?: StyleProp<TextStyle>;
  radioContainerStyle?: StyleProp<ViewStyle>;
  label?: string;
  onPress?: TouchableOpacityProps['onPress'];
};

const RadioInput: React.FC<RadioInputProps> = props => {
  return (
    <TouchableOpacity
      style={styles.radioInputContainer}
      onPress={props.onPress}>
      <View style={[styles.radioContainer, props.radioContainerStyle]}>
        <View
          style={[styles.radioInactive, props.selected && styles.radioActive]}>
          <View style={styles.insideRadio} />
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.radioTextInactive,
            props.selected && styles.radioTextActive,
          ]}>
          {props.label ?? 'Pilihan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioInputContainer: {flex: 1, flexWrap: 'wrap'},
  radioContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioInactive: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.dark.neutral50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioTextInactive: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.dark.neutral80,
  },
  radioActive: {
    borderColor: Colors.primary.base,
    backgroundColor: Colors.primary.base,
  },
  radioTextActive: {
    color: Colors.primary.base,
  },
  insideRadio: {
    width: 8,
    height: 8,
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
});

export {RadioInput};
