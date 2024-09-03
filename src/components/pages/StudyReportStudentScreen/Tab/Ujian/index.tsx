import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {CardTask} from '../../component/CardTask';
import IconUjian from '@assets/svg/Ujian.svg';
import {CardAverageValue} from '../../component/CardAverageValue';
import {useExam} from './useExam';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

interface IProps {
  navigation?: any;
  subject?: any;
  student?: any;
}
const Ujian = (props: IProps) => {
  const {navigation} = props;
  const {examData, isLoading} = useExam(props?.subject, props?.student);
  return (
    <View style={styles.container}>
      <CardTask
        type="Ujian"
        title="Total Ulangan/Ujian Selesai"
        icon={<IconUjian width={24} height={24} />}
        countDone={(examData?.task_done || examData?.total_exam) ?? 0}
        buttonTitle={'Riwayat Ujian'}
        onPress={() => {
          navigation.navigate('StudentHistoryExamScreen', {
            subject: props?.subject,
            student_id: props?.student?.id,
          });
        }}
      />
      <CardAverageValue type="Ujian" title="Rata-rata Nilai" data={examData} />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {Ujian};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 25,
  },
});
