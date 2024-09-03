/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import HistoryIcon from '@assets/svg/ic24_history_blue.svg';
import SearchInput from './components/SearchInput';
import useDebounce from '@hooks/useDebounce';
import {Button, CapsuleButtonFilterProps, Countdown} from '@components/atoms';
import FilterSwipeUp from './components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {_handlerCapitalizeFirstLetter, formatDate} from '@constants/functional';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import {styles} from './style';
import {Maskot11} from '@assets/images';
import {
  ILMSTeacherClassSessionFilter,
  IRombelData,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {useGetClassSession} from '@services/lms';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {fetchStartMeeting, fetchTeacherJoinMeeting} from '@redux';
import RobotEmptySearch from '@assets/svg/robot_empty_search.svg';
import RobotEmptyFilter from '@assets/svg/robot_sedih.svg';
import {FlatList} from 'react-native-gesture-handler';

const label = {
  google_meet: 'Google Meet',
  zoom: 'Zoom',
  live: 'Langsung',
  record: 'Rekaman',
};

const LMSTeacherClassSessionScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherClassSessionScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'LMSTeacherClassSessionScreen'>>();
  const dispatch = useDispatch();
  const {data: userData}: any = useSelector(
    (state: RootState) => state?.getUser,
  );
  const teacher = route?.params?.teacher || false;
  const flatListRef: any = useRef();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [initFilter, setInitFilter] = useState<{
    rombel_data: IRombelData[] | [];
    subject: IBaseSubject[] | [];
  }>({
    rombel_data: [],
    subject: [],
  });
  // selected filter in swipe up
  const [filter, setFilter] = useState<
    Omit<LMSTeacherClassSessionFilter, 'chapter'>
  >({
    rombel_data: [],
    subject: [],
    type: [],
    platform: [],
    page: 1,
    limit: 15,
  });
  // selected filter after submitted in swipe up
  const [filterSubmitted, setFilterSubmitted] = useState<
    Omit<LMSTeacherClassSessionFilter, 'chapter'>
  >({
    rombel_data: [],
    subject: [],
    type: [],
    platform: [],
    page: 1,
    limit: 15,
  });
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: keyof LMSTeacherClassSessionFilter | '';
  }>({status: false, type: ''});
  const query = useDebounce(searchQuery);
  const params: ILMSTeacherClassSessionFilter = useMemo(() => {
    return {
      status: 'on_going,unstarted',
      page: filterSubmitted.page,
      limit: filterSubmitted.limit,
      rombel_class_school_id: filterSubmitted.rombel_data
        .map(item => item.rombel_class_school_id)
        .join(','),
      subject: filterSubmitted.subject.map(item => item.id).join(','),
      type: filterSubmitted.type.join(','),
      platform: filterSubmitted.platform.join(','),
      search: query,
      teacherId: teacher?.id ?? '',
    };
  }, [filterSubmitted, query]);

  const {
    data: sessionData,
    nextPage,
    refetch,
  }: any = useGetClassSession(params);

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: 'Semua kelas',
        isSelected: filterSubmitted.rombel_data.length > 0,
        value:
          filter.rombel_data?.length === 0
            ? undefined
            : filterSubmitted.rombel_data?.length < 2 &&
              filterSubmitted.rombel_data?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.rombel_data
                  .map(item => item.rombel_class_school_name)
                  .join(''),
              )
            : `${filterSubmitted.rombel_data?.length} Kelas`,
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
          filter?.subject?.length === 0
            ? undefined
            : filterSubmitted?.subject?.length < 2 &&
              filterSubmitted?.subject?.length > 0
            ? _handlerCapitalizeFirstLetter(
                label[
                  filterSubmitted?.subject
                    .map(item => item?.name)
                    .join('') as keyof typeof label
                ],
              )
            : `${filterSubmitted?.subject?.length} Mapel`,
        disabledWithoutColor:
          filterSubmitted?.rombel_data?.length === 0 ? true : false,
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
        isSelected: filterSubmitted.type.length > 0,
        value:
          filter.type?.length === 0
            ? undefined
            : filterSubmitted.type?.length < 2 &&
              filterSubmitted.type?.length > 0
            ? _handlerCapitalizeFirstLetter(
                label[
                  filterSubmitted.type
                    .map(item => item)
                    .join('') as keyof typeof label
                ],
              )
            : `${filterSubmitted.type?.length} Tipe kelas`,
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
        isSelected: filterSubmitted.platform.length > 0,
        value:
          filter.platform?.length === 0
            ? undefined
            : filterSubmitted.platform?.length < 2 &&
              filterSubmitted.platform?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.platform.map(item => item).join(''),
              )
            : `${filterSubmitted.platform?.length} Platform`,
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
      header: () => (
        <Header
          label={teacher ? 'Jadwal Sesi Kelas' : 'Sesi Kelas'}
          subLabel={teacher?.full_name ? teacher?.full_name : null}
          iconRight={<HistoryIcon />}
          onPressIconRight={() => {
            navigation.navigate('LMSTeacherHistoryClassSessionScreen', {
              teacherData: teacher,
            });
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const getInitFilter = async () => {
      //class_id from filter class
      const classId = filterSubmitted?.rombel_data?.map(
        (obj: any) => obj?.class_id,
      );
      const paramsClass = {
        classId: classId ? classId?.toString() : '',
      };
      const resRombel = await globalProvider.getAllRombel();
      if (filterSubmitted?.rombel_data?.length !== 0) {
        const resClass = await globalProvider.getAllSubjectByClass(paramsClass);

        setInitFilter({
          rombel_data: resRombel?.data?.data ?? [],
          subject: resClass?.data?.data,
        });
      } else {
        setInitFilter({
          rombel_data: resRombel?.data?.data ?? [],
          subject: [],
        });
      }
    };
    getInitFilter();
  }, [filterSubmitted?.rombel_data]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, params]);

  useEffect(() => {
    setFilterSubmitted(prevState => ({...prevState, page: 1, limit: 15}));
  }, [query]);

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

    if (Object.keys(filter).length > 0 && sessionData?.data?.length > 0) {
      flatListRef?.current?.scrollToIndex?.({index: 0, animated: false});
    }
  };

  const onEndReach = () => {
    if (
      nextPage &&
      sessionData?.data?.length >= Number(filterSubmitted?.limit)
    ) {
      setFilterSubmitted(prevState => ({
        ...prevState,
        page: filterSubmitted.page! + 1,
      }));
    }
  };

  const onChangeFilter = (data: IRombelData | IBaseSubject | string) => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
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

  const onStartMeeting = (item: any) => {
    dispatch(
      fetchStartMeeting(
        {
          class_session_id: item?.id,
          subject_id: item?.subject?.id,
          subject: item?.subject?.name,
          rombel_class_id: item?.rombel_class_id,
          rombel_class: item?.rombel_class?.name,
          platform: item?.platform,
        },
        () => {
          if (item?.platform === 'google_meet') {
            if (item?.google_meet?.start_url !== '') {
              const meetUrl = item?.google_meet?.start_url;
              Linking.openURL(meetUrl)
                .then(() => {
                  navigation.goBack();
                })
                .catch(() => {});
            } else {
              Toast?.show({
                type: 'error',
                text1: 'Gagal masuk google meet',
              });
            }
          } else if (item?.platform === 'zoom') {
            navigation.navigate('LMSTeacherMeetingLiveSessionScreen');
          } else if (item?.platform === 'record') {
            navigation.navigate('LMSTeacherDetailClassSessionScreen', {
              id: item?.id,
            });
          }
        },
      ),
    );
  };

  const onJoinMeeting = (item: any) => {
    if (item?.platform === 'google_meet') {
      if (item?.google_meet?.start_url !== '') {
        const meetUrl = item?.google_meet?.start_url;
        dispatch(
          fetchTeacherJoinMeeting(item?.id, () => {
            Linking.openURL(meetUrl)
              .then(() => {
                navigation.goBack();
              })
              .catch(() => {});
          }),
        );
      } else {
        Toast?.show({
          type: 'error',
          text1: 'Gagal masuk google meet',
        });
      }
    } else if (item?.platform === 'zoom') {
      dispatch(
        fetchTeacherJoinMeeting(item?.id, () =>
          navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
        ),
      );
    } else if (item?.platform === 'record') {
      navigation.navigate('LMSTeacherDetailClassSessionScreen', {id: item?.id});
    }
  };

  const renderItem = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const _renderNoData = () => {
    const isEmptyDataAfterFilter =
      filterSubmitted?.platform?.length !== 0 ||
      filterSubmitted?.rombel_data.length !== 0 ||
      filterSubmitted?.subject?.length !== 0 ||
      filterSubmitted?.type?.length !== 0;
    if (query !== '') {
      //if user fill the search box and got empty data
      return (
        <View style={styles.noDataContainer}>
          <RobotEmptySearch
            style={styles.noDataIcon}
            width={100}
            height={100}
          />
          <Text style={styles.noDataTitle}>{'Pencarian Tidak Ditemukan'}</Text>
          <Text style={styles.noDataDescription}>
            {`Hasil pencarian ”${query}” nihil.\n Coba masukkan kata kunci lainnya!`}
          </Text>
        </View>
      );
    } else if (isEmptyDataAfterFilter) {
      return (
        <View style={styles.noDataContainer}>
          <RobotEmptyFilter
            style={styles.noDataIcon}
            width={100}
            height={100}
          />
          <Text style={styles.noDataTitle}>
            {'Hasil filter tidak ditemukan'}
          </Text>
          <Text style={styles.noDataDescription}>
            {`Coba atur ulang filter yang
sudah Anda atur sebelumnya`}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.noDataContainer}>
          <Image source={Maskot11} style={styles.noDataIcon} />
          <Text style={styles.noDataTitle}>
            {'Belum Ada Sesi Kelas Dijadwalkan'}
          </Text>
          <Text style={styles.noDataDescription}>
            {'Sesi kelas yang dijadwalkan akan\ntampil disini.'}
          </Text>
          {userData?.user_type_id !== 4 ? (
            <Button
              style={styles.ph16}
              label={'+ Buat Sesi Kelas'}
              action={() => {
                navigation?.navigate('LMSTeacherFormClassSessionScreen', {
                  teacherId: teacher?.id,
                });
              }}
            />
          ) : null}
        </View>
      );
    }
  };

  const _renderCardTimesOver = (item: any) => {
    return (
      <View style={styles.cardCountDownStartContainer}>
        <Text style={styles.cardCountDownStartTitle}>
          {'Segera Berlangsung'}
        </Text>

        <Button
          style={styles.cardCountDownStartButton}
          label={'Gabung'}
          action={() => onStartMeeting(item)}
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
      start_soon,
      rombel_class,
      subject,
    } = item;

    const timeStart = new Date(time_start);
    const timeStartMiliSeconds = timeStart?.getTime();
    const today = new Date();
    const todayMiliSeconds = today.getTime();
    const timeToStartLiveMeetingMiliSeconds =
      timeStartMiliSeconds - todayMiliSeconds;
    const timeToStartLiveMeetingMinutes = Math.round(
      timeToStartLiveMeetingMiliSeconds / 1000 / 60,
    );

    const typeName = type == 'live' ? 'Langsung' : 'Rekaman';
    const isOnGoing = status == 'on_going';
    const isUnstarted = status == 'unstarted';
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
          if (teacher) {
            //keep sementara
            // navigation.navigate('DetailSessionClassScreen', {
            //   id: item?.id,
            //   item: item,
            //   full_name: teacher?.full_name,
            // });
            navigation.navigate('LMSTeacherDetailClassSessionScreen', {id});
          } else {
            navigation.navigate('LMSTeacherDetailClassSessionScreen', {id});
          }
        }}
        style={styles.dataCard}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{rombel_class?.name}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{typeName}</Text>
          </View>

          {platformTitle.length == 0 ? null : (
            <View style={styles.badge}>
              <Text style={styles.titleBadge}>{platformTitle}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle}>{subject?.name}</Text>
        <Text style={styles.cardSubtitle}>{title}</Text>
        <Text style={styles.cardDateTitle}>{date}</Text>
        <View style={styles.lineGrey} />

        {isOnGoing ? (
          <View style={styles.cardCountDownContainer}>
            {start_soon ? (
              <Text style={styles.cardCountDownStartTitle}>
                {'Segera Berlangsung'}
              </Text>
            ) : (
              <View style={styles.onGoingContainer}>
                <View style={styles.onGoingDotOutter}>
                  <View style={styles.onGoingDotInner} />
                </View>
                <Text style={styles.onGoingTitle}>{'Sedang berlangsung'}</Text>
              </View>
            )}

            <Button
              style={styles.cardCountDownButton}
              label={'Gabung'}
              action={() => {
                if (start_soon) {
                  return onStartMeeting(item);
                }
                onJoinMeeting(item);
              }}
            />
          </View>
        ) : isUnstarted ? (
          <View style={styles.cardCountDownContainer}>
            {timeToStartLiveMeetingMinutes < 1 ? (
              _renderCardTimesOver(item)
            ) : (
              <Countdown
                endTime={time_start}
                renderAfterTimeOver={_renderCardTimesOver(item)}
              />
            )}
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
            style={styles.pv16}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ccContainer}
          />
        </View>
        <View style={styles.container}>
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              ref={flatListRef}
              data={sessionData?.data}
              ListEmptyComponent={
                <View style={styles.noDataContainer}>{_renderNoData()}</View>
              }
              onEndReachedThreshold={0.25}
              onEndReached={onEndReach}
              keyExtractor={(_, idx): any => idx}
              renderItem={({item}) => _renderContent(item)}
            />
            <>
              <View style={styles.lineGrey} />
              {userData?.user_type_id !== 4 ? (
                <View style={styles.buttonContainer}>
                  <Button
                    label={'+ Buat Sesi Kelas'}
                    action={() => {
                      sessionData.data = [];
                      navigation?.navigate('LMSTeacherFormClassSessionScreen', {
                        teacherId: teacher?.id,
                      });
                    }}
                  />
                </View>
              ) : null}
            </>
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
      />
    </>
  );
};

export default LMSTeacherClassSessionScreen;
