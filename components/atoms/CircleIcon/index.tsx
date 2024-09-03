import React, {FC, ReactElement} from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {MainView} from '../MainComponent';
import Colors from '@constants/colors';

type Props = {
  icon: ReactElement;
  onPress?: VoidCallBack;
  isActive?: boolean;
  containerStyle?: ViewStyle;
};

const CircleIcon: FC<Props> = ({onPress, isActive, icon, containerStyle}) => {
  return (
    <Pressable
      style={({pressed}) => ({opacity: pressed ? 0.3 : 1})}
      onPress={onPress}>
      <MainView
        borderRadius={100}
        padding={4}
        backgroundColor={isActive ? Colors.primary.base : Colors.primary.light3}
        style={containerStyle}>
        {icon}
      </MainView>
    </Pressable>
  );
};

export default CircleIcon;
