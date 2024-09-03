import Colors from '@constants/colors';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Animated} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type IProgressCircleAttendanceComponent = {
  progress?: any;
  color?: any;
  children?: any;
};

const ProgressCircleAttendance = ({
  progress,
  children,
}: IProgressCircleAttendanceComponent) => {
  const size = 125;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
  const progressLength = (circumference / 100) * progress;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: progress * 150,
      useNativeDriver: true,
    }).start();
  }, [progress, animatedValue]);

  return (
    <View style={{transform: [{scaleY: -1}]}}>
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth / 2}
            stroke={Colors.danger.base}
            strokeWidth={6}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth / 2}
            stroke={Colors.danger.base}
            strokeWidth={6}
            strokeDasharray={'100, 259'}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth / 2}
            stroke={'white'}
            strokeWidth={6}
            strokeDasharray={`${progressLength + 2}, ${circumference + 2}`}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth / 2}
            stroke={Colors.success.light1}
            strokeWidth={6}
            fill="none"
            strokeDasharray={`${progressLength}, ${circumference}`}
          />
          <View style={styles.content}>
            <View style={{transform: [{scaleY: -1}]}}>{children}</View>
          </View>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '90deg'}],
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    transform: [{rotate: '270deg'}],
  },
});

export {ProgressCircleAttendance};
