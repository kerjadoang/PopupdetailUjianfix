/* eslint-disable react-hooks/exhaustive-deps */
import SearchInput from '@components/atoms/SearchInput';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import Colors from '@constants/colors';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import FilterSwipeUp from '../LMSTeacherClassSessionScreen/components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {
  IListScheduledAndNeedToBeCheckFilter,
  IRombelData,
  LMSFilteredSubmited,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {MoreMenu, MenuItemButtonType, SwipeUp} from '@components/atoms';
import {
  _handlerCapitalizeFirstLetter,
  dismissLoading,
  downloadFile,
  getTimezoneOffset,
  isText,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import UjianCardItem from './components/UjianCardItem';
import {useLMSTeacherGetExamsHistory} from '@services/lms';
import ResetFilterIcon from '@assets/svg/ic16_x_grey.svg';
import {EmptyDisplay, Header} from '@components/atoms';
import MaskotIconEmptyState from '@assets/svg/robot_empty_search.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import CopyIcon from '@assets/svg/ic24_copy_blue.svg';
import LatihanIcon from '@assets/svg/ic24_latihan.svg';
import UnduhIcon from '@assets/svg/ic24_download_blue.svg';
import {PDFPreviewScreenParam, ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {getHeaders} from '@api/utils';
import {URL_PATH} from '@constants/url';
import SwipeUpDateFilter from '@components/atoms/SwipeUpDateFilter';
import dayjs from 'dayjs';

const parseFilterDate = (date?: string) =>
  !date ? '' : dayjs(date).format('YYYY-MM-DD');

const initialFilter = {
  rombel_data: [],
  subject: [],
  service_data: [],
  page: 1,
  limit: 16,
};

const RiwayatUjianScreen: React.FC = () => {
  const navigation: any =
    useNavigation<StackNavigationProp<ParamList, 'UjianScreen'>>();
  const {navigateScreen} = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: keyof LMSTeacherClassSessionFilter | '';
  }>({status: false, type: ''});
  const [initFilter, setInitFilter] = useState<{
    rombel_data: IRombelData[] | [];
    subject: IBaseSubject[] | [];
    service_data: IBaseService[] | [];
  }>({
    rombel_data: [],
    subject: [],
    service_data: [],
  });
  // selected filter in swipe up
  const [filter, setFilter] = useState<LMSFilteredSubmited>({
    rombel_data: [],
    subject: [],
    service_data: [],
    page: 1,
    limit: 15,
  });
  // selected filter after submitted in swipe up
  const [filterSubmitted, setFilterSubmitted] = useState<LMSFilteredSubmited>({
    rombel_data: [],
    subject: [],
    service_data: [],
    page: 1,
    limit: 5,
  });
  const [dateFrom, setDateFrom] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [dateTo, setDateTo] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [examID, setExamID] = useState<any>(null);
  const [examData, setExamData] = useState<any>(null);
  const {
    mutate,
    data: listExamsData,
    nextPage,
    isLoading,
  } = useLMSTeacherGetExamsHistory();
  const isFiltered =
    filterSubmitted?.rombel_data?.length > 0 ||
    filterSubmitted?.subject?.length > 0 ||
    filterSubmitted?.service_data!.length > 0;

  const renderItem = ({item}: any) => {
    return (
      <UjianCardItem
        data={item}
        onPressShowMore={() => {
          setShowMoreMenu(true);
          setExamID(item?.id);
          setExamData(item);
        }}
        onPressCheckDetail={() =>
          navigation.navigate('DetailTaskScreenTeacher', {
            id: item?.id,
            data: item,
            isFromTeacher: true,
          })
        }
        section="riwayat"
      />
    );
  };
  const renderItemFilterCapsule = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Riwayat Ujian" />,
    });
  }, []);

  useEffect(() => {
    const getInitFilter = async () => {
      let res = await Promise.all([
        globalProvider.getAllRombel(),
        globalProvider.getAllSubject(),
        globalProvider.getAllServices(),
      ]);
      setInitFilter({
        rombel_data: res[0].data?.data ?? [],
        subject: res[1].data?.data ?? [],
        service_data: res[2].data?.data ?? [],
      });
    };
    getInitFilter();
  }, []);

  useEffect(() => {
    const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
      page: filterSubmitted.page,
      limit: filterSubmitted.limit,
      rombel_id: filterSubmitted.rombel_data?.map(
        rombelId => rombelId.rombel_class_school_id,
      ),
      subject_id: filterSubmitted.subject?.map(subjectIds => subjectIds.id),
      service_id: filterSubmitted.service_data?.map(
        serviceIds => serviceIds.id,
      ),
      status: ['done_scoring'],
      search: query,
      from: parseFilterDate(filterSubmitted.dateStart),
      to: parseFilterDate(filterSubmitted.dateEnd),
    };
    mutate(trasnformFilter);
  }, [filterSubmitted]);

  useEffect(() => {
    const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
      page: 1,
      limit: filterSubmitted.limit,
      rombel_id: filterSubmitted.rombel_data?.map(
        rombelId => rombelId.rombel_class_school_id,
      ),
      subject_id: filterSubmitted.subject?.map(subjectIds => subjectIds.id),
      service_id: filterSubmitted.service_data?.map(
        serviceIds => serviceIds.id,
      ),
      status: ['done_scoring'],
      search: query,
      from: parseFilterDate(filterSubmitted.dateStart),
      to: parseFilterDate(filterSubmitted.dateEnd),
    };
    mutate(trasnformFilter);
  }, [query]);

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

      case 'service_data':
        const dataService = data as IBaseService;
        const serviceIsExist = filterData.service_data?.some(
          rombel => rombel.id === dataService.id,
        );
        if (serviceIsExist) {
          filterData.service_data = filterData.service_data?.filter(
            item => item.id !== dataService.id,
          );
        } else {
          filterData.service_data = [...filter.service_data!, dataService];
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
      case 'service_data':
        filterData.service_data = [];
        break;
      default:
        break;
    }
    setFilter(filterData);
  };
  const onRemoveAllFilter = () => {
    setFilter(initialFilter);
    setFilterSubmitted(initialFilter);
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
      case 'service_data':
        filterData.service_data = initFilter.service_data;
        break;
      default:
        break;
    }
    setFilter(filterData);
  };

  const onShowFilterSwipeUp = (
    status: boolean,
    type: keyof typeof filter | '',
  ) => {
    setShowFilterSwipeUp(prevState => ({...prevState, status, type}));
  };

  const onClearSearch = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setQuery('');
    setFilterSubmitted(prevState => ({
      ...prevState,
      page: 1,
    }));
  };

  const onSubmitFilter = () => {
    setShowFilterSwipeUp(prevState => ({...prevState, status: false}));
    setFilterSubmitted(prevState => ({
      ...prevState,
      ...filter,
      page: 1,
      limit: 5,
    }));
    if (listExamsData?.data && listExamsData?.data?.length > 0) {
      flatListRef.current?.scrollToIndex?.({index: 0, animated: false});
    }
  };

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
        isSelected: filterSubmitted.subject.length > 0,
        value:
          filter.subject?.length === 0
            ? undefined
            : filterSubmitted.subject?.length < 2 &&
              filterSubmitted.subject?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.subject.map(item => item.name).join(''),
              )
            : `${filterSubmitted.subject?.length} Mapel`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'subject',
          }));
        },
      },
      {
        title: 'Semua tipe',
        isSelected: filterSubmitted.service_data!.length > 0,
        value:
          filter.service_data?.length === 0
            ? undefined
            : filterSubmitted.service_data!.length < 2 &&
              filterSubmitted.service_data!.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.service_data!.map(item => item.name).join(''),
              )
            : `${filterSubmitted.service_data?.length} Tipe`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'service_data',
          }));
        },
      },
      {
        title: 'Semua Tanggal',
        isSelected: !!filterSubmitted.dateType,
        value:
          filterSubmitted.dateType === 'Pilih Tanggal'
            ? `${dayjs(filterSubmitted.dateStart).format(
                'DD/MM/YYYY',
              )} - ${dayjs(filterSubmitted.dateEnd).format('DD/MM/YYYY')}`
            : filterSubmitted.dateType,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'date',
          }));
        },
      },
    ],
    [filterSubmitted],
  );

  const onEndReach = () => {
    if (nextPage && !isLoading) {
      setFilterSubmitted(prevState => ({
        ...prevState,
        page: filterSubmitted.page! + 1,
      }));
    }
  };

  const downloadLaporanUjian = async () => {
    try {
      showLoading();

      const fileName = `laporan-ujian-${examData?.title}.pdf`;
      const header = await getHeaders();
      const resFile = await downloadFile({
        headers: header,
        fileExt: 'pdf',
        fileNameWithExt: fileName,
        full_path: URL_PATH.get_teacher_ujian_report_download(
          examID,
          getTimezoneOffset(),
        ),
      });

      if (resFile?.filePath) {
        showSuccessToast('Laporan ujian berhasil diunduh.');
      }
    } catch (err) {
      showErrorToast(isText(err) ? err : 'Gagal unduh laporan ujian.');
    } finally {
      dismissLoading();
    }
  };

  const menuData: MenuItemButtonType[] = [
    {
      icon: <CopyIcon />,
      label: 'Duplikat Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        navigation.navigate('CreateJadwalUjianScreen', {
          schedule_id: examID,
          isDuplicate: true,
        });
      },
    },
    {
      icon: <UnduhIcon />,
      label: 'Unduh Laporan Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        downloadLaporanUjian();
      },
    },
    {
      icon: <LatihanIcon />,
      label: 'Analisis Butir Soal',
      onPress: async () => {
        setShowMoreMenu(false);
        navigateScreen<PDFPreviewScreenParam>('PDFPreviewScreen', {
          data: examData,
          getResHeader: true,
          serviceType: 'Analisis Butir Soal',
        });
      },
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} />
      <SearchInput
        onClear={onClearSearch}
        placeholder="Cari"
        query={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => {
          setQuery(searchQuery);
          Keyboard.dismiss();
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
        {isFiltered && (
          <TouchableOpacity
            onPress={onRemoveAllFilter}
            style={{marginLeft: 16}}>
            <ResetFilterIcon />
          </TouchableOpacity>
        )}
        <FlatList
          renderItem={renderItemFilterCapsule}
          data={capsuleButtonFilterData}
          style={{paddingVertical: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
            paddingLeft: isFiltered ? 0 : 16,
            paddingRight: 16,
          }}
        />
      </View>
      <FlatList
        renderItem={renderItem}
        data={listExamsData?.data}
        ref={flatListRef}
        style={{paddingBottom: 10}}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReach}
        ListEmptyComponent={
          <EmptyDisplay
            title={'Belum Ada Ujian Dijadwalkan'}
            desc="Daftar ujian yang telah dijadwalkan
        akan tampil di sini."
            // btnLabel="Jadwalkan Ujian"
            titleStyle={{fontSize: 16}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
            // action={() => {}}
            imageSvg={<MaskotIconEmptyState />}
          />
        }
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 16,
          paddingBottom: 10,
          paddingTop: 5,
        }}
      />
      <FilterSwipeUp
        onChangeFilter={onChangeFilter}
        onRemoveFilter={onRemoveFilter}
        height={100}
        visible={showFilterSwipeUp.status && showFilterSwipeUp.type !== 'date'}
        type={showFilterSwipeUp.type}
        onClose={() => {
          setFilter(prevState => ({...prevState, ...filterSubmitted}));
          onShowFilterSwipeUp(false, '');
        }}
        rombelAndSubject={initFilter}
        onSubmitFilter={onSubmitFilter}
        onSelectAll={onSelectAllFilter}
        filter={filter as LMSTeacherClassSessionFilter}
      />

      <SwipeUp
        isSwipeLine={true}
        visible={showFilterSwipeUp.status && showFilterSwipeUp.type == 'date'}
        onClose={() => setShowFilterSwipeUp({status: false, type: ''})}
        height={500}
        children={
          <SwipeUpDateFilter
            onDateFromChoose={data => setDateFrom(data)}
            onDateToChoose={data => setDateTo(data)}
            filterDateType={filterSubmitted.dateType}
            defaultDateFrom={dateFrom}
            defaultDateTo={dateTo}
            onResetFilter={() => {
              setFilterSubmitted((prevState: LMSFilteredSubmited) => ({
                ...prevState,
                page: 1,
                dateStart: '',
                dateEnd: '',
                dateType: undefined,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            handleSubmitAction={type => {
              const parseDate = (date: IDatePicker) =>
                `${date.year}-${date.month}-${date.date}`;
              setFilterSubmitted((prevState: LMSFilteredSubmited) => ({
                ...prevState,
                page: 1,
                dateStart: type == 'Semua Tanggal' ? '' : parseDate(dateFrom),
                dateEnd: type == 'Semua Tanggal' ? '' : parseDate(dateTo),
                dateType: type,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
          />
        }
      />
      <MoreMenu
        height={100}
        visible={showMoreMenu}
        menus={menuData}
        onClose={() => setShowMoreMenu(false)}
      />
    </View>
  );
};

export default RiwayatUjianScreen;
