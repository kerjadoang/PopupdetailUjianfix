import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconTask from '@assets/svg/task_blue_icon.svg';

type Props = {
  type: string;
  className: string;
  chapterNname: string;
  subjectName: string;
  processingTime: string;
  assessingTime: string;
  action?: () => void;
};

const CardTask = ({
  type,
  className,
  chapterNname,
  subjectName,
  processingTime,
  assessingTime,
  action,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.type}>{className}</Text>
      </View>

      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', alignItems: 'center'},
        ]}>
        <View style={{width: '80%'}}>
          <Text style={styles.subject}>{subjectName}</Text>
          <Text style={styles.chapter}>{chapterNname}</Text>
        </View>
        <TouchableOpacity onPress={action} style={styles.btnDetail}>
          <Text style={styles.btnDetailText}>Detail</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.greyText}>Pengerjaan</Text>
      <Text style={styles.time}>
        <IconTask />
        {processingTime}
      </Text>

      <Text style={styles.greyText}>Selesi Dinilai</Text>
      <Text style={styles.time}>
        <IconTask />
        {assessingTime}
      </Text>
    </View>
  );
};
export {CardTask};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    backgroundColor: Colors.white,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 8,
  },
  type: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontFamily: Fonts.RegularPoppins,
    marginRight: 10,
  },
  subject: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  chapter: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  btnDetail: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderColor: Colors.primary.base,
    borderWidth: 2,
    textAlign: 'center',
    height: 35,
  },
  btnDetailText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  greyText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  time: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 10,
  },
});
