import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import RobotEmptyState from '@assets/svg/robot_empty_state.svg';
import RobotEmptySearch from '@assets/svg/robot_empty_search.svg';
import RobotEmptySad from '@assets/svg/robot_sedih.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

interface EmptyStateProps {
  type?: string;
  title: string;
  subTitle?: string;
  titleStyles?: StyleProp<TextStyle>;
  subTitleStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  iconWidth?: any;
  iconHeight?: any;
  icon?: any;
}

const EmptyState = ({
  type = 'empty_state' || 'empty_search',
  title = '',
  subTitle = '',
  titleStyles,
  subTitleStyles,
  containerStyles,
  iconWidth = 100,
  iconHeight = 100,
  icon,
}: EmptyStateProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {icon ? (
        icon
      ) : type === 'empty_state' ? (
        <RobotEmptyState width={iconWidth} height={iconHeight} />
      ) : type === 'empty_search' ? (
        <RobotEmptySearch width={100} height={100} />
      ) : type === 'empty_sad' ? (
        <RobotEmptySad width={100} height={100} />
      ) : (
        <RobotEmptyState width={100} height={100} />
      )}
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      <Text style={[styles.subTitle, subTitleStyles]}>{subTitle}</Text>
    </View>
  );
};

export {EmptyState};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    paddingTop: 12,
  },
  subTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral80,
    paddingTop: 6,
  },
});
