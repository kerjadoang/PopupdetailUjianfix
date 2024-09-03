import {FlatList, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {styles} from '../styles';
import useTaskDetailTeacher from '../useTaskDetailTeacher';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {fetchTaskTeacherDetail} from '@redux';
import {StudentItem} from '../components/StudentItem';
import RobotSedih from '@assets/svg/robot_sedih.svg';

const TaskCollect: React.FC = () => {
  const {navigation, dispatch, getTaskTeacherDetail, detailShow} =
    useTaskDetailTeacher();
  const route = useRoute();

  const taskId: any = route?.params?.id;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTaskTeacherDetail(taskId));
    }, []),
  );

  const _renderNotFound = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.notFoundLabel}>
          Belum Ada PR/Projek/Tugas Dikumpulkan
        </Text>
        <Text style={styles.notFoundText}>
          Murid yang telah mengumpulkan PR/Projek/Tugas akan tampil di sini.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.containerTab}>
      <FlatList
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={getTaskTeacherDetail?.data?.finish}
        keyExtractor={(_, _id): any => _id}
        ListEmptyComponent={_renderNotFound()}
        renderItem={({item, index}) => (
          <StudentItem
            key={index}
            lengthData={getTaskTeacherDetail?.data?.finish?.length}
            avatar={item?.user?.avatar_path_url}
            name={item?.user?.full_name}
            status={item?.correction_type}
            date={item?.time_correction}
            value={item?.value}
            onPress={() => {
              navigation.navigate('CheckPRProjectTeacherScreen', {
                student: item?.user,
                task: detailShow,
                task_student_id: item?.id,
                taskId: taskId,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export {TaskCollect};
