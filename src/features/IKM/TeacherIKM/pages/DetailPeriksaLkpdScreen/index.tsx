import React, {useLayoutEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import useDetailPeriksaLkpd from './useDetailPeriksaLkpd';
import {Button, Header, MainText, MainView, PopUp} from '@components/atoms';
import {ExamHeader} from '@components/pages/ExamDetailGuruScreen/component';
import Colors from '@constants/colors';
import ArrowBottom from '@assets/svg/blue_arrow_down.svg';
import ArrowTop from '@assets/svg/blueArrowUp.svg';
import IconCheckGray from '@assets/svg/ic24_check.svg';
import IconCheckWhite from '@assets/svg/ic24_check_white.svg';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import RobotSuccess from '@assets/svg/robot_success.svg';
import {convertDate} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';
import {LembarKerjaScreenParam} from 'type/screen';

const DetailPeriksaLkpdScreen = () => {
  const {
    navigation,
    navigateScreen,
    taskData,
    getTaskTeacherDetail,
    reminderStudent,
    show,
    setShow,
    isCollected,
    setIsCollected,
    showFinishAssesment,
    completeTheAssesment,
    setShowFinishAssesment,
  } = useDetailPeriksaLkpd();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Detail Lembar Kerja'} />,
    });
  }, []);

  const cardItem = (data: any, isCollected: boolean) => {
    data = data?.item;
    return (
      <MainView flexDirection="row" alignContent="center" gap={12}>
        <Avatar id={data?.user?.avatar || ''} />
        <MainView flex={1}>
          <Text
            style={{fontWeight: '600', color: Colors.dark.neutral100}}
            numberOfLines={1}>
            {data?.user?.full_name || ''}
          </Text>
          <MainText fontSize={12} color={Colors.dark.neutral60}>
            {convertDate(data?.time_finish).format('dddd, DD MMM YYYY HH:mm')}
          </MainText>
        </MainView>
        {data?.correction_type === 'pending' ? (
          <Button
            label={isCollected ? 'Periksa' : 'Ingatkan'}
            background={Colors.primary.light2}
            color={Colors.primary.base}
            padding={10}
            action={() => {
              isCollected
                ? navigateScreen<LembarKerjaScreenParam>('LembarKerjaScreen', {
                    userRole: 'GURU',
                    id: data?.task_teacher_id || 0,
                    task_student_id: data?.id || 0,
                    title: taskData?.task_teacher?.subject?.name || '',
                  })
                : reminderStudent(data?.id);
            }}
          />
        ) : (
          <MainView
            padding={6}
            height={36}
            width={36}
            borderRadius={18}
            backgroundColor={Colors.success.light2}
            justifyContent="center">
            <MainText
              type="Bold"
              textAlign="center"
              // fontSize={16}
              lineHeight={24}
              color={Colors.success.base}>
              {data?.value ?? 0}
            </MainText>
          </MainView>
        )}
      </MainView>
    );
  };

  const renderEmptyComponent = (isCollected: boolean) => {
    return (
      <MainView alignItems="center" gap={12}>
        {isCollected ? <RobotSedih /> : <RobotSuccess />}

        <MainView gap={6}>
          <MainText
            type="Bold"
            textAlign="center"
            fontSize={16}
            lineHeight={20}
            color={Colors.dark.neutral100}>
            {isCollected
              ? 'Belum Ada Tugas LKPD\nDikumpulkan'
              : 'Semua Tugas LKPD Sudah\nDikumpulkan'}
          </MainText>
          <MainText
            textAlign="center"
            fontSize={14}
            lineHeight={18}
            color={Colors.dark.neutral60}>
            {isCollected
              ? 'Murid yang telah mengumpulkan\nTugas LKPD akan tampil di sini.'
              : 'Murid yang belum mengumpulkan\nTugas LKPD akan tampil di sini.'}
          </MainText>
        </MainView>
      </MainView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <ScrollView style={{flexGrow: 1}}>
          {/* MARK: START Header */}
          <ExamHeader
            isLkpd
            title={`${
              taskData?.task_teacher?.rombel_class_school?.name || '--'
            } • ${taskData?.task_teacher?.subject?.name || '--'} `}
            chapter={taskData?.task_teacher?.title || 'Tugas --'}
          />
          {/* MARK: END Header */}

          {/* MARK: START Detail */}
          <View style={styles.detailContainer}>
            <View style={styles.headerDetail}>
              <Text style={styles.titleDetail}>Detail Tugas</Text>
              <TouchableOpacity
                onPress={() => setShow(!show)}
                style={{
                  width: 50,
                  alignItems: 'flex-end',
                }}>
                {show ? <ArrowTop /> : <ArrowBottom />}
              </TouchableOpacity>
            </View>
            {show ? (
              <View style={{paddingBottom: 16}}>
                <View style={styles.item}>
                  <Text style={styles.titleData}>Tanggal/Jam Pengerjaan</Text>
                  <Text style={[styles.titleData, {color: Colors.black}]}>
                    {convertDate(taskData?.task_teacher?.time_start).format(
                      'ddd, DD MMM YYYY • HH:mm',
                    )}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.titleData}>Tanggal/Jam Pengumpulan</Text>
                  <Text style={[styles.titleData, {color: Colors.black}]}>
                    {convertDate(taskData?.task_teacher?.time_finish).format(
                      'ddd, DD MMM YYYY • HH:mm',
                    )}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.titleData}>Instruksi Pengerjaan</Text>
                  <Text style={[styles.titleData, {color: Colors.black}]}>
                    {taskData?.task_teacher?.instructions || '--'}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          {/* MARK: END Detail */}

          {/* MARK: START TabBar */}
          <View
            style={[styles.headerDetail, {paddingVertical: 0, paddingTop: 15}]}>
            <TouchableOpacity
              style={
                isCollected
                  ? styles.filterStudentActive
                  : styles.filterStudentNonActive
              }
              onPress={() => setIsCollected(true)}>
              <MainView
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={4}>
                <Text
                  style={
                    isCollected
                      ? styles.titleFilterActive
                      : styles.titleFilterNonActive
                  }>
                  Mengumpulkan
                </Text>
                <MainView
                  backgroundColor={
                    isCollected ? Colors.primary.light2 : Colors.dark.neutral20
                  }
                  alignItems="center"
                  justifyContent="center"
                  width={24}
                  height={24}
                  borderRadius={12}>
                  <MainText
                    style={
                      isCollected
                        ? styles.titleFilterActive
                        : styles.titleFilterNonActive
                    }>
                    {getTaskTeacherDetail?.data?.ttl_finish || '0'}
                  </MainText>
                </MainView>
              </MainView>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                !isCollected
                  ? styles.filterStudentActive
                  : styles.filterStudentNonActive
              }
              onPress={() => setIsCollected(false)}>
              <MainView
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={4}>
                <Text
                  style={
                    !isCollected
                      ? styles.titleFilterActive
                      : styles.titleFilterNonActive
                  }>
                  Belum Selesai
                </Text>
                <MainView
                  backgroundColor={
                    !isCollected ? Colors.primary.light2 : Colors.dark.neutral20
                  }
                  alignItems="center"
                  justifyContent="center"
                  width={24}
                  height={24}
                  borderRadius={12}>
                  <MainText
                    style={
                      !isCollected
                        ? styles.titleFilterActive
                        : styles.titleFilterNonActive
                    }>
                    {getTaskTeacherDetail?.data?.ttl_not_yet || '0'}
                  </MainText>
                </MainView>
              </MainView>
            </TouchableOpacity>
          </View>
          {/* MARK: END TabBar */}

          {/* MARK: START TabContent */}
          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: 16,
            }}>
            {isCollected ? (
              <FlatList
                scrollEnabled={false}
                data={getTaskTeacherDetail?.data?.finish}
                ListEmptyComponent={renderEmptyComponent(true)}
                ItemSeparatorComponent={() => <MainView height={12} />}
                renderItem={(item: any) => {
                  return cardItem(item, true);
                }}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={getTaskTeacherDetail?.data?.not_yet}
                ListEmptyComponent={renderEmptyComponent(false)}
                ItemSeparatorComponent={() => <MainView height={12} />}
                renderItem={(item: any) => {
                  return cardItem(item, false);
                }}
              />
            )}
          </View>
          {/* MARK: END TabContent */}
        </ScrollView>

        <View style={styles.btmbtn}>
          <Button
            label={'Selesaikan Penilaian'}
            iconLeft={
              getTaskTeacherDetail?.data?.button_riwayatkan ? (
                <IconCheckWhite />
              ) : (
                <IconCheckGray />
              )
            }
            action={() => setShowFinishAssesment(true)}
            isDisabled={!getTaskTeacherDetail?.data?.button_riwayatkan}
          />
        </View>
      </View>
      <PopUp
        show={showFinishAssesment}
        title="Selesaikan Lembar Kerja"
        desc={
          'Apakah Anda yakin untuk menyelesaikan Lembar Kerja? Pastikan semua Murid sudah selesai diperiksa.'
        }
        additionalContent={
          <View style={styles.popUpFinishContainer}>
            <Text style={styles.textFinish}>
              {`${getTaskTeacherDetail?.data?.ttl_finish ?? 0} dari ${
                getTaskTeacherDetail?.data?.ttl_finish +
                  getTaskTeacherDetail?.data?.ttl_not_yet ?? 0
              } telah dinilai`}
            </Text>
          </View>
        }
        titleCancel="Batal"
        titleConfirm="Riwayatkan"
        actionCancel={() => {
          setShowFinishAssesment(false);
        }}
        actionConfirm={() => {
          setShowFinishAssesment(false);
          completeTheAssesment();
        }}
      />
    </View>
  );
};

export {DetailPeriksaLkpdScreen};
