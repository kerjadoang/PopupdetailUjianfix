import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {CardTask} from '../../component/CardTask';
import IconTask from '@assets/svg/ic24_PR.svg';
import {CardAverageValue} from '../../component/CardAverageValue';
import {useTask} from './useTask';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

interface IProps {
  navigation?: any;
  subject: any;
  student?: any;
}
const Task = (props: IProps) => {
  const {navigation} = props;
  const {taskData, isLoading} = useTask(props?.subject, props?.student);

  return (
    <View style={styles.container}>
      <CardTask
        type="Task"
        title="Total PR, Projek & Tugas Selesai"
        icon={<IconTask width={24} height={24} />}
        countDone={(taskData?.task_done || taskData?.total_exam) ?? 0}
        buttonTitle={'Riwayat PR, Projek & Tugas'}
        subTitle={`Total PR, Projek & Tugas Tidak Dikerjakan: ${
          taskData?.task_undone ?? 0
        }`}
        onPress={() => {
          navigation.navigate('StudentHistoryTaskScreen', {
            subject: props?.subject,
            student: props?.student,
          });
        }}
      />
      <CardAverageValue type="Ujian" title="Rata-rata Nilai" data={taskData} />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {Task};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 25,
  },
});
