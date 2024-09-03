import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHistoryTanyaTidakSesuai} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import HistoryItem from './components/HistoryItem';
import Colors from '@constants/colors';
import EmptyData from '@components/atoms/EmptyData';
import {Button} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

const TidakSesuaiTabScreen: React.FC = () => {
  const [filter, setFilter] = useState<IBasePaginationFilter>({
    page: 1,
    limit: 15,
  });
  const dispatch = useDispatch();
  const tidakSesuaiStore = useSelector(
    (store: RootState) => store.historyTanya,
  );
  const {
    tidakSesuai: tidakSesuaiData,
    tidakSesuaiNextPage,
    loadingList,
  } = tidakSesuaiStore;
  const navigation: any =
    useNavigation<
      MaterialTopTabNavigationProp<ParamList, 'TidakSesuaiTabScreen'>
    >();
  const noData = tidakSesuaiData?.data
    ? tidakSesuaiData?.data?.length < 1
    : null;

  useEffect(() => {
    dispatch(fetchHistoryTanyaTidakSesuai(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    if (tidakSesuaiNextPage && filter.page! > 1 && !loadingList) {
      dispatch(fetchHistoryTanyaTidakSesuai(filter));
    }
  }, [dispatch, filter, loadingList, tidakSesuaiNextPage]);

  const onEndReached = () => {
    if (tidakSesuaiNextPage && !loadingList) {
      setFilter(prevState => ({
        ...prevState,
        page: filter.page! + filter.limit!,
      }));
    }
  };

  const onNavigate = (tanyaId: any) => {
    navigation.navigate('DetailHistoryTanyaScreen', {
      tanyaId,
    });
  };

  const renderItem = ({item}: any) => {
    return <HistoryItem onPress={() => onNavigate(item.ID)} data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tidakSesuaiData?.data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={item => `${item.ID}`}
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
        contentContainerStyle={{gap: 4}}
      />
      {noData && (
        <View style={{padding: 16}}>
          <Button
            label="Tanya Sekarang"
            action={() => {
              navigation.pop();
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

export default TidakSesuaiTabScreen;
