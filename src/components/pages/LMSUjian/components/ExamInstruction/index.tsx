import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {MainView, MainText} from '@components/atoms';
import {Styles} from '../../style';
const InstructionData = [
  'Semua soal wajib dijawab.',
  'Untuk melihat jawaban, selesaikan tes dalam jangka waktu yang diberikan atau klik selesai.',
  'Untuk menjawab pertanyaan, berilah penjelasan yang tepat.',
];
type Props = {};

const ExamInstruction: FC<Props> = ({}) => {
  return (
    <MainView marginVertical={20}>
      <MainText style={Styles.instructionLabel}>Cara Pengerjaan:</MainText>
      {InstructionData?.map((_instructionText, index) => {
        return (
          <View key={index} style={{flexDirection: 'row'}}>
            <View style={{flex: 0.03}}>
              <Text style={Styles.instructionText}>{'\u2022'}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={Styles.instructionText}>{_instructionText}</Text>
            </View>
          </View>
        );
      })}
    </MainView>
  );
};

export default ExamInstruction;
