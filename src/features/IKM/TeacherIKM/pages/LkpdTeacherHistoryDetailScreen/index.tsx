import React, {useLayoutEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import useLkpdTeacherHistoryDetail from './useLkpdTeacherHistoryDetail';
import {Header, MainText, MainView, SwipeUp} from '@components/atoms';
import {ExamHeader} from '@components/pages/ExamDetailGuruScreen/component';
import {convertDate} from '@constants/functional';
import Colors from '@constants/colors';
import ArrowBottom from '@assets/svg/blue_arrow_down.svg';
import ArrowTop from '@assets/svg/blueArrowUp.svg';
import IcMore from '@assets/svg/ic24_more_blue.svg';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import Avatar from '@components/atoms/Avatar';
import {ListStudent} from './types';

const LkpdTeacherHistoryDetailScreen = () => {
  const {
    navigation,
    detailHistory,
    show,
    setShow,
    showOptionMenu,
    toggleOptionMenu,
  } = useLkpdTeacherHistoryDetail();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail LKPD'}
          iconRight={<IcMore />}
          onPressIconRight={toggleOptionMenu}
        />
      ),
    });
  }, []);

  const cardItem = (data: ListStudent) => {
    return (
      <MainView flexDirection="row" alignContent="center">
        <Avatar id={data?.user?.avatar || ''} />
        <MainView flex={1} marginRight={12}>
          <Text
            style={{fontWeight: '600', color: Colors.dark.neutral100}}
            numberOfLines={1}>
            {data?.user?.full_name || ''}
          </Text>
          <MainText fontSize={12} color={Colors.dark.neutral60}>
            {convertDate(data?.time_correction).format(
              'dddd, DD MMM YYYY HH:mm',
            )}
          </MainText>
        </MainView>

        <MainView
          width={36}
          height={36}
          justifyContent="center"
          alignItems="center"
          borderRadius={18}
          backgroundColor={
            data?.status === 'finish'
              ? Colors.success.light2
              : Colors.danger.light2
          }>
          <MainText
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            color={
              data?.status === 'finish'
                ? Colors.success.base
                : Colors.danger.base
            }>
            {data?.value}
          </MainText>
        </MainView>
      </MainView>
    );
  };

  const renderSwipeUpOption = () => {
    return (
      <MainView
        flexDirection="row"
        gap={12}
        marginHorizontal={16}
        alignItems="center">
        <IconCopy />
        <TouchableOpacity>
          <MainText
            fontSize={16}
            color={Colors.dark.neutral100}
            lineHeight={24}>
            Duplikat Lembar Kerja
          </MainText>
        </TouchableOpacity>
      </MainView>
    );
  };
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.cardContainer}>
          <ScrollView style={{flexGrow: 1}}>
            {/* MARK: START Header */}
            <ExamHeader
              isLkpd
              title={`${
                detailHistory?.task_teacher?.rombel_class_school?.name || '--'
              } • ${detailHistory?.task_teacher?.subject?.name || '--'} `}
              chapter={detailHistory?.task_teacher?.title || 'Tugas --'}
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
                      {convertDate(
                        detailHistory?.task_teacher?.time_start,
                      ).format('ddd, DD MMM YYYY • HH:mm')}
                    </Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.titleData}>
                      Tanggal/Jam Pengumpulan
                    </Text>
                    <Text style={[styles.titleData, {color: Colors.black}]}>
                      {convertDate(
                        detailHistory?.task_teacher?.time_finish,
                      ).format('ddd, DD MMM YYYY • HH:mm')}
                    </Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.titleData}>Selesai dinilai</Text>
                    <Text style={[styles.titleData, {color: Colors.black}]}>
                      {convertDate(
                        detailHistory?.task_teacher?.time_correction,
                      ).format('ddd, DD MMM YYYY • HH:mm')}
                    </Text>
                  </View>
                  {detailHistory?.task_teacher?.instructions !== '' ? (
                    <View style={styles.item}>
                      <Text style={styles.titleData}>Instruksi Pengerjaan</Text>
                      <Text style={[styles.titleData, {color: Colors.black}]}>
                        {detailHistory?.task_teacher?.instructions || '--'}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
            {/* MARK: END Detail */}

            <MainText
              fontWeight="600"
              color={Colors.dark.neutral100}
              paddingBottom={8}>
              {detailHistory?.student_info}
            </MainText>

            <FlatList
              scrollEnabled={false}
              data={detailHistory?.list_student}
              ItemSeparatorComponent={() => <MainView height={16} />}
              renderItem={(items: any) => cardItem(items?.item)}
            />
          </ScrollView>
        </View>
      </View>

      <SwipeUp
        visible={showOptionMenu}
        onClose={toggleOptionMenu}
        children={renderSwipeUpOption()}
      />
    </>
  );
};

export {LkpdTeacherHistoryDetailScreen};
