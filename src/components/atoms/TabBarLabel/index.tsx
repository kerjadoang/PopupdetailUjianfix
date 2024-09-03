import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const TabBarLabel = (props: any) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.tabBarLabel, props.focused && styles.tabBarLabelActive]}>
        {props.title}
      </Text>
      {props?.count ? (
        <View style={[styles.badges, props.focused && styles.badgesActive]}>
          <Text
            style={[
              styles.badgesLabel,
              props.focused && styles.badgesLabelActive,
            ]}>
            {props?.count || ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  tabBarLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral80,
  },
  tabBarLabelActive: {
    color: Colors.primary.base,
  },
  badgesLabel: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  badgesLabelActive: {
    color: Colors.primary.base,
  },
  badges: {
    marginLeft: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: Colors.dark.neutral10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  badgesActive: {
    backgroundColor: Colors.primary.light2,
  },
});

export default TabBarLabel;
