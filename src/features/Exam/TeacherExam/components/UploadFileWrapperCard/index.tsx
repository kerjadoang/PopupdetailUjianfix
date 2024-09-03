import React from 'react';
import {View, ViewProps} from 'react-native';
import styles from './styles';

const UploadFileWrapperCard = (props: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

export {UploadFileWrapperCard};
