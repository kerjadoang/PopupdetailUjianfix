import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Arrow from '@assets/svg/ic_arrow_grey_right.svg';
import Fonts from '@constants/fonts';

type Props = {
  img: any;
  type: string;
  desc: string;
  allTask: number;
  progress: number;
  action?: () => void;
  index?: number;
  lengthData?: number;
  isMurid?: boolean;
};

const CardProgress = ({
  type,
  img,
  desc,
  allTask,
  progress,
  index,
  lengthData,
  isMurid,
  action,
}: Props) => {
  if (isMurid) {
    return (
      <TouchableOpacity
        onPress={action}
        style={[
          styles.container,
          {
            borderBottomWidth: index + 1 === lengthData ? 0 : 1,
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View>{img}</View>
          <View style={{marginLeft: 12}}>
            <Text style={styles.title}>{type}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.descBold}>{progress} </Text>
              <Text style={styles.desc}>
                dari {allTask} {desc}
              </Text>
            </View>
          </View>
        </View>
        {isMurid ? (
          <View style={{justifyContent: 'center'}}>
            <Arrow />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          {borderBottomWidth: index + 1 === lengthData ? 0 : 1},
        ]}>
        <View>{img}</View>
        <View style={{marginLeft: 12}}>
          <Text style={styles.title}>{type}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.descBold}>{progress} </Text>
            <Text style={styles.desc}>
              dari {allTask} {desc}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
  },
  descBold: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    textTransform: 'capitalize',
    paddingBottom: 4,
  },
});

export {CardProgress};
