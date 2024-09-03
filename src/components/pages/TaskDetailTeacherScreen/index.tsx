import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo} from 'react';
import {styles} from './styles';
import useTaskDetailTeacher from './useTaskDetailTeacher';
import {Button, Header, PopUp, SwipeUp} from '@components/atoms';
import IconMore from '@assets/svg/ic24_more_gray.svg';
import IconTugas from '@assets/svg/ic64_pr_tugas.svg';
import IconDown from '@assets/svg/ic24_chevron_down_blue.svg';
import IconUp from '@assets/svg/ic24_chevron_up_blue.svg';
import IconCheck from '@assets/svg/ic24_check.svg';
import IconCheckWhite from '@assets/svg/ic24_check_white.svg';
import {TaskCollect, TaskNotYet} from './Tab';
import TabBarLabel from '@components/atoms/TabBarLabel';
import {StudentItem} from './components/StudentItem';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import {convertDate} from '@constants/functional';

const TaskDetailTeacherScreen = () => {
  const {
    navigation,
    tabActive,
    Tab,
    handleOnPressTab,
    isShowDetail,
    setIsShowDetail,
    TabLabel,
    idTask,
    getTaskTeacherDetail,
    idHistory,
    detailHistory,
    detailShow,
    dataHeader,
    completeTheAssesment,
    setShowFinishAssesment,
    showFinishAssesment,
    isShowSwipeUp,
    setIsShowSwipeUp,
    duplicateTask,
  } = useTaskDetailTeacher();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Tugas'}
          onPressIconLeft={() => navigation.goBack()}
          iconRight={<IconMore width={24} height={24} />}
          onPressIconRight={() => {
            setIsShowSwipeUp(true);
          }}
        />
      ),
    });
  }, [navigation]);

  const MORE_MENUS = useMemo(
    () => [
      {
        isActive: true,
        icon: <IconCopy />,
        buttonTitle: 'Duplikat Tugas',
        buttonOnPress: () => {
          duplicateTask(idTask ?? idHistory).then((res: IDataDuplicateTask) => {
            navigation.navigate('LMSTeacherTaskCreateScreen', {
              duplicateTask: res,
              isFrom: 'TaskScreen',
            });
            setIsShowSwipeUp(false);
          });
        },
      },
    ],
    [],
  );

  const _renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailTitle}>Tanggal/Jam Pengerjaan</Text>
        <Text style={styles.detailDate}>
          {convertDate(detailShow?.task_teacher?.time_start)
            .locale('id')
            .format('dddd, D MMM YYYY • HH:mm') ?? ''}
        </Text>
        <Text style={styles.detailTitle}>Tanggal/Jam Pengumpulan</Text>
        <Text style={styles.detailDate}>
          {convertDate(detailShow?.task_teacher?.time_finish)
            .locale('id')
            .format('dddd, D MMM YYYY • HH:mm') ?? ''}
        </Text>
        {detailShow?.task_teacher?.time_correction && idHistory ? (
          <View>
            <Text style={styles.detailTitle}>Selesai Dinilai</Text>
            <Text style={styles.detailDate}>
              {convertDate(detailShow?.task_teacher?.time_correction)
                .locale('id')
                .format('dddd, D MMM YYYY • HH:mm') ?? '-'}
            </Text>
          </View>
        ) : null}

        <Text style={styles.detailTitle}>Instruksi Pengerjaan</Text>
        <Text style={[styles.detailDate, {paddingBottom: 0}]}>
          {detailShow?.task_teacher?.instructions ?? '-'}
        </Text>
      </View>
    );
  };

  const _renderDetailHistory = () => {
    return (
      <View>
        <Text style={[styles.taskDetail, {marginTop: 16}]}>
          {detailHistory?.student_info}
        </Text>
        <FlatList
          nestedScrollEnabled
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={detailHistory?.concat}
          keyExtractor={(_, _id): any => _id}
          // ListEmptyComponent={_renderNotFound()}
          renderItem={({item, index}) => (
            <StudentItem
              key={index}
              lengthData={getTaskTeacherDetail?.data?.finish?.length}
              avatar={item?.user?.avatar_path_url}
              name={item?.user?.full_name}
              status={item?.status}
              correctionType={item?.correction_type}
              date={item?.time_finish}
              value={item?.value}
              onPress={() => {}}
            />
          )}
        />
      </View>
    );
  };

  const isDisabled = !getTaskTeacherDetail?.data?.button_riwayatkan;
  // const isDisabled = !getTaskTeacherDetail?.data?.finish?.every(
  //   (obj: any) => obj?.correction_type === 'finish',
  // );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        nestedScrollEnabled>
        <View style={styles.topContainer}>
          <IconTugas width={64} height={64} />
          <View style={styles.topRight}>
            <Text style={styles.topTitle}>{dataHeader?.text ?? '-'}</Text>
            <Text style={styles.topLabel} numberOfLines={2}>
              {dataHeader?.title ?? '-'}
            </Text>
          </View>
        </View>
        <View style={styles.rectangle} />
        <View style={styles.detailContainer}>
          <View style={styles.detailTopContainer}>
            <Text style={styles.taskDetail}>Detail Tugas</Text>
            <TouchableOpacity onPress={() => setIsShowDetail(!isShowDetail)}>
              {isShowDetail ? (
                <IconUp width={24} height={24} />
              ) : (
                <IconDown width={24} height={24} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {isShowDetail ? _renderDetail() : null}
        <View style={[styles.rectangle, {marginBottom: 0}]} />
        {idHistory ? (
          _renderDetailHistory()
        ) : (
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.navigatorTabBarStyle,
              tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
            }}>
            <Tab.Screen
              key={'TaskCollect'}
              name={TabLabel?.collect}
              initialParams={{id: idTask}}
              component={TaskCollect}
              listeners={{
                focus: () => handleOnPressTab(TabLabel?.collect),
              }}
              options={{
                tabBarLabelStyle:
                  tabActive === TabLabel?.collect
                    ? styles.labelActiveStyle
                    : styles.labelStyle,
                tabBarLabel: props => (
                  <TabBarLabel
                    {...props}
                    title={TabLabel?.collect}
                    count={getTaskTeacherDetail?.data?.ttl_finish}
                  />
                ),
                tabBarPressColor: 'white',
              }}
            />
            <Tab.Screen
              key={'ProjectHistory'}
              name={TabLabel?.notyet}
              initialParams={{id: idTask}}
              component={TaskNotYet}
              listeners={{
                focus: () => handleOnPressTab(TabLabel?.notyet),
              }}
              options={{
                tabBarLabelStyle:
                  tabActive === TabLabel?.notyet
                    ? styles.labelActiveStyle
                    : styles.labelStyle,
                tabBarLabel: props => (
                  <TabBarLabel
                    {...props}
                    title={TabLabel?.notyet}
                    count={getTaskTeacherDetail?.data?.ttl_not_yet}
                  />
                ),
                tabBarPressColor: 'white',
              }}
            />
          </Tab.Navigator>
        )}
      </ScrollView>
      {idTask ? (
        <View style={styles.bottomContainer}>
          <Button
            label="Selesaikan Penilaian"
            iconLeft={
              isDisabled ? (
                <IconCheck width={24} height={24} />
              ) : (
                <IconCheckWhite width={24} height={24} />
              )
            }
            style={styles.buttonStyle}
            isDisabled={isDisabled}
            action={() => setShowFinishAssesment(true)}
          />
        </View>
      ) : null}
      <PopUp
        show={showFinishAssesment}
        title="Selesaikan PR/Projek/Tugas"
        desc={
          'Apakah Anda yakin untuk menyelesaikan PR Pola Bilangan? Pastikan semua Murid sudah selesai diperiksa.'
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
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUp}
        onClose={() => setIsShowSwipeUp(false)}
        height={500}
        children={
          <View style={styles.swipeUpContainer}>
            {MORE_MENUS.map((val, key) => {
              if (val.isActive) {
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.__wrapIconAndText]}
                    onPress={val.buttonOnPress}>
                    {val.icon}
                    <Text style={styles.__regularText}>{val.buttonTitle}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        }
      />
    </View>
  );
};

export {TaskDetailTeacherScreen};
