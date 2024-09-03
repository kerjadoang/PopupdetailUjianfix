import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHistoryTanyaBelumDijawab} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import HistoryItem from './components/HistoryItem';
import Colors from '@constants/colors';
import EmptyData from '@components/atoms/EmptyData';
import {Button} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

const BelumDijawabTabScreen: React.FC = () => {
  const [filter, setFilter] = useState<IBasePaginationFilter>({
    page: 1,
    limit: 15,
  });
  const dispatch = useDispatch();
  const belumDijawabStore = useSelector(
    (store: RootState) => store.historyTanya,
  );
  const {
    belumDijawab: belumDijawabData,
    belumDijawabNextPage,
    loadingList,
  } = belumDijawabStore;
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<ParamList, 'BelumDijawabTabScreen'>
    >();
  const noData = belumDijawabData?.data
    ? belumDijawabData?.data?.length < 1
    : null;

  useEffect(() => {
    dispatch(fetchHistoryTanyaBelumDijawab(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    if (belumDijawabNextPage && filter.page! > 1 && !loadingList) {
      dispatch(fetchHistoryTanyaBelumDijawab(filter));
    }
  }, [belumDijawabNextPage, dispatch, filter, loadingList]);

  const onEndReached = () => {
    if (belumDijawabNextPage && !loadingList) {
      setFilter(prevState => ({
        ...prevState,
        page: filter.page! + filter.limit!,
      }));
    }
  };

  const onNavigate = (tanyaId: any) => {
    navigation.navigate('DetailHistoryTanyaScreen', {
      tanyaId,
      status: 'pending',
    });
  };

  const renderItem = ({item}: any) => {
    return <HistoryItem onPress={() => onNavigate(item.ID)} data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={belumDijawabData?.data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            <EmptyData
              title="Kamu Belum Bertanya"
              description="Ada soal atau pelajaran yang sulit dimengerti? Ayo tanyakan ke Guru Ahli."
              image="emptyQuestion"
              titleStyle={{color: Colors.dark.neutral100}}
              descriptionStyle={{color: Colors.dark.neutral60}}
            />
          </View>
        }
        keyExtractor={item => `${item.ID}`}
        contentContainerStyle={{gap: 4}}
      />
      {noData && (
        <View style={{padding: 16}}>
          <Button
            label="Tanya Sekarang"
            action={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.neutral10,
  },
});

export default BelumDijawabTabScreen;
