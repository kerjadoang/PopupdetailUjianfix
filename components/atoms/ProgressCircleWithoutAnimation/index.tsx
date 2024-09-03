import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Animated} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type IProgressCircleComponent = {
  progress: any;
  size: any;
  strokeWidth: any;
  color: any;
  children: any;
};

const ProgressCircle = ({
  progress,
  size,
  strokeWidth,
  color,
  children,
}: IProgressCircleComponent) => {
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
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressLength}, ${circumference}`}
          fill="none"
        />
        <View style={styles.content}>{children}</View>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export {ProgressCircle};
