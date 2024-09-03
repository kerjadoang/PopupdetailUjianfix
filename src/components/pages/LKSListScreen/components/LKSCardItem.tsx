import React from 'react';

import {StyleSheet, Text, TouchableOpacityProps, View} from 'react-native';
import {Button, ButtonProps} from '@components/atoms';

import Colors from '@constants/colors';
import UsersIcon from '@assets/svg/ic16_users.svg';
import {ILKSHistoryListResponseData} from '@services/lms/type';

type LKSCardItemProps = {
  data?: ILKSHistoryListResponseData;
  onPressShowMore?: TouchableOpacityProps['onPress'];
  onPressCheckDetail?: ButtonProps['action'];
};

const LKSCardItem: React.FC<LKSCardItemProps> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerChipsAndMoreBtn}>
        <View style={styles.containerChips}>
          {props.data?.rombel && (
            <View style={styles.chips}>
              <Text style={styles.chipLabel}>{props.data.rombel}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.containerTitle}>
        <View style={{maxWidth: '70%'}}>
          <Text style={styles.subjectLabel}>{props.data?.subject}</Text>
          <Text style={styles.titleLabel}>{props.data?.chapter}</Text>
        </View>
        <View style={{maxWidth: '30%'}}>
          <Button
            label={'Detail'}
            outline
            textStyle={{fontSize: 14}}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 12,
              alignSelf: 'flex-end',
            }}
            action={() => props.onPressCheckDetail?.()}
          />
        </View>
      </View>
      <View style={{gap: 4}}>
        <View style={styles.additionalInformationContainer}>
          <UsersIcon />
          <Text style={styles.additionalInformationLabel}>
            {props.data?.total_finish}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: Colors.dark.neutral60,
            fontSize: 12,
          }}>
          Rata-Rata Nilai
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: Colors.dark.neutral80,
            fontSize: 16,
          }}>
          {props.data?.average}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    elevation: 4,
    backgroundColor: Colors.white,
    borderRadius: 8,
    gap: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  containerChipsAndMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerChips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -8,
  },
  chips: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
  },
  chipLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.primary.base,
  },
  moreBtn: {paddingLeft: 10},
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    alignItems: 'center',
  },
  subjectLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  titleLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  additionalInformationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  additionalInformationLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral80,
  },
});

export default LKSCardItem;
