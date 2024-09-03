/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Colors from '@constants/colors';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ICEmptyPRImage from '@assets/svg/ic_empty_PR.svg';
import RobotEmptySearchImage from '@assets/svg/robot_empty_search.svg';
import RobotSedihImage from '@assets/svg/robot_sedih.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
import IconInfo from '@assets/svg/ic24_info_orange_2.svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import styles from './style';
import useDebounce from '@hooks/useDebounce';
import {RootState} from 'src/redux/rootReducer';
import {Header} from '@components/atoms/Header';
import {Button, SwipeUp, InputText} from '@components/atoms';
import {ButtonFilter, CardListItem} from './components';
import {
  fetchBelumDikerjakan,
  fetchGetLMSMateriSekolah,
  fetchGetRecordTaskDetailHistory,
  fetchRiwayat,
  getRiwayatDestroy,
  setGetSearch,
} from '@redux';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ChildrenSwipeUp from './components/ChildrenSwipeUp';
import provider from '@services/lms/provider';
import {IStartPRProjectTugasResponse} from '@services/lms/type';
import {AxiosResponse} from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {convertDate, rdxDispatch} from '@constants/functional';
import {ParamList} from 'type/screen';
import {LMSPRTugasIsScheduled} from './useTaskDetail';

const {height: HEIGHT} = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

const TAB_NAMES = {
  BELUM_DIKERJAKAN: 'Belum Dikerjakan',
  RIWAYAT: 'Riwayat',
};

const TFILTER_PENILAIAN = {
  BELUM_DINILAI: {
    title: 'Belum Dinilai',
    value: 'pending',
  },
  SUDAH_DINILAI: {
    title: 'Sudah Dinilai',
    value: 'finish',
  },
};

const LIMIT_OFFSET = {
  limit: 10,
  offset: 0,
};

const MyTabContent: FC = ({route: {name, params}}: any) => {
  return <MyTabContentItem type={name} data={params} />;
};

const MyTabContentItem: FC<{type: any; data: any}> = ({type, data}) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSPRTugasScreen'>>();
  const [mapels, setMapels] = useState<[]>([]);
  const [isShowMapel, setIsShowMapel] = useState(false);
  const [isShowMapelExpanded, setIsShowMapelExpanded] = useState(false);
  const [isShowPenilaian, setIsShowPenilaian] = useState(false);
  const [isShowKerjakan, setIsShowKerjakan] = useState(false);
  const [dataKerjakanSelected, setDataKerjakanSelected] = useState<any>({});
  const [mapelFilter, setMapelFilter] = useState<[]>([]);
  const [mapelTempFilter, setMapelTempFilter] = useState<any>([]);
  const [penilaianFilter, setPenilaianFilter] = useState<any>([]);
  const [penilaianTempFilter, setPenilaianTempFilter] = useState<any>([]);
  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);
  const [isShowDetailRiwayat, setIsShowDetailRiwayat] =
    useState<boolean>(false);
  const [dataSwipeUp, setDataSwipeUp] = useState<any>(data);
  const isFocused = useIsFocused();

  const [belumDikerjakanPagination, setBelumDikerjakanPagination] =
    useState(LIMIT_OFFSET);

  const lmsPRProjekTugasStore = useSelector(
    (store: RootState) => store.lmsPRProjekTugas,
  );

  useEffect(() => {
    if (lmsPRProjekTugasStore?.belumDikerjakanDatas && dataSwipeUp) {
      setDataKerjakanSelected(data);
      setTimeout(() => {
        setIsShowKerjakan(true);
        setDataSwipeUp(null);
      }, 100);
    }
  }, [lmsPRProjekTugasStore?.belumDikerjakanDatas]);

  useLayoutEffect(() => {
    if (type === TAB_NAMES.BELUM_DIKERJAKAN) {
      dispatch(
        fetchBelumDikerjakan({
          search: lmsPRProjekTugasStore.searchQuery,
          ...belumDikerjakanPagination,
          class_id: [],
          subject_id: mapelFilter,
          type: ['PR', 'Projek', 'Tugas'],
        }),
      );
    } else {
      dispatch(
        fetchRiwayat({
          search: lmsPRProjekTugasStore.searchQuery,
          ...riwayatPagination,
          class_id: [],
          subject_id: mapelFilter,
          type: ['PR', 'Projek', 'Tugas'],
          correction_type: penilaianFilter,
        }),
      );
    }
  }, [
    isFocused,
    lmsPRProjekTugasStore.searchQuery,
    mapelFilter,
    penilaianFilter,
    belumDikerjakanPagination,
    riwayatPagination,
  ]);

  useLayoutEffect(() => {
    dispatch(
      fetchGetLMSMateriSekolah((res: any) => {
        setMapels(res?.data?.data);
      }),
    );
  }, []);

  useLayoutEffect(() => {
    setBelumDikerjakanPagination(LIMIT_OFFSET);
    setRiwayatPagination(LIMIT_OFFSET);
  }, [mapelFilter, penilaianFilter, lmsPRProjekTugasStore.searchQuery]);

  const __onEndReachedBelumDikerjakan = () => {
    const {belumDikerjakanDatasNextPage, isLoadingDatas} =
      lmsPRProjekTugasStore;

    if (belumDikerjakanDatasNextPage && !isLoadingDatas) {
      setBelumDikerjakanPagination(prevState => ({
        ...prevState,
        offset:
          belumDikerjakanPagination.offset + belumDikerjakanPagination.limit,
      }));
    }
  };

  const __onEndReachedRiwayat = () => {
    const {riwayatDatasNextPage, isLoadingDatas} = lmsPRProjekTugasStore;

    if (riwayatDatasNextPage && !isLoadingDatas) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        offset: riwayatPagination.offset + riwayatPagination.limit,
      }));
    }
  };

  const startPrProjekTugas = async () => {
    try {
      const taskId =
        dataKerjakanSelected?.id ||
        dataKerjakanSelected?.id_relation ||
        dataKerjakanSelected?.id_relasi;
      let resCek: any;
      const resStart: AxiosResponse<IStartPRProjectTugasResponse> =
        await provider.startPrProjekTugas(taskId);
      if (dataKerjakanSelected.question_type !== 'Unggah File') {
        resCek = await provider.cekPrProjekTugas(taskId);
      }
      setIsShowKerjakan(false);

      const resData = resStart?.data?.data;
      navigation.navigate('MultipleQuestionTypeScreen', {
        task_id: taskId,
        media_id: resData?.task_teacher?.media_id,
        type: 'pr_projek_tugas',
        prProjekTugasType: resData?.task_teacher?.type,
        question_type:
          dataKerjakanSelected.question_type ||
          resData?.task_teacher?.question_type,
        title: resData?.task_teacher?.title,
        chapter: resData?.task_teacher?.chapter,
        subject: resData?.task_teacher?.subject,
        start_data: resCek?.data ?? new Date(),
      });
    } catch (e: any) {
      setIsShowKerjakan(false);
      Toast.show({
        type: 'error',
        text1: e?.response?.data?.message ?? `${e?.message} Terjadi Kesalahan`,
      });
    }
  };

  const __setDataFilter = useCallback(
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

  const __selectAllFilter = useCallback(() => {
    let data: any = [];
    mapels.map((item: any) => data.push(item?.id));
    setMapelTempFilter(data);
  }, [mapels]);

  const __renderFilterMapel = useCallback(
    () => (
      <>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {mapelFilter.length > 0 || penilaianFilter.length > 0 ? (
            <Pressable
              onPress={() => {
                setMapelFilter([]);
                setMapelTempFilter([]);
                setPenilaianFilter([]);
                setPenilaianTempFilter([]);
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32 / 2,
                backgroundColor: Colors.primary.light3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ResetIcon />
            </Pressable>
          ) : null}

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
              <View style={{padding: 10}}>
                <Text style={styles.swipeUpMapelItemTitle}>Filter</Text>

                <View style={styles.swipeUpMapelItemHeaderSwipe}>
                  <Text style={styles.swipeUpMapelItemText}>
                    Mata Pelajaran
                  </Text>

                  <Pressable onPress={__selectAllFilter}>
                    <Text style={styles.swipeUpMapelItemSubText}>
                      Pilih Semua
                    </Text>
                  </Pressable>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.swipeUpMapelItemContentSwipe,
                    !isShowMapelExpanded && {height: HEIGHT * 0.14},
                    {paddingBottom: 16},
                  ]}>
                  {mapels.map((item: any, id: number) => {
                    const active = mapelTempFilter.includes(item?.id);

                    return (
                      <Pressable
                        key={id}
                        onPress={() => __setDataFilter(item?.id)}
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
                              color: active
                                ? Colors.white
                                : Colors.primary.base,
                            },
                          ]}>
                          {item?.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

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
                        Tampilkan Semua
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
                    action={() => setMapelTempFilter([])}
                    style={{flex: 1}}
                    color={
                      mapelTempFilter?.length === 0
                        ? Colors.dark.neutral50
                        : Colors.primary.base
                    }
                    outline={false}
                    borderWidth={1}
                    borderColor={
                      mapelTempFilter?.length === 0
                        ? Colors.dark.neutral40
                        : Colors.primary.base
                    }
                    background="transparent"
                  />

                  <Button
                    label="Terapkan"
                    isDisabled={
                      !mapelTempFilter?.length && !mapelFilter?.length
                    }
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
      </>
    ),
    [isShowMapel, isShowMapelExpanded, mapelTempFilter, penilaianFilter],
  );

  const __renderFilterPenilaian = useCallback(
    () => (
      <>
        <ButtonFilter
          isDataExists={penilaianFilter.length > 0}
          onPress={() => setIsShowPenilaian(true)}
          title={
            penilaianFilter.length > 0
              ? penilaianFilter[0] === TFILTER_PENILAIAN.SUDAH_DINILAI.value
                ? TFILTER_PENILAIAN.SUDAH_DINILAI.title
                : TFILTER_PENILAIAN.BELUM_DINILAI.title
              : ('Semua Penilaian' as any)
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowPenilaian}
          onClose={() => setIsShowPenilaian(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.swipeUpMapelItemTitle}>Filter</Text>
              <Text style={styles.swipeUpMapelItemText}>Penilaian</Text>

              <View style={{marginTop: 16, flexDirection: 'row', gap: 8}}>
                {Object.values(TFILTER_PENILAIAN).map((_val, _key) => {
                  let active = penilaianTempFilter.includes(_val.value);

                  return (
                    <Pressable
                      key={_key}
                      onPress={() => setPenilaianTempFilter([_val.value])}
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
                        {_val?.title}
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
                  action={() => setPenilaianTempFilter([])}
                  style={{flex: 1}}
                  color={
                    penilaianTempFilter?.length === 0
                      ? Colors.dark.neutral50
                      : Colors.primary.base
                  }
                  outline={false}
                  borderWidth={1}
                  borderColor={
                    penilaianTempFilter?.length === 0
                      ? Colors.dark.neutral40
                      : Colors.primary.base
                  }
                  background="transparent"
                />

                <Button
                  label="Terapkan"
                  isDisabled={
                    !penilaianTempFilter?.length && !penilaianFilter?.length
                  }
                  action={() => {
                    setPenilaianFilter(penilaianTempFilter);
                    setIsShowPenilaian(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </>
    ),
    [isShowPenilaian, penilaianTempFilter],
  );

  // if (lmsPRProjekTugasStore.isLoadingDatas) {
  //   return <LoadingIndicator />;
  // }

  if (type === TAB_NAMES.BELUM_DIKERJAKAN) {
    return (
      <>
        {lmsPRProjekTugasStore.belumDikerjakanDatas?.length > 0 ? (
          <>
            {__renderFilterMapel()}

            <FlatList
              contentContainerStyle={{paddingHorizontal: 3, paddingBottom: 16}}
              showsVerticalScrollIndicator={false}
              data={lmsPRProjekTugasStore.belumDikerjakanDatas}
              keyExtractor={(_, _id): any => _id}
              onEndReached={__onEndReachedBelumDikerjakan}
              renderItem={({item}) => {
                return (
                  <CardListItem
                    category={item?.type}
                    mapel={item?.subject?.name}
                    title={item?.title}
                    givenDate={convertDate(item?.time_start)
                      .locale('id')
                      .format('ddd, D MMM YYYY • HH:mm')}
                    collectionDate={convertDate(item?.time_finish)
                      .locale('id')
                      .format('ddd, D MMM YYYY • HH:mm')}
                    buttonTitle="Kerjakan"
                    buttonOnPress={() => {
                      setDataKerjakanSelected(item);
                      setIsShowKerjakan(true);
                    }}
                    isShowButton={LMSPRTugasIsScheduled(item)}
                  />
                );
              }}
            />
          </>
        ) : lmsPRProjekTugasStore.searchQuery.trim().length > 0 ? (
          <MyTabContentItemNotFound
            isSearch={true}
            title="Pencarian Tidak Ditemukan"
            description={`Hasil pencarian "${lmsPRProjekTugasStore.searchQuery}" nihil.\nCoba masukkan kata kunci lainnya!`}
          />
        ) : mapelFilter.length > 0 ? (
          <>
            {__renderFilterMapel()}

            <MyTabContentItemNotFound
              isFilter={true}
              title="Hasil Filter Tidak Ditemukan"
              isShowButton={true}
              buttonTitle="Tampilkan Semua Hasil"
              buttonAction={() => {
                setMapelFilter([]);
                setMapelTempFilter([]);
              }}
            />
          </>
        ) : (
          <MyTabContentItemNotFound
            title="Belum Ada PR/Projek/Tugas"
            description={
              'Belum ada PR/Projek/Tugas yang perlu dikerjakan. Kamu bisa bersantai sejenak!'
            }
          />
        )}

        <SwipeUp
          isSwipeLine={true}
          visible={isShowKerjakan}
          onClose={() => setIsShowKerjakan(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.swipeUpKerjakanItemTextRegular,
                    {
                      color: Colors.dark.neutral60,
                      fontWeight: '600',
                      lineHeight: 18,
                    },
                  ]}>
                  {dataKerjakanSelected?.type}
                </Text>

                <Text
                  style={[
                    styles.swipeUpKerjakanItemTextSemiBold,
                    {
                      fontSize: 20,
                      lineHeight: 28,
                      letterSpacing: 1,
                    },
                  ]}>
                  {dataKerjakanSelected?.subject?.name ||
                    dataKerjakanSelected?.title}
                </Text>

                <Text
                  style={[
                    styles.swipeUpKerjakanItemTextRegular,
                    {
                      fontSize: 12,
                      lineHeight: 16,
                      color: Colors.dark.neutral60,
                      marginTop: 4,
                    },
                  ]}>
                  Diberikan:{' '}
                  {convertDate(dataKerjakanSelected?.time_start)
                    .locale('id')
                    .format('dddd, D MMM YYYY • HH:mm')}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 4,
                    marginTop: 4,
                  }}>
                  <Text
                    style={[
                      styles.swipeUpKerjakanItemTextRegular,
                      {
                        lineHeight: 18,
                        color: Colors.primary.base,
                      },
                    ]}>
                    Dikumpulkan:
                  </Text>

                  <IconCalendar />

                  <Text
                    style={[
                      styles.swipeUpKerjakanItemTextRegular,
                      {
                        lineHeight: 18,
                        color: Colors.primary.base,
                      },
                    ]}>
                    {convertDate(
                      dataKerjakanSelected?.time_finish ||
                        dataKerjakanSelected?.time_end,
                    )
                      .locale('id')
                      .format('ddd, D MMM HH:mm')}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.swipeUpKerjakanItemTextSemiBold,
                  {lineHeight: 22, marginTop: 24},
                ]}>
                Cara Pengerjaan:
              </Text>

              {[
                'Semua soal wajib dijawab.',
                'Untuk melihat jawaban, selesaikan tes dalam jangka waktu yang telah diberikan atau klik selesai.',
                'Untuk menjawab pertanyaan, berilah penjelasan yang tepat.',
              ].map((val, id) => (
                <View key={id} style={{flexDirection: 'row', gap: 8}}>
                  <Text style={styles.swipeUpKerjakanItemTextRegular}>
                    {'\u2022'}
                  </Text>

                  <Text style={styles.swipeUpKerjakanItemTextRegular}>
                    {val}
                  </Text>
                </View>
              ))}

              <View
                style={{
                  marginTop: 24,
                  flexDirection: 'row',
                  gap: 8,
                }}>
                <IconInfo />

                <Text
                  style={[
                    styles.swipeUpKerjakanItemTextRegular,
                    {lineHeight: 22},
                  ]}>
                  {
                    'Jawaban yang sudah kamu masukkan\nakan otomatis tersimpan. Kamu dapat\nkeluar dan melanjutkan PR/Projek/Tugas kapanpun.'
                  }
                </Text>
              </View>

              <Button top={16} label="Kerjakan" action={startPrProjekTugas} />
            </View>
          }
        />
      </>
    );
  } else {
    return (
      <>
        {lmsPRProjekTugasStore.riwayatDatas?.length > 0 ? (
          <>
            <View style={{flexDirection: 'row'}}>
              {__renderFilterMapel()}
              {__renderFilterPenilaian()}
            </View>

            <FlatList<IPRTugasData>
              contentContainerStyle={{paddingHorizontal: 3, paddingBottom: 16}}
              showsVerticalScrollIndicator={false}
              data={lmsPRProjekTugasStore.riwayatDatas}
              keyExtractor={(data, _id): any => data?.id || _id}
              onEndReached={__onEndReachedRiwayat}
              renderItem={({item}) => (
                <CardListItem
                  item={item}
                  category={item?.type || ''}
                  mapel={item?.subject?.name || ''}
                  title={item?.title || ''}
                  isShowButton
                  grade={item?.student_value}
                  givenDate={convertDate(item?.time_start)
                    .locale('id')
                    .format('ddd, D MMM YYYY • HH:mm')}
                  collectionDate={convertDate(item?.time_finish)
                    .locale('id')
                    .format('ddd, D MMM YYYY • HH:mm')}
                  type="RIWAYAT"
                  buttonTitle="Detail"
                  buttonOnPress={() => {
                    if (!item?.id) {
                      return;
                    }
                    dispatch(fetchGetRecordTaskDetailHistory(item?.id)).then(
                      () => {
                        // change with actual id soon
                        setIsShowDetailRiwayat(true);
                      },
                    );
                  }}
                />
              )}
            />
            <SwipeUp
              isSwipeLine={true}
              visible={isShowDetailRiwayat}
              onClose={() => {
                setIsShowDetailRiwayat(false);
              }}
              height={500}
              children={
                <ChildrenSwipeUp
                  onClose={() => {
                    setIsShowDetailRiwayat(false);
                  }}
                />
              }
            />
          </>
        ) : lmsPRProjekTugasStore.searchQuery.trim().length > 0 ? (
          <MyTabContentItemNotFound
            isSearch={true}
            title="Pencarian Tidak Ditemukan"
            description={`Hasil pencarian "${lmsPRProjekTugasStore.searchQuery}" nihil.\nCoba masukkan kata kunci lainnya!`}
          />
        ) : mapelFilter.length > 0 ? (
          <>
            <View style={{flexDirection: 'row'}}>
              {__renderFilterMapel()}
              {__renderFilterPenilaian()}
            </View>

            <MyTabContentItemNotFound
              isFilter={true}
              title="Hasil Filter Tidak Ditemukan"
              isShowButton={true}
              buttonTitle="Tampilkan Semua Hasil"
              buttonAction={() => {
                setMapelFilter([]);
                setMapelTempFilter([]);
                setPenilaianFilter([]);
                setPenilaianTempFilter([]);
              }}
            />
          </>
        ) : (
          <MyTabContentItemNotFound
            title="Belum Ada PR/Projek/Tugas Selesai"
            description={'Belum ada PR/Projek/Tugas yang\ndiselesaikan.'}
          />
        )}
      </>
    );
  }
};

const MyTabContentItemNotFound: FC<{
  isSearch?: boolean;
  isFilter?: boolean;
  title: string;
  description?: string;
  isShowButton?: boolean;
  buttonTitle?: string;
  buttonAction?: () => void;
}> = ({
  isSearch,
  isFilter,
  title,
  description,
  isShowButton,
  buttonTitle,
  buttonAction,
}) => {
  // const dispatch = useDispatch();
  // const [isShowPRProjekTugas, setIsShowPRProjekTugas] = useState(false);

  return (
    <View style={styles.containerTabContentItemNotFound}>
      {!isSearch ? (
        <ICEmptyPRImage style={{marginBottom: 6}} />
      ) : isFilter ? (
        <RobotSedihImage style={{marginBottom: 6}} />
      ) : (
        <RobotEmptySearchImage style={{marginBottom: 6}} />
      )}

      <Text style={styles.containerTabContentItemNotFoundTitle}>{title}</Text>

      {description ? (
        <Text style={styles.containerTabContentItemNotFoundDescription}>
          {description}
        </Text>
      ) : null}

      {isShowButton && buttonTitle && buttonAction ? (
        <Button
          label={buttonTitle}
          action={buttonAction}
          top={12}
          style={{paddingHorizontal: 16}}
        />
      ) : null}
    </View>
  );
};

const Search: FC<{
  query: string;
  handleSearch: () => void;
  setQuery: (_value: string) => void;
  setModalVisible: (_value: boolean) => void;
}> = ({query, handleSearch, setQuery, setModalVisible}) => {
  return (
    <View style={styles.containerSearch}>
      <View style={{flex: 3}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={query}
          onSubmitEditing={handleSearch}
          maxLength={60}
          onChangeText={text => setQuery(text)}
          leftIcon={SearchIcon}
          rightIcon={query && ResetIcon}
          onPressIcon={() => setQuery('')}
          placeholder="Cari judul, pelajaran"
        />
      </View>

      <Pressable
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => {
          setQuery('');
          setModalVisible(false);
        }}>
        <Text style={styles.containerSearchCancelLabel}>Batal</Text>
      </Pressable>
    </View>
  );
};

const LMSPRTugasScreen: FC = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSPRTugasScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'LMSPRTugasScreen'>>();
  const [isSearch, setIsSearch] = useState(false);
  const [value, setValue] = useState<string>('');
  const searchVal = useDebounce(value);

  useLayoutEffect(() => {
    navigation.setOptions({
      statusBarTranslucent: false,
      statusBarColor: Colors.white,
      statusBarStyle: 'inverted',
    } as any);
    return () => {
      rdxDispatch(getRiwayatDestroy());
    };
  }, []);

  useLayoutEffect(() => {
    dispatch(setGetSearch(searchVal));
  }, [searchVal]);

  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => {
      return (
        <Text
          style={[
            styles.containerTabBarLabel,
            focused && {color: Colors.primary.base},
          ]}>
          {children}
        </Text>
      );
    },
    [],
  );

  const __handleSearchQuery = (_value: string) => setValue(_value);

  return (
    <View style={styles.container}>
      {!isSearch ? (
        <Header
          label="PR, Projek & Tugas"
          iconRight={<SearchIcon />}
          onPressIconRight={() => setIsSearch(!isSearch)}
        />
      ) : (
        <Search
          query={value}
          setQuery={__handleSearchQuery}
          setModalVisible={setIsSearch}
          handleSearch={() => {
            // if (value.trim().length > 0) {
            //   setIsSearch(!isSearch);
            // }
            Keyboard.dismiss();
          }}
        />
      )}

      <Tab.Navigator
        backBehavior="none"
        sceneContainerStyle={styles.containerTab}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.dark.neutral20,
          },
          tabBarIndicatorStyle: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            height: 4,
            backgroundColor: Colors.primary.base,
          },
        }}>
        {Object.values(TAB_NAMES).map(_val => (
          <Tab.Screen
            key={_val}
            name={_val}
            component={MyTabContent}
            initialParams={route?.params?.data}
            options={{
              tabBarLabel: __renderMyTabBarlabel,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export {LMSPRTugasScreen};
