import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

type Props = {
  title: string;
  description: string;
};

const TabContentItemNotFound: FC<Props> = ({title, description}) => (
  <View style={styles.containerTabContentItemNotFound}>
    <Image
      source={require('@assets/images/robot_empty_announcement.png')}
      style={styles.image}
    />

    <Text style={styles.containerTabContentItemNotFoundTitle}>{title}</Text>

    <Text style={styles.containerTabContentItemNotFoundDescription}>
      {description}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  containerTabContentItemNotFound: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
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
});

export default memo(TabContentItemNotFound);
