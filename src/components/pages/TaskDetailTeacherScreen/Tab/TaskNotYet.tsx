import {FlatList, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {styles} from '../styles';
import useTaskDetailTeacher from '../useTaskDetailTeacher';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {fetchTaskTeacherDetail} from '@redux';
import {StudentItem} from '../components/StudentItem';
import RobotHappy from '@assets/svg/robot_success.svg';

const TaskNotYet: React.FC = () => {
  const {dispatch, reminderStudent, getTaskTeacherDetail} =
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
        <RobotHappy width={100} height={100} />
        <Text style={styles.notFoundLabel}>
          Semua PR/Projek/Tugas Sudah Dikumpulkan
        </Text>
        <Text style={styles.notFoundText}>
          Murid yang belum mengumpulkan PR/Projek/Tugas akan tampil di sini.
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
        data={getTaskTeacherDetail?.data?.not_yet}
        ListEmptyComponent={_renderNotFound()}
        keyExtractor={(_, _id): any => _id}
        renderItem={({item, index}) => (
          <StudentItem
            key={index}
            type={'not_yet'}
            lengthData={getTaskTeacherDetail?.data?.finish?.length}
            avatar={item?.user?.avatar_path_url}
            name={item?.user?.full_name}
            status={item?.correction_type}
            date={item?.time_correction}
            onPress={() => {
              reminderStudent(item?.id);
            }}
          />
        )}
      />
    </View>
  );
};

export {TaskNotYet};
