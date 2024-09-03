import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IHistoryTanyaResponseData, fetchHistoryTanyaTerjawab} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import HistoryItem from './components/HistoryItem';
import Colors from '@constants/colors';
import EmptyData from '@components/atoms/EmptyData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {Button} from '@components/atoms';

const TerjawabTabScreen: React.FC = () => {
  const [filter, setFilter] = useState<IBasePaginationFilter>({
    page: 1,
    limit: 15,
  });
  const dispatch = useDispatch();
  const terjawabStore = useSelector((store: RootState) => store.historyTanya);
  const {terjawab: terjawabData, terjawabNextPage, loadingList} = terjawabStore;
  const navigation: any =
    useNavigation<
      MaterialTopTabNavigationProp<ParamList, 'TerjawabTabScreen'>
    >();
  const isFocused = useIsFocused();
  const noData = terjawabData?.data ? terjawabData?.data?.length < 1 : null;
  const sortedData = terjawabData?.data ? [...terjawabData.data] : [];
  const unread = sortedData?.filter(item => !item.is_read)?.length;
  useEffect(() => {
    dispatch(fetchHistoryTanyaTerjawab(filter));
  }, [dispatch, filter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: () =>
        unread && unread > 0 ? (
          <Text style={[styles.baseBadge, isFocused && styles.activeBadge]}>
            {unread}
          </Text>
        ) : null,
    });
  }, [isFocused, navigation, unread]);

  useEffect(() => {
    if (terjawabNextPage && filter.page! > 1 && !loadingList) {
      dispatch(fetchHistoryTanyaTerjawab(filter));
    }
  }, [dispatch, filter, loadingList, terjawabNextPage]);

  const onEndReached = () => {
    if (terjawabNextPage && !loadingList) {
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

  const renderItem = ({item}: {item: IHistoryTanyaResponseData}) => {
    return <HistoryItem onPress={() => onNavigate(item.ID)} data={item} />;
  };

  sortedData.sort((a, b) => {
    if (a?.is_read === b?.is_read) {
      return 0;
    } else if (a?.is_read) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
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
  baseBadge: {
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
    fontSize: 12,
    textAlignVertical: 'center',
    backgroundColor: Colors.dark.neutral10,
    color: Colors.dark.neutral60,
  },
  activeBadge: {
    backgroundColor: Colors.primary.light2,
    color: Colors.primary.base,
  },
});

export default TerjawabTabScreen;
