import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {isStringContains} from '@constants/functional';

type IMenuLMS = {
  menuLMS: any;
  activeCurriculum?: ICurriculum;
};

const MenuLMS = ({menuLMS, activeCurriculum}: IMenuLMS) => {
  return (
    <View style={styles.container}>
      {menuLMS?.map((item: any, index: number) => {
        //Hide LKPD Menu when current curriculum is not kurikulum merdeka
        if (
          isStringContains(item.name, 'lkpd') &&
          !isStringContains(activeCurriculum?.name || '', 'merdeka')
        ) {
          return <View key={index} />;
        }
        return (
          <Pressable
            onPress={() => {
              item?.onPress();
            }}
            style={styles.itemMenu}
            key={index}>
            {item?.image}
            {item?.number && (
              <View style={styles.dot}>
                <Text style={styles.textDot}>{item?.number}</Text>
              </View>
            )}
            <View
              style={{
                width: '70%',
                marginTop: 8,
              }}>
              <Text style={styles.textMenuLMS}>{item?.name}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default MenuLMS;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textMenuLMS: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
  },
  itemMenu: {
    alignItems: 'center',
    width: '25%',
    marginTop: 16,
  },
  dot: {
    backgroundColor: Colors.danger.base,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    right: 15,
    top: -4,
    borderRadius: 20,
  },
  textDot: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
});
