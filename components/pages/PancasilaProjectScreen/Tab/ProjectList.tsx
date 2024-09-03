import {FlatList, View} from 'react-native';
import React, {useCallback} from 'react';
import {styles} from '../styles';
import usePancasilaProjectScreen from '../usePancasilaProjectScreen';
import Card from '../components/Card';
import {useFocusEffect} from '@react-navigation/native';
import {fetchgetListPancasilaProject} from '@redux';
import {useDispatch} from 'react-redux';
import {EmptyState, SwipeUp} from '@components/atoms';
import {SwipeUpFilter} from '../components/SwipeUpFilter';
import {ScrollView} from 'react-native-gesture-handler';
import {ButtonFilter} from '@components/pages/AdministrativeReportScreen/components/ButtonFIlter';

const ProjectList: React.FC = () => {
  const {
    navigation,
    pancasilaProjectStore,
    listPagination,
    __onEndReachedList,
    filterRecommend,
    setFilterRecommend,
    isShowFilterRecommend,
    setIsShowFilterRecommend,
    selected,
    setSelected,
    setListPagination,
    buttonCategoryRecommend,
  } = usePancasilaProjectScreen();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const payload = {
        ...listPagination,
        status: 'berlangsung',
      };
      if (filterRecommend?.length !== 2) {
        Object.assign(payload, {
          recommended: filterRecommend
            ?.map((obj: any) => obj?.value)
            ?.toString(),
        });
      }
      dispatch(fetchgetListPancasilaProject(payload));
    }, [dispatch, listPagination, filterRecommend]),
  );

  const renderChildrenSwipeUpFilter = () => {
    const filterItem = [
      {id: 1, name: 'Rekomendasi', value: true},
      {id: 2, name: 'Tidak Direkomendasi', value: false},
    ];
    return (
      <SwipeUpFilter
        title={'Filter'}
        type={'history'}
        filter={filterRecommend}
        setFilter={setFilterRecommend}
        dualButton
        subTitle={'Kategori'}
        data={filterItem}
        setIsShow={setIsShowFilterRecommend}
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
          {buttonCategoryRecommend.map((item: any, index: number) => {
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
        data={pancasilaProjectStore?.data}
        keyExtractor={(_, _id): any => _id}
        onEndReached={__onEndReachedList}
        ListEmptyComponent={
          <EmptyState
            type={'empty_sad'}
            title={'Belum Ada Projek Berlangsung'}
            subTitle={
              'daftar projek yang sedang berlangsung akan tampil disini.'
            }
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
        visible={isShowFilterRecommend}
        onClose={() => {
          setIsShowFilterRecommend(false);
        }}
        height={200}
        children={renderChildrenSwipeUpFilter()}
      />
    </View>
  );
};

export {ProjectList};
