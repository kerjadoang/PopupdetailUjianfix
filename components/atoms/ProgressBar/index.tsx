import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';

type Props = {
  pasiveColor?: string;
  activeColor?: string;
  progress: any;
  height?: any;
};

const ProgressBar = ({
  pasiveColor = Colors.dark.neutral20,
  activeColor = Colors.success.light1,
  progress = '100%',
  height = 10,
}: Props) => {
  return (
    <View style={{height: height}}>
      <View style={stylesProps(pasiveColor, progress, activeColor).pasive}>
        <View style={stylesProps(pasiveColor, progress, activeColor).active} />
      </View>
    </View>
  );
};

export default ProgressBar;

const stylesProps = (pasiveColor: string, progress: any, activeColor: string) =>
  StyleSheet.create({
    container: {
      height: 10,
    },
    pasive: {
      borderRadius: 10,
      height: 10,
      flex: 1,
      backgroundColor: pasiveColor,
    },
    active: {
      backgroundColor: activeColor,
      borderRadius: 10,
      height: '100%',
      width: progress,
    },
  });
