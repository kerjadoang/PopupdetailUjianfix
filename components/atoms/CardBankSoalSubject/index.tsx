import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@components/atoms/Button';
import Fonts from '@constants/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  icon: any;
  subject: string;
  numOfQuestions: number;
  action: any;
};

const CardBankSoalSubject: FC<Props> = ({
  icon,
  subject,
  numOfQuestions,
  action,
}) => {
  return (
    <View style={[styles.cardItem, styles.shadowProp]}>
      {icon}
      <View style={{flex: 1}}>
        <Text style={styles.subjectName}>{subject}</Text>
        <Text style={styles.subjectQuestionNumber}>{numOfQuestions} Soal</Text>
      </View>
      <Button
        outline={true}
        label="Kerjakan"
        fontSize={12}
        style={{
          flex: 1 / 2,
          marginLeft: 12,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}
        action={action}
      />
    </View>
  );
};

export default CardBankSoalSubject;

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 2,
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
  subjectName: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  subjectQuestionNumber: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
});
