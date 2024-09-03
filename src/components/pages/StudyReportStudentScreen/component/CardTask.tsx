import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import ArrowRight from '@assets/svg/ic_arrow_right_blue.svg';

interface IProps {
  type: string;
  title: string;
  icon: any;
  countDone: number;
  buttonTitle: string;
  subTitle?: string;
  onPress?: any;
}

const CardTask = (props: IProps) => {
  return (
    <View style={[styles.cardContainer, styles.shadowProp]}>
      <View style={styles.subContainer}>
        <Text style={styles.titleCard}>{props?.title}</Text>
        <View style={styles.iconContainer}>
          {props?.icon}
          <Text style={[styles.titleCard, styles.countText]}>
            {props?.countDone} {props?.type === 'Ujian' ? 'Ujian' : ''}
          </Text>
        </View>
        {props?.subTitle ? (
          <Text style={styles.subTitle}>{props?.subTitle}</Text>
        ) : null}
        <TouchableOpacity style={[styles.button]} onPress={props?.onPress}>
          <Text style={styles.buttonText}>{props?.buttonTitle}</Text>
          <ArrowRight width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {CardTask};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  subContainer: {
    flexDirection: 'column',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingRight: 12,
  },
  titleCard: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    marginBottom: 12,
  },
  countText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.1,
    paddingLeft: 8,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    paddingBottom: 12,
  },
});
