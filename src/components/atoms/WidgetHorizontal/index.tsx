import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';

type Props = {
  title?: string;
  action?: any;
  svg?: any;
  akm?: boolean;
};

const WidgetHorizontal = ({title, action, svg, akm}: Props) => {
  return (
    <Pressable onPress={action}>
      <View style={styles.containerWidget}>
        <View style={akm ? styles.containerLogoAkm : styles.containerLogo}>
          {svg}
        </View>
        <View style={{flex: 3}}>
          <Text style={akm ? styles.textAkm : styles.text}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerWidget: {
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    minWidth: '50%',
    width: '100%',
  },
  containerLogoAkm: {
    position: 'relative',
    left: 0,
    bottom: -5,
    height: 50,
    marginRight: 10,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    // width: '20%',
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    flexWrap: 'wrap',
    // textAlign: 'center',
    fontFamily: Fonts.BoldPoppins,
    color: Colors.dark.neutral100,
  },
  textAkm: {
    fontSize: 14,

    fontWeight: '600',
    flexWrap: 'wrap',
    // textAlign: 'center',
    fontFamily: Fonts.BoldPoppins,
    color: Colors.dark.neutral100,
  },
});

export {WidgetHorizontal};
