import {FlatList, ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import {styles} from '../styles';
import usePancasilaProjectScreen from '../usePancasilaProjectScreen';
import Card from '../components/Card';
import {useFocusEffect} from '@react-navigation/native';
import {fetchgetHistoryPancasilaProject} from '@redux';
import {useDispatch} from 'react-redux';
import {EmptyState, SwipeUp} from '@components/atoms';
import {ButtonFilter} from '@components/pages/AdministrativeReportScreen/components/ButtonFIlter';
import {SwipeUpFilter} from '../components/SwipeUpFilter';

const ProjectHistory: React.FC = () => {
  const {
    __onEndReachedRiwayat,
    navigation,
    pancasilaProjectStore,
    riwayatPagination,
    buttonCategoryHistory,
    isShowFilterHistory,
    setIsShowFilterHistory,
    filterHistory,
    setFilterHistory,
    setListPagination,
    setSelected,
    selected,
  } = usePancasilaProjectScreen();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        fetchgetHistoryPancasilaProject({
          ...riwayatPagination,
          status:
            filterHistory?.length !== 0
              ? filterHistory?.map((obj: any) => obj?.value)?.toString()
              : 'batal,selesai',
        }),
      );
    }, [filterHistory, riwayatPagination, dispatch]),
  );

  const renderChildrenSwipeUpFilter = () => {
    const filterItem = [
      {id: 1, name: 'Selesai', value: 'selesai'},
      {id: 2, name: 'Dibatalkan', value: 'batal'},
    ];
    return (
      <SwipeUpFilter
        title={'Filter'}
        type={'history'}
        filter={filterHistory}
        setFilter={setFilterHistory}
        dualButton
        subTitle={'Kategori'}
        data={filterItem}
        setIsShow={setIsShowFilterHistory}
        setSelected={setSelected}
        selected={selected}
        setPagination={setListPagination}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.BtnContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {buttonCategoryHistory.map((item: any, index: number) => {
            return (
              <ButtonFilter
                title={item.name}
                key={index}
                onPress={item.onPress}
                isSelected={item.isSelected}
                value={item.value}
              />
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={pancasilaProjectStore?.historyData}
        keyExtractor={(_, _id): any => _id}
        onEndReached={__onEndReachedRiwayat}
        ListEmptyComponent={
          <EmptyState
            type={'empty_sad'}
            title={'Belum Ada Riwayat Projek'}
            subTitle={'daftar projek yang telah selesai akan tampil di sini.'}
          />
        }
        renderItem={({item}) => (
          <Card
            data={item}
            onPress={() => {
              navigation.navigate('EbookScreen', {
                projectData: item?.project,
                screen_type: 'murid pancasila',
              });
            }}
          />
        )}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowFilterHistory}
        onClose={() => {
          setIsShowFilterHistory(false);
        }}
        height={200}
        children={renderChildrenSwipeUpFilter()}
      />
    </View>
  );
};

export {ProjectHistory};
