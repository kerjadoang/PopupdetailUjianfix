import Colors from '@constants/colors';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Animated} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  const animatedStroke = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

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
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          stroke={progress === 100 ? Colors.success.light1 : color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progressLength}, ${circumference}`}
          strokeDashoffset={animatedStroke}
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
