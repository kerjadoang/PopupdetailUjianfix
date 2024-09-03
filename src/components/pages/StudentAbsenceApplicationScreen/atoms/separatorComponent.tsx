/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {View} from 'react-native';

const SeparatorComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 4,
        backgroundColor: Colors.dark.neutral10,
        marginVertical: 16,
      }}
    />
  );
};

export default SeparatorComponent;
