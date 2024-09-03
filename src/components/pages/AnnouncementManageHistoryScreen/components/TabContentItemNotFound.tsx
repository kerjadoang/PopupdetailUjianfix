/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import RobotEmptySearchImage from '@assets/svg/robot_empty_search.svg';
import RobotSedihImage from '@assets/svg/robot_sedih.svg';
import {Button} from '@components/atoms';

type Props = {
  isSearch?: boolean;
  isFilter?: boolean;
  title: string;
  description?: string;
  isShowButton?: boolean;
  buttonTitle?: string;
  buttonAction?: () => void;
};

const TabContentItemNotFound: FC<Props> = ({
  isSearch,
  isFilter,
  title,
  description,
  isShowButton,
  buttonTitle,
  buttonAction,
}) => (
  <View style={styles.containerTabContentItemNotFound}>
    {!isSearch ? (
      <Image
        source={require('@assets/images/robot_empty_announcement.png')}
        style={styles.image}
      />
    ) : isFilter ? (
      <RobotSedihImage style={{marginBottom: 6}} />
    ) : (
      <RobotEmptySearchImage style={{marginBottom: 6}} />
    )}

    <Text style={styles.containerTabContentItemNotFoundTitle}>{title}</Text>

    {description && (
      <Text style={styles.containerTabContentItemNotFoundDescription}>
        {description}
      </Text>
    )}

    {isShowButton && buttonTitle && buttonAction && (
      <Button
        label={buttonTitle}
        action={buttonAction}
        top={12}
        style={{paddingHorizontal: 16}}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  containerTabContentItemNotFound: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  containerTabContentItemNotFoundTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  containerTabContentItemNotFoundDescription: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 6,
  },
});

export default memo(TabContentItemNotFound);
