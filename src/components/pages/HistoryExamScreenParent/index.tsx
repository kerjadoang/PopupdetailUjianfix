import {View, Text, Pressable, FlatList} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import useHistoryExamSceen from './useHistoryExamSceen';
import {NewGetAllExam} from '@constants/GetAllExam';
import {SwipeUp} from '@components/atoms';
import SwipeUpBelumDinilai from './components/SwipeUpBelumDinilai';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import StudentUjianHistoryCard from '../StudentHistoryExamScreen/components/StudentUjianHistoryCard';
import Robot from '@assets/svg/robot_empty_state.svg';
import SwipeUpDoneCorrection from '../StudentHistoryExamScreen/components/SwipeUp';

const HistoryExamScreenParent = () => {
  const route = useRoute<RouteProp<ParamList, 'HistoryExamScreenParent'>>();
  const {subject, data} = route.params;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryExamScreenParent'>>();

  let params = {
    navigation,
    data,
    subject,
  };
  const {
    handleSelect,
    selectedItem,
    getExamHistoryParent,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryExam,
    swipeUpType,
    swipeUpData,
    result,
    goToExplaination,
    __onEndReachedRiwayat,
    isDoneScoring,
    dataAnak,
  } = useHistoryExamSceen(params);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Riwayat Ujian'} />,
    });
  }, [navigation]);

  const _renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Robot width={100} height={100} />
      <Text style={styles.emptyTitle}>Belum Ada Riwayat Ujian</Text>
      <Text style={styles.emptySubTitle}>
        Ujian yang telah berakhir akan tampil di sini.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.capsuleContainer}>
        <FlatList<(typeof NewGetAllExam)[0]>
          data={NewGetAllExam}
          horizontal
          renderItem={({item}) => (
            <Pressable
              key={item.id}
              style={[
                styles.unChoose,
                item.id === selectedItem && styles.choose,
              ]}
              onPress={() => handleSelect(item.id)}>
              <Text
                style={
                  (styles.textUnchoose,
                  item.id === selectedItem && styles.textChoose)
                }>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {getExamHistoryParent.data?.length !== 0 ? (
        <FlatList<IUjianHistory>
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={getExamHistoryParent?.data}
          keyExtractor={(item, _id): any => item.id || _id}
          onEndReached={__onEndReachedRiwayat}
          ListEmptyComponent={_renderEmpty}
          renderItem={({item, index}) => {
            return (
              <StudentUjianHistoryCard
                key={index}
                isFromTeacher={false}
                isDoneScoring={isDoneScoring}
                item={item}
                onButtonPress={() => fetchDetailHistoryExam(item)}
              />
            );
          }}
        />
      ) : (
        _renderEmpty()
      )}

      <SwipeUp
        isSwipeLine={true}
        visible={isShowDetail}
        onClose={() => {
          setIsShowDetail(false);
        }}
        height={500}
        children={
          swipeUpType === 'BELUM-DINILAI' ? (
            <SwipeUpBelumDinilai
              hideSwipeUp={() => setIsShowDetail(false)}
              data={swipeUpData}
            />
          ) : (
            <SwipeUpDoneCorrection
              showExplanation={() => goToExplaination()}
              data={swipeUpData}
              result={result}
              accessToken={dataAnak?.access_token}
            />
          )
        }
      />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export default HistoryExamScreenParent;
