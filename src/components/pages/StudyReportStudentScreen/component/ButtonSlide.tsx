import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../style';

interface IProps {
  item?: any;
  selectedItem?: any;
  onPress?: any;
}
const ButtonSlide = (props: IProps) => {
  return (
    <TouchableOpacity
      style={
        props?.item?.id === props?.selectedItem
          ? styles.choose
          : styles.unChoose
      }
      onPress={props?.onPress}>
      <Text
        style={
          props?.item?.id === props?.selectedItem
            ? styles.textChoose
            : styles.textUnchoose
        }>
        {props?.item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSlide;
