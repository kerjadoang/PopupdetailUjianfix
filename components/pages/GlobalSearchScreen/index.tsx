import {InputText, ListItem} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  FlatList,
  PressableProps,
} from 'react-native';

import SectionHeader from '@components/organism/SectionHeader';
import Chip from '@components/organism/Chip';
import GlobalSearchTabScreens from './TabsScreen';

import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import EmptyDataIC from '@assets/svg/empty_data.svg';
import {
  useAllDeleteLatestSearch,
  useDeleteLatestSearchItem,
  useGetLatestSearch,
  useGetPopularSearch,
  useVotePopularSearch,
} from '@services/search';
import {
  ILatestSearchResponse,
  ILatestSearchResponseData,
} from '@services/search/type';
import {SvgUri} from 'react-native-svg';
import {useGetSubjectByClass} from '@services/global';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {SubjectType} from '@constants/subjectType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {rdxDispatch} from '@constants/functional';
import {specificSearchAllDestroy, specificSearchDestroy} from '@redux';

export const EmptyData = (props: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '80%',
        marginTop: 30,
        alignSelf: 'center',
      }}>
      <EmptyDataIC width={120} height={120} />
      <Text
        style={{
          marginTop: 12,
          fontFamily: 'Poppins-SemiBold',
          fontSize: 18,
          textAlign: 'center',
        }}>
        Pencarian Tidak Ditemukan
      </Text>
      <Text
        style={{
          marginTop: 6,
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
        Hasil pencarian “{props.query?.toUpperCase()}” nihil. Coba masukkan kata
        kunci lainnya!
      </Text>
    </View>
  );
};

type CardItemProps = {
  index: number;
  data: IBaseSubject;
  left?: React.ReactNode;
  colors?: string;
  onPress?: PressableProps['onPress'];
};

const CardItem: React.FC<CardItemProps> = props => {
  const {width} = useWindowDimensions();
  return (
    <Pressable
      style={{
        width: (width * 44) / 100,
        borderRadius: 10,
        backgroundColor: props.colors,
        height: 56,
        marginTop: props.index > 1 ? 12 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onPress}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        {props.left}
      </View>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          color: Colors.dark.neutral100,
          fontSize: 12,
          marginLeft: 12,
          flex: 2,
        }}>
        {props.data.name}
      </Text>
    </Pressable>
  );
};

const SearchHeader = (props: any) => {
  return (
    <View style={styles.headerSearch}>
      <View style={{flex: 3}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={props.query}
          onSubmitEditing={() => props.setQueryVal(props.query)}
          maxLength={60}
          ref={props.searchInputRef}
          onChangeText={text => props.setQuery(text)}
          leftIcon={SearchIcon}
          rightIcon={props.query && ResetIcon}
          onPressIcon={() => {
            props.setQuery('');
            props.setQueryVal('');
            rdxDispatch(specificSearchDestroy());
            rdxDispatch(specificSearchAllDestroy());
          }}
          placeholder="Cari materi, video, atau soal"
        />
      </View>
      <Pressable
        style={styles.cancelLabelContainter}
        onPress={() => {
          props.navigation.goBack();
          rdxDispatch(specificSearchDestroy());
          rdxDispatch(specificSearchAllDestroy());
        }}>
        <Text style={styles.cancelLabel}>Batal</Text>
      </Pressable>
    </View>
  );
};

const GlobalSearch: React.FC = (props: any) => {
  const [query, setQuery] = useState<string>('');

  const [queryVal, setQueryVal] = useState<string>('');
  const [hexColor] = useState([
    '#EBF2FD',
    '#FFF5E8',
    '#E6F5EE',
    '#FFF2F7',
    '#FEEFEF',
  ]);
  const [dataLatestSearch, setDataLatestSearch] =
    useState<ILatestSearchResponse>();
  const searchInputRef = useRef();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'GlobalSearchScreen'>>();

  const {data: latestSearchData, refetch: getLatestSearchData} =
    useGetLatestSearch();
  const {data: popularSearchData, refetch: getPopularSearch} =
    useGetPopularSearch();
  const {data: subjectData, refetch: getSubjectByClass} =
    useGetSubjectByClass();
  const {mutate: deleteLatestSearchItem} = useDeleteLatestSearchItem();
  const {mutate: deleteAllLatestSearch} = useAllDeleteLatestSearch();
  const {mutate: votePopularSearch} = useVotePopularSearch();

  useEffect(() => {
    if (queryVal.length > 0) {
      searchInputRef.current?.focus?.();
    } else {
      getLatestSearchData();
    }
  }, [queryVal]);

  useEffect(() => {
    if (query.length < 1) {
      setQueryVal('');
    }
  }, [query]);

  useEffect(() => {
    const getUserDataFromJwt = async () => {
      const credential = await AsyncStorage.getItem(Keys.token);
      if (credential) {
        const userDataFromJwt: IBaseJWTUser = jwtDecode(credential);
        getSubjectByClass(userDataFromJwt.class_id, {page: 1, limit: 6});
      }
    };
    getUserDataFromJwt();
    getPopularSearch({page: 1, limit: 5});
  }, [queryVal]);

  useEffect(() => {
    if (latestSearchData) {
      setDataLatestSearch(latestSearchData);
    }
  }, [latestSearchData]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <SearchHeader
          query={query}
          searchInputRef={searchInputRef}
          setQuery={setQuery}
          setQueryVal={setQueryVal}
          navigation={props.navigation}
        />
      ),
    });
  }, [props.navigation, query]);

  if (queryVal) {
    return <GlobalSearchTabScreens query={queryVal} />;
  }

  const onDeleteLatestSearchItem = (item: ILatestSearchResponseData) => {
    const newData = [...(dataLatestSearch?.data ?? [])].filter(
      dataItem => dataItem.id !== item.id,
    );
    setDataLatestSearch(prevState => ({...prevState, data: newData}));
    deleteLatestSearchItem(item.id);
  };
  const onDeleteAllLatestSearch = () => {
    setDataLatestSearch(prevState => ({...prevState, data: []}));
    deleteAllLatestSearch();
  };

  const renderItemChips = ({
    item,
    index,
  }: {
    item: ILatestSearchResponseData;
    index: number;
  }) => {
    return (
      <Chip
        key={item.id}
        label={item.word ?? ''}
        chipContainerStyle={{
          backgroundColor:
            hexColor[Math.floor(Math.random() * hexColor.length)],
        }}
        firstIndex={index === 0}
        closable={() => onDeleteLatestSearchItem(item)}
        onPress={() => {
          setQuery(item?.word as string);
          setQueryVal(item?.word as string);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}>
        {dataLatestSearch?.data && dataLatestSearch?.data?.length > 0 && (
          <>
            <SectionHeader
              sectionTitle="Pencarian Terakhir"
              sectionSubtitle="Hapus Riwayat"
              onPressSectionSubtitle={onDeleteAllLatestSearch}
              sectionContainerStyle={{marginTop: 20}}
            />
            <View style={styles.capsule}>
              <FlatList
                data={dataLatestSearch?.data}
                renderItem={renderItemChips}
                horizontal
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </>
        )}
        <SectionHeader
          sectionTitle="Pencarian Populer"
          sectionContainerStyle={{marginTop: 32, marginBottom: 12}}
        />
        {popularSearchData?.data?.map((item, index) => (
          <ListItem
            key={item.id}
            left={
              item.subject?.path_url ? (
                <SvgUri width={32} height={32} uri={item.subject?.path_url} />
              ) : null
            }
            subject={{
              id: item.subject?.id ?? 0,
              name: `${item.total_search} pencarian`,
            }}
            name={item?.words ?? ''}
            firstIndex={index === 0}
            onPress={() => {
              votePopularSearch(item?.words, item?.subject_id ?? null);
              setQuery(item?.words as string);
              setQueryVal(item?.words as string);
            }}
          />
        ))}
        <SectionHeader
          sectionTitle="Mata Pelajaran"
          sectionContainerStyle={{marginTop: 32, marginBottom: 12}}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {subjectData?.data?.map((item, index) => (
            <CardItem
              index={index}
              key={item.id}
              data={item}
              onPress={() =>
                navigation.navigate('ChapterKPRegularScreen', {
                  subject_data: item as any,
                  subject_type: SubjectType?.KPRegular?.Learn,
                })
              }
              colors={hexColor?.[Math.floor(Math.random() * hexColor.length)]}
              left={
                item?.path_url ? (
                  <SvgUri width={32} height={32} uri={item?.path_url} />
                ) : null
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },
  cancelLabelContainter: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary.base,
  },
  capsule: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default GlobalSearch;
