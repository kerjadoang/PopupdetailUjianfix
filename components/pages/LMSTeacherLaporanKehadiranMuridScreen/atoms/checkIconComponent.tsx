/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Colors from '@constants/colors';

type _FilterButtonComponent = {
  isChecked: boolean;
};

const CheckIconComponent = ({isChecked}: _FilterButtonComponent) => {
  return isChecked ? (
    <View
      style={{
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderWidth: 8,
        borderColor: Colors.primary.base,
        borderRadius: 100,
        marginTop: 5,
      }}
    />
  ) : (
    <View
      style={{
        width: 24,
        height: 24,
        backgroundColor: 'white',
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.dark.neutral50,
        borderRadius: 100,
      }}
    />
  );
};

export default CheckIconComponent;
