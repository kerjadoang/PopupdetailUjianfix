import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RightIcon from '@assets/svg/ic_chevron_right_16x16.svg';
import ExpandedIcon from '@assets/svg/ic24_chevron_down_blue.svg';
type Props = {
  rightIcon?: boolean;
  stylesContainer?: any;
  title?: string;
  subTitle?: string;
  subTitleStyle?: any;
  leftIcon?: any;
  backgroundColor?: string;
  borderDashed?: boolean;
  borderColor?: string;
  borderWidth?: string;
  onPress?: any;
  rightIconCustom?: any;
  accordion?: boolean;
  childData?: object[];
  setButtonSelected?: any;
  noGap?: boolean;
  testID?: string;
};
const ButtonIconColor = ({
  rightIcon,
  stylesContainer,
  title,
  subTitle,
  subTitleStyle,
  leftIcon,
  backgroundColor,
  borderDashed,
  borderColor,
  borderWidth,
  onPress,
  rightIconCustom,
  accordion = false,
  childData,
  setButtonSelected,
  noGap,
  testID,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  return (
    <TouchableOpacity
      testID={testID}
      onLayout={event => {
        setButtonSelected
          ? setButtonSelected(event.nativeEvent.layout.y)
          : null;
      }}
      onPress={accordion ? toggleAccordion : onPress}
      style={[
        styles.cardContent,
        stylesContainer,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.primary.light3,
        },
        !noGap
          ? {
              marginBottom: 16,
            }
          : null,
        borderDashed && {
          borderStyle: 'dashed',
          borderWidth: borderWidth ? borderWidth : 1,
          borderColor: borderColor ? borderColor : Colors.primary.base,
        },
      ]}>
      <View style={styles.leftContentContainer}>
        {leftIcon && <View style={styles.iconLeftContainer}>{leftIcon}</View>}
        <View style={styles.middleContentContainer}>
          <Text style={styles.title}>{title ? title : ''}</Text>
          {subTitle && (
            <Text style={[styles.subTitle, subTitleStyle]}>
              {subTitle ? subTitle : ''}
            </Text>
          )}
        </View>
      </View>
      {expanded && accordion ? (
        <ExpandedIcon style={styles.rightIcon} />
      ) : rightIcon ? (
        <RightIcon style={styles.rightIcon} />
      ) : rightIconCustom ? (
        rightIconCustom
      ) : null}
      {accordion &&
        expanded &&
        childData?.map((item: any, index: any) => (
          <View style={styles.childContainer} key={index}>
            <Text style={styles.childTitle}>
              {item?.title ? item?.title : ''}
            </Text>
            <Text style={[styles.childSubTitle]}>
              {item?.subTitle ? item?.subTitle : ''}
            </Text>
          </View>
        ))}
    </TouchableOpacity>
  );
};

export {ButtonIconColor};
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
  leftContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeftContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    width: 10,
    height: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
    width: 50,
    height: 50,
    top: 25,
  },
  middleContentContainer: {
    width: window.width * 0.67,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  childContainer: {
    marginTop: 16,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
    width: window.width * 0.85,
    elevation: 5,
  },
  childTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
  },
  childSubTitle: {
    paddingTop: 4,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
  },
});
