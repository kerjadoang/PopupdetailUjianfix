import React from 'react';
import {View, ViewProps} from 'react-native';
import styles from './styles';

const CardWrapper = (props: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

export {CardWrapper};
