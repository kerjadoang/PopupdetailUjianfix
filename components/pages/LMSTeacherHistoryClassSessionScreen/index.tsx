/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Header} from '@components/atoms/Header';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import SearchInput from './components/SearchInput';
import useDebounce from '@hooks/useDebounce';
import {Button, CapsuleButtonFilterProps, DatePicker} from '@components/atoms';
import FilterSwipeUp from './components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {
  _handlerCapitalizeFirstLetter,
  _handlerConvertDatePicker,
  formatDate,
  useMergeState,
} from '@constants/functional';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import {Maskot11} from '@assets/images';
import {
  ILMSTeacherClassSessionFilter,
  IRombelData,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {useGetClassSession} from '@services/lms';
import {styles} from './style';
import Colors from '@constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {FlatList} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

const label = {
  google_meet: 'Google Meet',
  zoom: 'Zoom',
  live: 'Langsung',
  record: 'Rekaman',
};

const LMSTeacherHistoryClassSessionScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherHistoryClassSessionScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'LMSTeacherHistoryClassSessionScreen'>>();
  const flatListRef: any = useRef();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [initFilter, setInitFilter] = useState<{
    rombel_data: IRombelData[] | [];
    subject: IBaseSubject[] | [];
  }>({
    rombel_data: [],
    subject: [],
  });
  // selected filter in swipe up
  const [filter, setFilter] = useState<LMSTeacherClassSessionFilter>({
    rombel_data: [],
    subject: [],
    type: [],
    platform: [],
    date: [],
    dateStart: '',
    dateEnd: '',
    page: 1,
    limit: 15,
  });
  // selected filter after submitted in swipe up
  const [filterSubmitted, setFilterSubmitted] =
    useState<LMSTeacherClassSessionFilter>({
      rombel_data: [],
      subject: [],
      type: [],
      platform: [],
      date: [],
      dateStart: '',
      dateEnd: '',
      page: 1,
      limit: 15,
    });
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: keyof LMSTeacherClassSessionFilter | '';
  }>({status: false, type: ''});
  const [dateFilter, setDateFilter] = useMergeState({
    isShowSwipeUpDateFilter: false,
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
  });
  const {
    isShowSwipeUpDate,
    datePickerType,
    datePickerFrom,
    datePickerUntil,
  }: any = dateFilter;
  const {data: userData}: any = useSelector(
    (state: RootState) => state?.getUser,
  );
  const query = useDebounce(searchQuery);
  const params: ILMSTeacherClassSessionFilter = useMemo(() => {
    if (route?.params?.teacherData) {
      return {
        status: 'finish,canceled',
        teacherId: route?.params?.teacherData?.id,
        page: filterSubmitted?.page,
        limit: filterSubmitted?.limit,
        rombel_class_school_id: filterSubmitted?.rombel_data
          .map(item => item.rombel_class_school_id)
          .join(','),
        subject: filterSubmitted?.subject.map(item => item?.id).join(','),
        type: filterSubmitted?.type.join(','),
        platform: filterSubmitted?.platform.join(','),
        startDate:
          filterSubmitted?.dateStart ||
          dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: filterSubmitted?.dateEnd || dayjs().format('YYYY-MM-DD'),
        search: query,
      };
    } else {
      return {
        status: 'finish,canceled',
        page: filterSubmitted?.page,
        limit: filterSubmitted?.limit,
        rombel_class_school_id: filterSubmitted?.rombel_data
          .map(item => item.rombel_class_school_id)
          .join(','),
        subject: filterSubmitted?.subject.map(item => item?.id).join(','),
        type: filterSubmitted?.type.join(','),
        platform: filterSubmitted?.platform.join(','),
        startDate: filterSubmitted?.dateStart,
        endDate: filterSubmitted?.dateEnd,
        search: query,
      };
    }
  }, [filterSubmitted, query]);

  const {data: sessionData, nextPage, refetch} = useGetClassSession(params);

  const parseLabelDateFilter = (date: string) => {
    switch (date) {
      case 'today':
        return 'Hari ini';
      case 'lastSevenDays':
        return '7 hari terakhir';
      case 'lastThirtyDays':
        return '30 hari terakhir';
      case 'chooseDate':
        return `${_handlerConvertDatePicker(
          datePickerFrom,
        )} - ${_handlerConvertDatePicker(datePickerUntil)}`;
      default:
        break;
    }
  };

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: '7 hari terakhir',
        isSelected: filterSubmitted?.date?.length > 0,
        value: parseLabelDateFilter(filterSubmitted?.date),
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'date',
          }));
        },
      },
      {
        title: 'Semua kelas',
        isSelected: filterSubmitted?.rombel_data?.length > 0,
        value:
          filter.rombel_data?.length === 0
            ? undefined
            : filterSubmitted?.rombel_data?.length < 2 &&
              filterSubmitted?.rombel_data?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted?.rombel_data
                  .map(item => item.rombel_class_school_name)
                  .join(''),
              )
            : `${filterSubmitted?.rombel_data?.length} Kelas`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'rombel_data',
          }));
        },
      },
      {
        title: 'Semua mapel',
        isSelected: filterSubmitted?.subject?.length > 0,
        value:
          filter.subject?.length === 0
            ? undefined
            : filterSubmitted?.subject?.length < 2 &&
              filterSubmitted?.subject?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted?.subject.map(item => item.name).join(''),
              )
            : `${filterSubmitted?.subject?.length} Mapel`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'subject',
          }));
        },
      },
      {
        title: 'Semua tipe kelas',
        isSelected: filterSubmitted?.type?.length > 0,
        value:
          filter.type?.length === 0
            ? undefined
            : filterSubmitted?.type?.length < 2 &&
              filterSubmitted?.type?.length > 0
            ? _handlerCapitalizeFirstLetter(
                label[
                  filterSubmitted?.type
                    .map(item => item)
                    .join('') as keyof typeof label
                ],
              )
            : `${filterSubmitted?.type?.length} Tipe kelas`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'type',
          }));
        },
      },
      {
        title: 'Semua platform',
        isSelected: filterSubmitted?.platform?.length > 0,
        value:
          filter.platform?.length === 0
            ? undefined
            : filterSubmitted?.platform?.length < 2 &&
              filterSubmitted?.platform?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted?.platform
                  .map(item => item)
                  .join('')
                  .replace('_', ' '),
              )
            : `${filterSubmitted?.platform?.length} Platform`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'platform',
          }));
        },
      },
    ],
    [filterSubmitted],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Riwayat Sesi Kelas" />,
    });
    const getInitFilter = async () => {
      let res = await Promise.all([
        globalProvider.getAllRombel(),
        globalProvider.getAllSubject(),
      ]);
      setInitFilter({
        rombel_data: res[0].data?.data ?? [],
        subject: res[1].data?.data ?? [],
      });
    };
    getInitFilter();
  }, []);

  useEffect(() => {
    refetch();
  }, [filterSubmitted, query]);

  useEffect(() => {
    setFilterSubmitted(prevState => ({...prevState, page: 1, limit: 15}));
  }, [query]);

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const onClearSearch = () => {
    setSearchQuery('');
    setFilterSubmitted(prevState => ({...prevState, page: 1, limit: 15}));
  };

  const onShowFilterSwipeUp = (
    status: boolean,
    type: keyof typeof filter | '',
  ) => {
    setShowFilterSwipeUp(prevState => ({...prevState, status, type}));
  };

  const onSubmitFilter = () => {
    setShowFilterSwipeUp(prevState => ({...prevState, status: false}));
    setFilterSubmitted(prevState => ({
      ...prevState,
      ...filter,
      page: 1,
      limit: 15,
    }));
  };
  const onEndReach = () => {
    if (nextPage) {
      setFilterSubmitted(prevState => ({
        ...prevState,
        page: filterSubmitted?.page! + 1,
      }));
    }
  };
  const onChangeFilter = (data: IRombelData | IBaseSubject | string) => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'date':
        const dataDate = data as string;
        const dateIsExist = filterData.date.includes(dataDate as never);
        if (dateIsExist) {
          filterData.date = '';
          filterData.dateStart = '';
          filterData.dateEnd = '';
        } else {
          filterData.date = dataDate;
          switch (dataDate) {
            case 'today':
              filterData.dateStart = dayjs().format('YYYY-MM-DD');
              filterData.dateEnd = dayjs().format('YYYY-MM-DD');
              break;
            case 'lastSevenDays':
              filterData.dateStart = dayjs()
                .subtract(7, 'days')
                .format('YYYY-MM-DD');
              filterData.dateEnd = dayjs().format('YYYY-MM-DD');
              break;
            case 'lastThirtyDays':
              filterData.dateStart = dayjs()
                .subtract(30, 'days')
                .format('YYYY-MM-DD');
              filterData.dateEnd = dayjs().format('YYYY-MM-DD');
              break;
            case 'chooseDate':
              filterData.dateStart = dayjs(datePickerFrom)
                .subtract(1, 'month')
                .format('YYYY-MM-DD');
              filterData.dateEnd = dayjs(datePickerUntil)
                .subtract(1, 'month')
                .format('YYYY-MM-DD');
              break;
            default:
              filterData.dateStart = '';
              filterData.dateEnd = '';
              break;
          }
        }
        break;

      case 'rombel_data':
        const dataRombel = data as IRombelData;
        const dataIsExist = filterData.rombel_data.some(
          rombel =>
            rombel.rombel_class_school_id === dataRombel.rombel_class_school_id,
        );
        if (dataIsExist) {
          filterData.rombel_data = filterData.rombel_data.filter(
            item =>
              item.rombel_class_school_id !== dataRombel.rombel_class_school_id,
          );
        } else {
          filterData.rombel_data = [...filter.rombel_data, dataRombel];
        }
        break;

      case 'subject':
        const dataSubject = data as IBaseSubject;
        const subjectIsExist = filterData.subject.some(
          rombel => rombel.id === dataSubject.id,
        );
        if (subjectIsExist) {
          filterData.subject = filterData.subject.filter(
            item => item.id !== dataSubject.id,
          );
        } else {
          filterData.subject = [...filter.subject, dataSubject];
        }
        break;

      case 'platform':
        const dataPlatform = data as string;
        const platformIsExist = filterData.platform.includes(
          dataPlatform as never,
        );
        if (platformIsExist) {
          filterData.platform = filterData.platform.filter(
            item => item !== dataPlatform,
          );
        } else {
          filterData.platform = [...filterData.platform, dataPlatform];
        }
        break;

      case 'type':
        const dataType = data as string;
        const typeIsExist = filterData.type.includes(dataType as never);
        if (typeIsExist) {
          filterData.type = filterData.type.filter(item => item !== dataType);
        } else {
          filterData.type = [...filterData.type, dataType];
        }
        break;

      default:
        break;
    }
    setFilter(filterData);
  };

  const onRemoveFilter = () => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'date':
        filterData.date = [];
        break;
      case 'rombel_data':
        filterData.rombel_data = [];
        break;
      case 'subject':
        filterData.subject = [];
        break;
      case 'platform':
        filterData.platform = [];
        break;
      case 'type':
        filterData.type = [];
        break;
      default:
        break;
    }
    setFilter(filterData);
  };

  const onSelectAllFilter = () => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'rombel_data':
        filterData.rombel_data = initFilter.rombel_data;
        break;
      case 'subject':
        filterData.subject = initFilter.subject;
        break;
      case 'platform':
        filterData.platform = ['google_meet', 'zoom'];
        break;
      case 'type':
        filterData.type = ['live', 'record'];
        break;
      default:
        break;
    }
    setFilter(filterData);
  };

  const _handlerOnPressSwipeUpFromButton = () => {
    // setShowFilterSwipeUp({status: false, type: ''});
    setDateFilter({isShowSwipeUpDate: !isShowSwipeUpDate});
    setDateFilter({datePickerType: 'from'});
  };

  const _handlerOnPressSwipeUpUntilButton = () => {
    setDateFilter({isShowSwipeUpDate: !isShowSwipeUpDate});
    setDateFilter({datePickerType: 'until'});
  };

  const _handlerOnPressSwipeUpDateSelectButton = () => {
    if (datePickerType == 'from') {
      setDateFilter({datePickerFrom: valueDatePicker});
    } else if (datePickerType == 'until') {
      setDateFilter({datePickerUntil: valueDatePicker});
    }
    setDateFilter({isShowSwipeUpDate: !isShowSwipeUpDate});
  };

  const _renderSwipeUpDateContent = () => {
    return (
      <View style={styles.swipeUpDateWrapper}>
        <Text style={styles.swipeUpDateHeaderTitle}>{'Pilih Tanggal'}</Text>

        <DatePicker selected={valueDatePicker} onChange={setValueDatePicker} />

        <View style={styles.swipeUpDateButtonWrapper}>
          <Button
            style={styles.swipeUpButtonConfirm}
            label={'Pilih'}
            action={_handlerOnPressSwipeUpDateSelectButton}
          />
        </View>
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Maskot11} style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>
          {'Belum Ada Sesi Kelas Dijadwalkan'}
        </Text>
        <Text style={styles.noDataDescription}>
          {'Sesi kelas yang dijadwalkan akan\ntampil disini.'}
        </Text>
        <Button
          style={{paddingHorizontal: 16}}
          label={'+ Buat Sesi Kelas'}
          action={() => {
            navigation?.navigate('LMSTeacherFormClassSessionScreen', {});
          }}
        />
      </View>
    );
  };

  const _renderContent = (item: any) => {
    const {
      id,
      title,
      time_start,
      time_end,
      platform,
      type,
      status,
      rombel_class,
      subject,
      total_join,
      total_not_join,
    } = item;
    const typeName = type == 'live' ? 'Langsung' : 'Rekaman';
    const isFinished = status == 'finish';
    const isCanceled = status == 'canceled';
    const platformTitle =
      platform == 'zoom'
        ? 'Zoom'
        : platform == 'google_meet'
        ? 'Google Meet'
        : '';
    const date = formatDate(time_start, time_end);

    return (
      <TouchableOpacity
        onPress={() => {
          if (status === 'canceled') {
            return navigation.navigate('LMSTeacherDetailClassSessionScreen', {
              id,
            });
          }
          navigation.navigate('LMSTeacherDetailClassSessionScreen', {
            id: id,
            navigate_from: 'LMSTeacherHistoryClassSessionScreen',
          });
        }}
        style={styles.dataCard}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{rombel_class?.name}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{typeName}</Text>
          </View>

          {platformTitle?.length == 0 ? null : (
            <View style={styles.badge}>
              <Text style={styles.titleBadge}>{platformTitle}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle}>{subject?.name}</Text>
        <Text style={styles.cardSubtitle}>{title}</Text>
        <Text style={styles.cardDateTitle}>{date}</Text>
        <View style={styles.lineGrey} />

        {isFinished ? (
          <View style={styles.cardCountDownContainer}>
            <View style={styles.onGoingContainer}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dark.neutral60,
                }}>
                {total_join} dari {total_join + total_not_join} murid hadir
              </Text>
            </View>
            {type === 'live' && userData?.user_type_id !== 4 ? (
              <Button
                style={styles.cardCountDownButton2}
                label={'Nilai Murid'}
                action={() => {
                  navigation.navigate('LMSTeacherDetailClassSessionScreen', {
                    id: id,
                    navigate_from: 'LMSTeacherHistoryClassSessionScreen',
                  });
                }}
              />
            ) : null}
          </View>
        ) : isCanceled ? (
          <View style={styles.cardCountDownContainer}>
            <View style={styles.onGoingContainer}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dark.neutral60,
                }}>
                Dibatalkan
              </Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <SearchInput
          onClear={onClearSearch}
          query={searchQuery}
          setQuery={setSearchQuery}
        />
        <View>
          <FlatList
            renderItem={renderItem}
            data={capsuleButtonFilterData}
            style={{paddingVertical: 16}}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8, paddingHorizontal: 16}}
          />
        </View>
        <View style={styles.container}>
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              ref={flatListRef}
              data={sessionData?.data}
              ListEmptyComponent={_renderNoData()}
              onEndReachedThreshold={0.25}
              onEndReached={onEndReach}
              keyExtractor={(_, idx): any => idx}
              renderItem={({item}) => _renderContent(item)}
            />
            {/* di figma gak ada tapi disimpan dulu untuk backup */}
            {/* <>
              <View style={styles.lineGrey} />
              {userData?.user_type_id !== 4 ? (
                <View style={styles.buttonContainer}>
                  <Button
                    label={'+ Buat Sesi Kelas'}
                    action={() => {
                      navigation?.navigate(
                        'LMSTeacherFormClassSessionScreen',
                        {},
                      );
                    }}
                  />
                </View>
              ) : null}
            </> */}
          </>
        </View>
      </View>
      <FilterSwipeUp
        onChangeFilter={onChangeFilter}
        onRemoveFilter={onRemoveFilter}
        height={100}
        visible={showFilterSwipeUp.status}
        type={showFilterSwipeUp.type}
        onClose={() => {
          setFilter(prevState => ({...prevState, ...filterSubmitted}));
          onShowFilterSwipeUp(false, '');
        }}
        rombelAndSubject={initFilter}
        onSubmitFilter={onSubmitFilter}
        onSelectAll={onSelectAllFilter}
        filter={filter}
        isChooseDate={filter?.date === 'chooseDate'}
        isShowSwipeUpDate={isShowSwipeUpDate}
        onCloseSwipeUpDate={() =>
          setDateFilter({isShowSwipeUpDate: !isShowSwipeUpDate})
        }
        swipeUpDateChildren={_renderSwipeUpDateContent()}
        onPressChooseStartDate={_handlerOnPressSwipeUpFromButton}
        onPressChooseEndDate={_handlerOnPressSwipeUpUntilButton}
        datePickerFrom={
          datePickerFrom ? _handlerConvertDatePicker(datePickerFrom) : ''
        }
        datePickerUntil={
          datePickerUntil ? _handlerConvertDatePicker(datePickerUntil) : ''
        }
      />
      {/* {getTeacherClassSession?.loadingList ? <LoadingIndicator /> : null} */}
    </>
  );
};

export default LMSTeacherHistoryClassSessionScreen;
