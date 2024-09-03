/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import provider from '@services/lms/provider';
import useDebounce from '@hooks/useDebounce';
import ButtonFilter from './ButtonFilter';
import TabContentItemNotFound from './TabContentItemNotFound';
import CardListItem from './CardListItem';
import ResetIcon from '@assets/svg/close_x.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import {RootState} from 'src/redux/rootReducer';
import {HEIGHT, LIMIT_OFFSET, TAB_NAMES} from '../utils';
import {Button, InputText, SwipeUp} from '@components/atoms';
import {fetchPerluDiperiksa, fetchDijadwalkan} from '@redux';
import {useDuplicateTask, useRemoveTask} from '@services/lms';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';
import {convertDate} from '@constants/functional';
import {IDataDuplicateTask, ParamList} from 'type/screen';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

dayjs.extend(utc);
dayjs.extend(timezone);

const Search: FC<{
  query: string;
  setQuery: (_value: string) => void;
}> = memo(({query, setQuery}) => (
  <InputText
    bottom={16}
    backgroundColor={Colors.dark.neutral10}
    returnKeyType="search"
    value={query}
    maxLength={60}
    onChangeText={text => setQuery(text)}
    leftIcon={SearchIcon}
    rightIcon={query && ResetIcon}
    onPressIcon={() => setQuery('')}
    placeholder="Cari"
  />
));

const TabContentItem: FC<{
  type: (typeof TAB_NAMES)[keyof typeof TAB_NAMES];
}> = ({type}) => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSTeacherTaskScreen'>>();

  const guruPRProjekTugasStore = useSelector(
    (store: RootState) => store.guruPRProjekTugas,
  );

  const {mutate: duplicateTask, isLoading} = useDuplicateTask();
  const {mutate: removeTask, isLoading: isLoadingRemove} = useRemoveTask();

  const [perluDiperiksaPagination, setPerluDiperiksaPagination] =
    useState(LIMIT_OFFSET);

  const [dijadwalkanPagination, setDijadwalkanPagination] =
    useState(LIMIT_OFFSET);

  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = useDebounce(searchValue);

  const [isShowKelas, setIsShowKelas] = useState(false);
  const [isShowKelasExpanded, setIsShowKelasExpanded] = useState(false);
  const [kelas, setKelas] = useState<any[]>([]);
  const [kelasFilter, setKelasFilter] = useState<any[]>([]);
  const [kelasTempFilter, setKelasTempFilter] = useState<any>([]);

  const [isShowMapel, setIsShowMapel] = useState(false);
  const [isShowMapelExpanded, setIsShowMapelExpanded] = useState(false);
  const [mapels, setMapels] = useState([]);
  const [mapelFilter, setMapelFilter] = useState([]);
  const [mapelTempFilter, setMapelTempFilter] = useState<any>([]);

  const [isShowTaskType, setIsShowTaskType] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [taskTypeFilter, setTaskTypeFilter] = useState([]);
  const [taskTypeTempFilter, setTaskTypeTempFilter] = useState<any>([]);
  const isFocused = useIsFocused();

  const [swipeAction, setSwipeAction] = useState<boolean>(false);

  const getDataMapel = async () => {
    const resKelas = kelas.filter(kelas =>
      kelasFilter?.some(data => data === kelas?.rombel_class_school?.id),
    );
    const mappedClasses = resKelas
      .map(data => data?.rombel_class_school?.name?.match(/\d+/)[0])
      .join(',');
    try {
      const datas = await apiGet({
        url: URL_PATH.get_subject_all(mappedClasses),
      });

      const resData = datas.map(
        (subject: any) => subject?.subject_details?.[0],
      );
      setMapels(resData);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    const fetchKelas = async () => {
      const {status, data} = await provider.getDropdownClassTeacher();

      if (status === 200) {
        setKelas(
          data?.data?.map((value: any) => ({
            rombel_class_school: {
              id: value?.rombel_class_school_id,
              name: value?.rombel_class_school_name,
            },
          })),
        );
      }
    };

    fetchKelas();

    const fetchTaskType = async () => {
      const {status, data} = await provider.getDropdownTaskTypeTeacher();

      if (status === 200) {
        setTaskTypes(data?.data);
      }
    };

    fetchTaskType();
  }, []);

  useEffect(() => {
    getDataMapel();
  }, [kelasFilter]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (type === 'Perlu Diperiksa') {
      dispatch(
        fetchPerluDiperiksa({
          search: getSearchValue,
          ...perluDiperiksaPagination,
          class_id: kelasFilter,
          subject_id: mapelFilter,
          type:
            taskTypeFilter.length != 0
              ? taskTypeFilter
              : ['PR', 'Projek', 'Tugas'],
        }),
      );
    } else {
      dispatch(
        fetchDijadwalkan({
          search: getSearchValue,
          ...dijadwalkanPagination,
          class_id: kelasFilter,
          subject_id: mapelFilter,
          type:
            taskTypeFilter.length != 0
              ? taskTypeFilter
              : ['PR', 'Projek', 'Tugas'],
        }),
      );
    }
  }, [
    isFocused,
    getSearchValue,
    kelasFilter,
    mapelFilter,
    taskTypeFilter,
    perluDiperiksaPagination,
    dijadwalkanPagination,
  ]);

  const getData = useCallback(() => {
    if (type === 'Perlu Diperiksa') {
      dispatch(
        fetchPerluDiperiksa({
          search: getSearchValue,
          ...perluDiperiksaPagination,
          class_id: kelasFilter,
          subject_id: mapelFilter,
          type:
            taskTypeFilter.length != 0
              ? taskTypeFilter
              : ['PR', 'Projek', 'Tugas'],
        }),
      );
    } else {
      dispatch(
        fetchDijadwalkan({
          search: getSearchValue,
          ...dijadwalkanPagination,
          class_id: kelasFilter,
          subject_id: mapelFilter,
          type:
            taskTypeFilter.length != 0
              ? taskTypeFilter
              : ['PR', 'Projek', 'Tugas'],
        }),
      );
    }
  }, [swipeAction]);

  useLayoutEffect(() => {
    setPerluDiperiksaPagination(LIMIT_OFFSET);
    setDijadwalkanPagination(LIMIT_OFFSET);
  }, [getSearchValue, kelasFilter, mapelFilter, taskTypeFilter]);

  useLayoutEffect(() => {
    if (kelasFilter.length > 0) {
      setKelasTempFilter(kelasFilter);
    }

    if (mapelFilter.length > 0) {
      setMapelTempFilter(mapelFilter);
    }

    if (taskTypeFilter.length > 0) {
      setTaskTypeTempFilter(taskTypeFilter);
    }
  }, [isShowKelas, isShowMapel, isShowTaskType]);

  const __onEndReachedPerluDiperiksa = () => {
    const {perluDiperiksaDatasNextPage, isLoadingDatas, perluDiperiksaDatas} =
      guruPRProjekTugasStore;
    if (!perluDiperiksaDatas?.length) {
      return;
    }

    if (perluDiperiksaDatasNextPage && !isLoadingDatas) {
      setPerluDiperiksaPagination((prevState: typeof LIMIT_OFFSET) => ({
        ...prevState,
        offset:
          perluDiperiksaPagination.offset + perluDiperiksaPagination.limit,
      }));
    }
  };

  const __onEndReachedDijadwalkan = () => {
    const {dijadwalkanDatasNextPage, isLoadingDatas, dijadwalkanDatas} =
      guruPRProjekTugasStore;
    if (!dijadwalkanDatas?.length) {
      return;
    }

    if (dijadwalkanDatasNextPage && !isLoadingDatas) {
      setDijadwalkanPagination(prevState => ({
        ...prevState,
        offset: dijadwalkanPagination.offset + dijadwalkanPagination.limit,
      }));
    }
  };

  const __setDataKelasFilter = useCallback(
    (data: string) => {
      if (kelasTempFilter.includes(data)) {
        setKelasTempFilter((prevState: any) =>
          prevState.filter((item: any) => item !== data),
        );
      } else {
        setKelasTempFilter((prevState: any) => [...prevState, data]);
      }
    },
    [kelasTempFilter],
  );

  const __selectAllKelasFilter = useCallback(() => {
    let data: any = [];

    kelas.map((item: any) => {
      data.push(item?.rombel_class_school?.id);
    });

    setKelasTempFilter(data);
  }, [kelas]);

  const __renderFilterKelas = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={kelasFilter.length > 0}
          onPress={() => setIsShowKelas(true)}
          title={
            kelasFilter.length === kelas.length
              ? 'Semua Kelas'
              : kelasFilter.length > 0
              ? `${kelasFilter.length} Kelas`
              : 'Semua Kelas'
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowKelas}
          onClose={() => setIsShowKelas(false)}
          height={500}
          children={
            <View
              style={{
                padding: 10,
                height: !isShowKelasExpanded ? undefined : HEIGHT * 0.5,
              }}>
              <Text style={styles.swipeUpMapelItemTitle}>Filter</Text>

              <View style={styles.swipeUpMapelItemHeaderSwipe}>
                <Text style={styles.swipeUpMapelItemText}>Kelas</Text>

                <Pressable onPress={__selectAllKelasFilter}>
                  <Text style={styles.swipeUpMapelItemSubText}>
                    Pilih Semua
                  </Text>
                </Pressable>
              </View>
              <FlatList<any>
                data={kelas}
                numColumns={3}
                columnWrapperStyle={{
                  flexWrap: 'wrap',
                  flex: 1,
                }}
                contentContainerStyle={{}}
                renderItem={({item, index: id}) => {
                  let active = kelasTempFilter.includes(
                    item?.rombel_class_school?.id,
                  );
                  if (id >= 6 && !isShowKelasExpanded) {
                    return <View key={item?.id || id} />;
                  }
                  return (
                    <Pressable
                      key={id}
                      onPress={() =>
                        __setDataKelasFilter(item?.rombel_class_school?.id)
                      }
                      style={[
                        styles.swipeUpMapelItemChipContainer,
                        {
                          margin: 6,
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item?.rombel_class_school?.name}
                      </Text>
                    </Pressable>
                  );
                }}
              />
              {/* <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.swipeUpMapelItemContentSwipe,
                  !isShowKelasExpanded && {height: HEIGHT * 0.04},
                ]}>
                {kelas.map((item: any, id: number) => {
                  let active = kelasTempFilter.includes(
                    item?.rombel_class_school?.id,
                  );

                  return (
                    <Pressable
                      key={id}
                      onPress={() =>
                        __setDataKelasFilter(item?.rombel_class_school?.id)
                      }
                      style={[
                        styles.swipeUpMapelItemChipContainer,
                        {
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item?.rombel_class_school?.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView> */}

              {kelas.length > 0 &&
                (isShowKelasExpanded ? (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onPress={() => setIsShowKelasExpanded(false)}>
                    <Text style={styles.swipeUpMapelItemShowLess}>
                      Tampilkan Sedikit
                    </Text>

                    <IconUp width={16} height={16} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onPress={() => setIsShowKelasExpanded(true)}>
                    <Text style={styles.swipeUpMapelItemShowLess}>
                      Tampilkan Lebih Banyak
                    </Text>

                    <IconDown width={16} height={16} />
                  </Pressable>
                ))}

              <View
                style={[
                  styles.swipeUpMapelItemContentSwipe,
                  {gap: 12, marginTop: 16},
                ]}>
                <Button
                  label="Atur Ulang"
                  action={() => {
                    setKelasTempFilter([]);
                    setKelasFilter([]);
                    setIsShowKelas(false);
                  }}
                  style={{flex: 1}}
                  // color={Colors.dark.neutral50}
                  outline={true}
                  borderWidth={1}
                  // borderColor={Colors.dark.neutral40}
                  background="transparent"
                />

                <Button
                  label="Terapkan"
                  action={() => {
                    setKelasFilter(kelasTempFilter);
                    setIsShowKelas(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </View>
    ),
    [isShowKelas, isShowKelasExpanded, kelasFilter, kelasTempFilter],
  );

  const __setDataMapelFilter = useCallback(
    (data: string) => {
      if (mapelTempFilter.includes(data)) {
        setMapelTempFilter((prevState: any) =>
          prevState.filter((item: any) => item !== data),
        );
      } else {
        setMapelTempFilter((prevState: any) => [...prevState, data]);
      }
    },
    [mapelTempFilter],
  );

  const __selectAllMapelFilter = useCallback(() => {
    let data: any = [];
    mapels.map((item: any) => data.push(item?.id));
    setMapelTempFilter(data);
  }, [mapels]);

  const __renderFilterMapel = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={mapelFilter.length > 0}
          onPress={() => setIsShowMapel(true)}
          title={
            mapelFilter.length === mapels.length
              ? 'Semua Mapel'
              : mapelFilter.length > 0
              ? `${mapelFilter.length} Mapel`
              : 'Semua Mapel'
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowMapel}
          onClose={() => setIsShowMapel(false)}
          height={500}
          children={
            <View
              style={{
                padding: 10,
                height: !isShowMapelExpanded ? undefined : HEIGHT * 0.6,
              }}>
              <Text style={styles.swipeUpMapelItemTitle}>Filter</Text>

              <View style={styles.swipeUpMapelItemHeaderSwipe}>
                <Text style={styles.swipeUpMapelItemText}>Mata Pelajaran</Text>

                <Pressable onPress={__selectAllMapelFilter}>
                  <Text style={styles.swipeUpMapelItemSubText}>
                    Pilih Semua
                  </Text>
                </Pressable>
              </View>
              <FlatList<any>
                data={mapels}
                numColumns={3}
                columnWrapperStyle={{flexWrap: 'wrap', flex: 1}}
                renderItem={({item, index: id}) => {
                  const active = mapelTempFilter.includes(item?.id);
                  if (id >= 6 && !isShowMapelExpanded) {
                    return <View key={item?.id || id} />;
                  }
                  return (
                    <Pressable
                      key={item?.id || id}
                      onPress={() => __setDataMapelFilter(item?.id)}
                      style={[
                        styles.swipeUpMapelItemChipContainer,
                        {
                          margin: 6,
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item?.name}{' '}
                        {!item?.class?.name ? '' : ` - ${item?.class?.name}`}
                      </Text>
                    </Pressable>
                  );
                }}
              />

              {mapels.length > 0 &&
                (isShowMapelExpanded ? (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onPress={() => setIsShowMapelExpanded(false)}>
                    <Text style={styles.swipeUpMapelItemShowLess}>
                      Tampilkan Sedikit
                    </Text>

                    <IconUp width={16} height={16} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onPress={() => setIsShowMapelExpanded(true)}>
                    <Text style={styles.swipeUpMapelItemShowLess}>
                      Tampilkan Lebih Banyak
                    </Text>

                    <IconDown width={16} height={16} />
                  </Pressable>
                ))}

              <View
                style={[
                  styles.swipeUpMapelItemContentSwipe,
                  {gap: 12, marginTop: 16},
                ]}>
                <Button
                  label="Atur Ulang"
                  action={() => {
                    setMapelTempFilter([]);
                    setMapelFilter([]);
                    setIsShowMapel(false);
                  }}
                  style={{flex: 1}}
                  // color={Colors.dark.neutral50}
                  outline={true}
                  borderWidth={1}
                  // borderColor={Colors.dark.neutral40}
                  background="transparent"
                />

                <Button
                  label="Terapkan"
                  action={() => {
                    setMapelFilter(mapelTempFilter);
                    setIsShowMapel(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </View>
    ),
    [isShowMapel, isShowMapelExpanded, mapelFilter, mapelTempFilter],
  );

  const __setDataTaskTypeFilter = useCallback(
    (data: string) => {
      if (taskTypeTempFilter.includes(data)) {
        setTaskTypeTempFilter((prevState: any) =>
          prevState.filter((item: any) => item !== data),
        );
      } else {
        setTaskTypeTempFilter((prevState: any) => [...prevState, data]);
      }
    },
    [taskTypeTempFilter],
  );

  const __renderFilterTaskType = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={taskTypeFilter.length > 0}
          onPress={() => setIsShowTaskType(true)}
          title={
            taskTypeFilter.length === taskTypes.length
              ? 'Semua Tipe'
              : taskTypeFilter.length > 0
              ? `${taskTypeFilter.length} Tipe`
              : 'Semua Tipe'
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowTaskType}
          onClose={() => setIsShowTaskType(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.swipeUpMapelItemTitle}>Filter</Text>

              <View style={styles.swipeUpMapelItemHeaderSwipe}>
                <Text style={styles.swipeUpMapelItemText}>Tipe</Text>
              </View>

              <View style={styles.swipeUpMapelItemContentSwipe}>
                {taskTypes.map((item: any, id: number) => {
                  let active = taskTypeTempFilter.includes(item);

                  return (
                    <Pressable
                      key={id}
                      onPress={() => __setDataTaskTypeFilter(item)}
                      style={[
                        styles.swipeUpMapelItemChipContainer,
                        {
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View
                style={[
                  styles.swipeUpMapelItemContentSwipe,
                  {gap: 12, marginTop: 16},
                ]}>
                <Button
                  label="Atur Ulang"
                  action={() => {
                    setTaskTypeTempFilter([]);
                    setTaskTypeFilter([]);
                    setIsShowTaskType(false);
                  }}
                  style={{flex: 1}}
                  // color={Colors.dark.neutral50}
                  outline={true}
                  borderWidth={1}
                  // borderColor={Colors.dark.neutral40}
                  background="transparent"
                />

                <Button
                  label="Terapkan"
                  action={() => {
                    setTaskTypeFilter(taskTypeTempFilter);
                    setIsShowTaskType(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </View>
    ),
    [isShowTaskType, taskTypeFilter, taskTypeTempFilter],
  );

  const __renderSearchAndFilter = useCallback(
    () => (
      <>
        <Search
          query={searchValue}
          setQuery={_value => setSearchValue(_value.trimStart())}
        />

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 6}}>
            {(kelasFilter.length > 0 ||
              mapelFilter.length > 0 ||
              taskTypeFilter.length > 0) && (
              <Pressable
                onPress={() => {
                  setKelasFilter([]);
                  setKelasTempFilter([]);
                  setMapelFilter([]);
                  setMapelTempFilter([]);
                  setTaskTypeFilter([]);
                  setTaskTypeTempFilter([]);
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32 / 2,
                  backgroundColor: Colors.primary.light3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <ResetIcon />
              </Pressable>
            )}

            {__renderFilterKelas()}
            {__renderFilterMapel()}
            {__renderFilterTaskType()}
          </ScrollView>
        </View>
      </>
    ),
    [
      searchValue,
      kelasFilter.length,
      mapelFilter.length,
      taskTypeFilter.length,
      __renderFilterKelas,
      __renderFilterMapel,
      __renderFilterTaskType,
    ],
  );

  if (type === TAB_NAMES.PERLU_DIPERIKSA) {
    const isPerluDiperiksaDatasNotFound =
      guruPRProjekTugasStore.perluDiperiksaDatas?.length === 0 &&
      getSearchValue.length === 0 &&
      kelasFilter.length === 0 &&
      mapelFilter.length === 0 &&
      taskTypeFilter.length === 0;

    const isPerluDiperiksaDatasSearchNotFound =
      guruPRProjekTugasStore.perluDiperiksaDatas?.length === 0 &&
      getSearchValue.length > 0;

    const isPerluDiperiksaDatasFilterNotFound =
      guruPRProjekTugasStore.perluDiperiksaDatas?.length === 0 &&
      (kelasFilter.length > 0 ||
        mapelFilter.length > 0 ||
        taskTypeFilter.length > 0);

    return isPerluDiperiksaDatasNotFound ? (
      <TabContentItemNotFound
        title={'Belum Ada PR/Projek/Tugas\nDiperiksa'}
        description={
          'PR/Projek/Tugas yang perlu diperiksa\nakan tampil di sini.'
        }
        isShowButton={true}
        buttonTitle="+ Buat PR/Projek/Tugas"
        buttonAction={() =>
          navigation.navigate('LMSTeacherTaskCreateScreen', {})
        }
      />
    ) : (
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <View
          style={
            (isPerluDiperiksaDatasSearchNotFound ||
              isPerluDiperiksaDatasFilterNotFound) && {flex: 1.5}
          }>
          {__renderSearchAndFilter()}
        </View>

        {isPerluDiperiksaDatasSearchNotFound ? (
          <TabContentItemNotFound
            isSearch={true}
            title="Pencarian Tidak Ditemukan"
            description={`Hasil pencarian "${getSearchValue.toUpperCase()}" nihil.\nCoba masukkan kata kunci lainnya!`}
          />
        ) : isPerluDiperiksaDatasFilterNotFound ? (
          <TabContentItemNotFound
            isFilter={true}
            title="Hasil Filter Tidak Ditemukan"
            description={
              'Coba atur ulang filter yang\nsudah Anda atur sebelumnya'
            }
          />
        ) : null}

        <FlatList
          contentContainerStyle={{paddingHorizontal: 3, paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
          data={guruPRProjekTugasStore.perluDiperiksaDatas}
          keyExtractor={(_, _id): any => _?.id}
          onEndReached={__onEndReachedPerluDiperiksa}
          renderItem={({item}) => (
            <CardListItem
              id={item?.id}
              navigation={navigation}
              category={item?.type}
              rombelName={item?.rombel_class_school?.name}
              mapel={item?.subject?.name}
              title={item?.title}
              givenDate={convertDate(item?.time_start).format(
                'ddd, D MMM YYYY • hh:mm',
              )}
              collectionDate={convertDate(item?.time_finish).format(
                'ddd, D MMM YYYY • hh:mm',
              )}
              studentInfo={item?.student_info}
              type="PERLU_DIPERIKSA"
              buttonTitle="Periksa"
              buttonOnPress={() => {
                navigation.navigate('TaskDetailTeacherScreen', {
                  id: item?.id,
                });
              }}
              buttonOnPressDuplicate={() => {
                duplicateTask(item?.id).then((res: IDataDuplicateTask) => {
                  navigation.navigate('LMSTeacherTaskCreateScreen', {
                    duplicateTask: res,
                    isFrom: 'TaskScreen',
                  });
                });
              }}
            />
          )}
        />

        <View style={styles.containerBottomShadow}>
          <Button
            label={'+ Buat PR/Projek/Tugas'}
            action={() => navigation.navigate('LMSTeacherTaskCreateScreen', {})}
          />
        </View>
        {isLoading || isLoadingRemove ? <LoadingIndicator /> : null}
      </KeyboardAvoidingView>
    );
  } else {
    const isDijadwalkanDatasNotFound =
      guruPRProjekTugasStore.dijadwalkanDatas?.length === 0 &&
      getSearchValue.length === 0 &&
      kelasFilter.length === 0 &&
      mapelFilter.length === 0 &&
      taskTypeFilter.length === 0;

    const isDijadwalkanDatasSearchNotFound =
      guruPRProjekTugasStore.dijadwalkanDatas?.length === 0 &&
      getSearchValue.length > 0;

    const isDijadwalkanDatasFilterNotFound =
      guruPRProjekTugasStore.dijadwalkanDatas?.length === 0 &&
      (kelasFilter.length > 0 ||
        mapelFilter.length > 0 ||
        taskTypeFilter.length > 0);

    return isDijadwalkanDatasNotFound ? (
      <TabContentItemNotFound
        title={'Belum Ada PR/Projek/Tugas\nDijadwalkan'}
        description={
          'PR/Projek/Tugas yang telah dijadwalkan\nakan tampil di sini.'
        }
        isShowButton={true}
        buttonTitle="+ Buat PR/Projek/Tugas"
        buttonAction={() =>
          navigation.navigate('LMSTeacherTaskCreateScreen', {})
        }
      />
    ) : (
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <View
          style={
            (isDijadwalkanDatasSearchNotFound ||
              isDijadwalkanDatasFilterNotFound) && {flex: 1.5}
          }>
          {__renderSearchAndFilter()}
        </View>

        {isDijadwalkanDatasSearchNotFound ? (
          <TabContentItemNotFound
            isSearch={true}
            title="Pencarian Tidak Ditemukan"
            description={`Hasil pencarian "${getSearchValue.toUpperCase()}" nihil.\nCoba masukkan kata kunci lainnya!`}
          />
        ) : isDijadwalkanDatasFilterNotFound ? (
          <TabContentItemNotFound
            isFilter={true}
            title="Hasil Filter Tidak Ditemukan"
            description={
              'Coba atur ulang filter yang\nsudah Anda atur sebelumnya'
            }
          />
        ) : null}

        <FlatList
          contentContainerStyle={{paddingHorizontal: 3, paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
          data={guruPRProjekTugasStore.dijadwalkanDatas}
          keyExtractor={(_, _id): any => _?.id}
          onEndReached={__onEndReachedDijadwalkan}
          renderItem={({item}) => (
            <CardListItem
              id={item?.id}
              navigation={navigation}
              category={item?.type}
              rombelName={item?.rombel_class_school?.name}
              mapel={item?.subject?.name}
              title={item?.title}
              givenDate={convertDate(item?.time_start).format(
                'ddd, D MMM YYYY • HH:mm',
              )}
              collectionDate={convertDate(item?.time_finish).format(
                'ddd, D MMM YYYY • HH:mm',
              )}
              studentInfo={item?.student_info}
              type="DIJADWALKAN"
              buttonOnPressDuplicate={async () => {
                duplicateTask(item?.id).then((res: IDataDuplicateTask) => {
                  navigation.navigate('LMSTeacherTaskCreateScreen', {
                    duplicateTask: res,
                    isFrom: 'TaskScreen',
                  });
                });
              }}
              buttonOnPressRemove={() => {
                removeTask(item?.id).then(() => {
                  setSwipeAction(true);
                  getData();
                });
              }}
            />
          )}
        />

        <View style={styles.containerBottomShadow}>
          <Button
            label={'+ Buat PR/Projek/Tugas'}
            action={() => navigation.navigate('LMSTeacherTaskCreateScreen', {})}
          />
        </View>
        {isLoading || isLoadingRemove ? <LoadingIndicator /> : null}
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  containerBottomShadow: {
    marginLeft: -16,
    marginRight: -16,
    marginBottom: -16,
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.dark.neutral40,
  },
  swipeUpMapelItemTitle: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
  },
  swipeUpMapelItemHeaderSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeUpMapelItemText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  swipeUpMapelItemSubText: {
    borderRadius: 30,
    color: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Poppins-Bold',
  },
  swipeUpMapelItemContentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    gap: 5,
  },
  swipeUpMapelItemChipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  swipeUpMapelItemShowLess: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
  },
});

export default memo(TabContentItem);
