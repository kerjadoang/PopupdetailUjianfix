/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import {Button} from '@components/atoms';
import {capitalizeEachWord} from '@constants/functional';

type Props = {
  category: string;
  mapel: string;
  title: string;
  item?: IPRTugasData;
  grade?: any;
  givenDate: string;
  collectionDate: string;
  type?: 'BELUM_DIKERJAKAN' | 'RIWAYAT';
  isShowButton?: boolean;
  buttonTitle: string;
  buttonOnPress: () => void;
};

const CardListItem: FC<Props> = ({
  category,
  mapel,
  title,
  grade,
  givenDate,
  collectionDate,
  type = 'BELUM_DIKERJAKAN',
  isShowButton,
  buttonTitle,
  buttonOnPress,
}) => {
  const isTypeBelumDikerjakan = type === 'BELUM_DIKERJAKAN';
  const projectCategory =
    category == 'pr' || category == 'PR' ? 'PR' : capitalizeEachWord(category);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{projectCategory}</Text>

      <View style={styles.__flexRowContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.mapelText}>{mapel}</Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {isShowButton ? (
          <Button
            outline={true}
            label={buttonTitle}
            action={buttonOnPress}
            style={{paddingHorizontal: 13}}
          />
        ) : null}
      </View>

      <View style={styles.__flexRowContainer}>
        <View style={!isTypeBelumDikerjakan ? {flex: 2} : {flex: 1}}>
          <Text style={styles.__regularText}>
            {isTypeBelumDikerjakan ? 'Diberikan' : 'Dikumpulkan'}
          </Text>

          <View style={styles.__wrapIconAndText}>
            <IconCalendar />

            <Text
              style={[
                styles.__regularText,
                {
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dark.neutral80,
                },
              ]}>
              {isTypeBelumDikerjakan ? givenDate : collectionDate}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.__regularText}>
            {isTypeBelumDikerjakan ? 'Batas Dikumpulkan' : 'Nilai'}
          </Text>

          <View style={styles.__wrapIconAndText}>
            {isTypeBelumDikerjakan && <IconCalendar />}

            <Text
              style={[
                styles.__regularText,
                {
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dark.neutral80,
                },
                !isTypeBelumDikerjakan &&
                  +grade >= 0 && {color: Colors.primary.base},
              ]}>
              {isTypeBelumDikerjakan ? collectionDate : grade}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  __flexRowContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  __regularText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  __wrapIconAndText: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 4,
  },
  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  categoryText: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapelText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  titleText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
});

export default CardListItem;
