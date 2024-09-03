/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '@constants/fonts';

type Props = {
  img: any;
  type: string;
  desc: string;
  allTask: number;
  progress: number;
  action?: () => void;
};

const CardProgress = ({type, img, desc, allTask, progress, action}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View>{img}</View>
      <View style={{width: '70%', marginTop: 5}}>
        <Text style={styles.title}>{type}</Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={styles.descBold}>{progress ?? 0} </Text>
          <Text style={styles.desc}>
            dari {allTask ?? 0} {desc}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>{/* <Arrow /> */}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  descBold: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    textTransform: 'capitalize',
  },
});

export {CardProgress};
