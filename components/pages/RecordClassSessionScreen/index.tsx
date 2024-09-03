/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  ScrollView,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import Icon_download from '@assets/svg/ic_download.svg';
import {
  Button,
  DatePicker,
  EmptyDisplay,
  PopUpWithIcon,
  ProgressCircle,
  SwipeUp,
} from '@components/atoms';
import Icon_green_download from '@assets/svg/ic_already_download.svg';
import Colors from '@constants/colors';
import IconCheck from '@assets/svg/ic_play_btn_light.svg';
import Ic_mulai from '@assets/svg/ic16_Mulai.svg';
import IconSearch from '@assets/svg/ic_search.svg';
import useFormRecordClassSession from './useFormRecordClassSession';
import Icon from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import Mascot from '@assets/svg/maskot_7.svg';
import Mascot2 from '@assets/svg/mascot_delete_video.svg';
import SearchInput from '@components/atoms/SearchInput';
import {fetchRecordFilter} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import IconSchedule from '@assets/svg/ic24_jadwal.svg';
import IconClose from '@assets/svg/close_x.svg';
import {useSelector} from 'react-redux';
import {
  _handlerConvertDatePicker,
  capitalizeEachWord,
  dismissLoading,
  showLoading,
} from '@constants/functional';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {putRecordSession} from '../PTNLiveClassRecordScreen/utils';
interface IDatePicker {
  date: any;
  month: any;
  year: any;
}
const RecordClassSessionScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RecordClassSessionScreen'>>();
  const service_type: any = route.params?.service_type;
  const isMateriVideo: any = route.params?.isMateriVideo;
  const getRecordFilter: any = useSelector(
    (state: RootState) => state.getRecordFilter,
  );
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'RecordClassSessionScreen'>>();
  const fetchWithFilter = () => {
    dispatch(
      fetchRecordFilter({
        search: keyword,
        materi_video: isMateriVideo ? ['materi video'] : materi,
        mata_pelajaran: subject,
        tanggal_awal: date.valueFrom,
        tanggal_akhir: date.valueUntil,
        diunduh: isDownload,
      }),
    );
  };
  const [refresh] = useState(false);

  const {
    progress,
    ready,
    modal,
    showModal,
    submit,
    submitDelete,
    dispatch,
    newRecordings,
    setNewRecordings,
    mapel,
    selected_sub_id,
    selected_sub_name,
  }: any = useFormRecordClassSession(service_type, fetchWithFilter);
  dayjs.locale('id');
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [swipe, setSwipe] = useState({
    recordType: false,
    mapel: false,
    date: false,
  });
  const [materi, setMateri] = useState([]);
  const [subject, setSubject] = useState(
    selected_sub_id ? [selected_sub_id] : [],
  );
  const [subjectName, setSubjectName] = useState(
    selected_sub_name ? [selected_sub_name] : [],
  );
  const [isDownload, setIsDownload] = useState(false);
  const [date, setDate] = useState({
    labelFrom: '', //FORMAT TANGGAL 'DARI' YANG DITAMPILKAN
    valueFrom: '', //FORMAT TANGGAL 'DARI' YANG DIKIRIM KE API
    labelHeaderFrom: '', //FORMAT TANGGAL 'DARI' DI HEADER
    labelUntil: '', //FORMAT TANGGAL 'SAMPAI' YANG DITAMPILKAN
    valueUntil: '', //FORMAT TANGGAL 'SAMPAI' YANG DIKIRIM KE API
    labelHeaderUntil: '', //FORMAT TANGGAL 'SAMPAI' DI HEADER
  });
  const [selectDate, setSelectDate] = useState({
    show: false,
    type: '',
  });
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  //TIPE REKAMAN
  const type = [
    {
      label: 'Materi Video', //Tampilan
      value: 'materi video', //PARAM API
    },
    {
      label: 'Sesi Kelas',
      value: 'sesi kelas',
    },
  ];
  const _handlerSetDate = () => {
    const label = _handlerConvertDatePicker(valueDatePicker);
    const value = _handlerConvertDatePicker(valueDatePicker, 9);
    const label2 = _handlerConvertDatePicker(valueDatePicker, 8);
    if (selectDate.show && selectDate.type === 'from') {
      setDate({
        ...date,
        labelFrom: label,
        valueFrom: value,
        labelHeaderFrom: label2,
      });
    } else {
      setDate({
        ...date,
        labelUntil: label,
        valueUntil: value,
        labelHeaderUntil: label2,
      });
    }
  };
  const _handlerSelectFilterItem = (state: any, setState: any, value: any) => {
    const removeArrayValue = () => {
      const index = state.indexOf(value);
      if (index > -1) {
        const newArr = state;
        newArr.splice(index, 1);
        return setState(newArr);
      }
    };
    if (state.includes(value) === true) {
      removeArrayValue();
    } else {
      setState((data: any) => [...data, value]);
    }
  };
  const FilterRecordType = () => {
    return (
      <View style={styles.containerSwipe}>
        <Text style={styles.titleSwipe}>Filter</Text>
        <View style={styles.typeRecord}>
          {type?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  materi?.includes(item?.value)
                    ? styles.filterHeaderActive
                    : styles.FilterHeader,
                ]}
                onPress={() =>
                  _handlerSelectFilterItem(materi, setMateri, item?.value)
                }>
                <Text
                  style={[
                    materi?.includes(item?.value)
                      ? styles.textFilterActive
                      : styles.textFilter,
                  ]}>
                  {item?.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={[
            styles.typeRecord,
            {
              bottom: 0,
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Button
            label={'Atur Ulang'}
            style={styles.btmWidth}
            customDisabled={materi.length > 0 ? false : true}
            action={() => {
              setMateri([]);
              fetchWithFilter();
              setSwipe({...swipe, recordType: false});
            }}
            background={Colors.white}
            outline
          />
          <Button
            label="Terapkan"
            style={styles.btmWidth}
            action={() => {
              showLoading();
              fetchWithFilter();
              setSwipe({...swipe, recordType: false});
              setTimeout(() => {
                dismissLoading();
              }, 1000);
            }}
          />
        </View>
      </View>
    );
  };
  const FilterMapel = () => {
    return (
      <View style={[styles.containerSwipe, {height: 500}]}>
        <Text style={styles.titleSwipe}>Filter</Text>
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={[styles.textBlue, {color: Colors.dark.neutral60}]}>
              Title
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlerSelectAll()}>
            <Text style={styles.textBlue}>{'Pilih Semua'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: '75%'}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {mapel?.data?.data?.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      _handlerSelectFilterItem(subject, setSubject, item?.id);
                      _handlerSelectFilterItem(
                        subjectName,
                        setSubjectName,
                        item?.name,
                      );
                    }}
                    style={[
                      subject.includes(item?.id)
                        ? styles.itemSubjectSelected
                        : styles.itemSubject,
                    ]}>
                    <Text
                      style={[
                        subject.includes(item?.id)
                          ? styles.itemSubjectLabelActive
                          : styles.itemSubjectLabel,
                      ]}>
                      {item?.name || '--'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View
          style={[
            styles.typeRecord,
            {
              bottom: 0,
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Button
            label={'Atur Ulang'}
            customDisabled={subject?.length > 0 ? false : true}
            action={() => {
              setSubject([]);
              fetchWithFilter();
              setSwipe({...swipe, mapel: false});
            }}
            background={Colors.white}
            outline
            style={styles.btmWidth}
          />
          <Button
            label="Terapkan"
            style={styles.btmWidth}
            action={() => {
              showLoading();
              fetchWithFilter();
              setSwipe({...swipe, mapel: false});
              setTimeout(() => {
                dismissLoading();
              }, 1000);
            }}
          />
        </View>
      </View>
    );
  };
  const FilterDate = () => {
    return (
      <>
        {!selectDate.show ? (
          <View style={styles.containerSwipe}>
            <Text style={styles.titleSwipe}>Filter</Text>
            <View
              style={[
                styles.row,
                {justifyContent: 'flex-start', marginVertical: 16},
              ]}>
              <TouchableOpacity
                style={[styles.itemSubject, {flexBasis: '40%'}]}
                onPress={() => setSwipe({...swipe, date: false})}>
                <Text style={styles.itemSubjectLabel}>{'Semua Tanggal'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemSubjectSelected}>
                <Text style={styles.itemSubjectLabelActive}>
                  {'Pilih Tanggal'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'flex-start', marginVertical: 10},
              ]}>
              <View style={styles.btmWidth}>
                <Text
                  style={[
                    styles.itemSubjectLabel,
                    {color: Colors.black, textAlign: 'left'},
                  ]}>
                  {'Dari'}
                </Text>
                <TouchableOpacity
                  style={styles.dateItem}
                  onPress={() =>
                    setSelectDate({...selectDate, show: true, type: 'from'})
                  }>
                  <Text style={styles.dateText}>{date.labelFrom || '--'}</Text>
                  <IconSchedule width={30} height={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.btmWidth}>
                <Text
                  style={[
                    styles.itemSubjectLabel,
                    {color: Colors.black, textAlign: 'left'},
                  ]}>
                  {'Sampai'}
                </Text>
                <TouchableOpacity
                  style={styles.dateItem}
                  onPress={() =>
                    setSelectDate({...selectDate, show: true, type: 'until'})
                  }>
                  <Text style={styles.dateText}>{date.labelUntil || '--'}</Text>
                  <IconSchedule width={30} height={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.typeRecord,
                {
                  bottom: 0,
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <Button
                label={'Atur Ulang'}
                style={styles.btmWidth}
                action={() => {
                  setDate({
                    ...date,
                    labelFrom: '',
                    labelUntil: '',
                    valueFrom: '',
                    valueUntil: '',
                    labelHeaderFrom: '',
                    labelHeaderUntil: '',
                  });
                }}
                background={Colors.white}
                outline
              />
              <Button
                label="Terapkan"
                style={styles.btmWidth}
                action={() => {
                  showLoading();
                  fetchWithFilter();
                  setSwipe({...swipe, date: false});
                  setTimeout(() => {
                    dismissLoading();
                  }, 1000);
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.containerSwipe}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  setSelectDate({...selectDate, show: false, type: ''})
                }>
                <IconClose width={30} height={30} />
              </TouchableOpacity>
              <Text style={[styles.titleSwipe, {marginHorizontal: '30%'}]}>
                {'Pilih Tanggal'}
              </Text>
            </View>
            <DatePicker
              selected={valueDatePicker}
              onChange={setValueDatePicker}
            />
            <Button
              label={'Pilih'}
              action={() => {
                _handlerSetDate();
                setSelectDate({...selectDate, show: false, type: ''});
              }}
            />
          </View>
        )}
      </>
    );
  };
  const _handlerDiscardFilter = () => {
    dispatch(
      fetchRecordFilter({
        search: '',
        materi_video: [],
        mata_pelajaran: [],
        tanggal_awal: '',
        tanggal_akhir: '',
        diunduh: false,
      }),
    );
    setKeyword('');
    setMateri([]);
    setSubject([]);
    setDate({
      ...date,
      labelFrom: '',
      labelUntil: '',
      valueFrom: '',
      valueUntil: '',
      labelHeaderFrom: '',
      labelHeaderUntil: '',
    });
  };
  const handlerSelectAll = () => {
    if (mapel) {
      const id = mapel?.data?.data?.map((item: any, _: number) => {
        return item?.id;
      });
      const name = mapel?.data?.data?.map((item: any, _: number) => {
        return item?.name;
      });
      setSubject(id);
      setSubjectName(name);
    }
  };
  useEffect(() => {
    fetchWithFilter();
  }, [isDownload]);
  useEffect(() => {
    if (getRecordFilter) {
      setNewRecordings(getRecordFilter);
    }
  }, [getRecordFilter]);
  useEffect(() => {
    if (isMateriVideo) {
      setMateri(['materi video'] as never);
    }
  }, [isMateriVideo]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () =>
        showSearch ? (
          <View style={{backgroundColor: Colors.white}}>
            <SearchInput
              containerStyle={{paddingHorizontal: 16, paddingVertical: 14}}
              onClear={() => setKeyword('')}
              onSubmit={() => {
                fetchWithFilter();
                Keyboard.dismiss();
              }}
              placeholder={'Cari judul, pelajaran, guru'}
              cancelable
              onPressCancel={() => {
                setShowSearch(!showSearch);
                keyword === '' ? fetchWithFilter() : setKeyword('');
              }}
              onChangeText={(text: string) => {
                setKeyword(text);
              }}
              query={keyword}
            />
          </View>
        ) : (
          <Header
            label={'Rekaman Sesi Kelas'}
            subLabel={'Guru'}
            iconRight={<IconSearch width={20} />}
            onPressIconRight={() => setShowSearch(!showSearch)}
          />
        ),
    });
  }, [fetchWithFilter, keyword, navigation, showSearch]);

  const [chooseItem, setChooseItem] = useState([]);
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[styles.card, styles.shadowProp]}
        disabled={ready && chooseItem?.ID === item?.ID ? true : false}
        onPress={async () => {
          await putRecordSession(item?.ID || 0, item?.lc_zoom?.media_id || '');
          return navigation.navigate('VideoAnimationScreen', {
            chapterData: item,
            screenName: 'Rekaman',
            type: 'guru',
          });
        }}>
        <View style={[styles.row]}>
          <Text style={[styles.textType]}>
            {capitalizeEachWord(item?.lc_zoom?.category)}
          </Text>
          <TouchableOpacity
            disabled={ready && chooseItem?.ID === item?.ID ? true : false}
            onPress={() => {
              setChooseItem(item);
              showModal();
            }}>
            <ProgressCircle
              progress={ready && chooseItem?.ID === item?.ID ? progress : 0}
              size={45}
              strokeWidth={item?.downloaded ? 0 : 3}
              color={'#09B95A'}
              children={
                item?.downloaded ? (
                  <Icon_green_download width={25} height={25} />
                ) : ready && chooseItem?.ID === item?.ID ? (
                  <Ic_mulai width={25} height={25} />
                ) : (
                  <Icon_download width={25} height={25} />
                )
              }
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textTitle}>{item?.subject?.name}</Text>
        <Text style={[styles.textTitle, {fontSize: 14}]}>
          {item?.chapter?.name}
        </Text>
        <Text style={styles.textSubTitle}>
          {dayjs(item?.time_start).format('dddd, MMMM D YYYY')}
        </Text>
        <View style={styles.row}>
          <View style={styles.rowPp}>
            <Image
              source={require('@assets/images/ic_pp.png')}
              style={styles.pp}
            />
            <Text style={[styles.textSubTitle, {fontSize: 14}]}>
              {item?.user_name}
            </Text>
          </View>
          <ProgressCircle
            progress={30}
            size={56}
            strokeWidth={3}
            color={Colors.primary.base}
            children={<IconCheck width={52} height={52} />}
          />
        </View>
        {modal && chooseItem?.ID === item?.ID ? (
          <PopUpWithIcon
            action_2={() => {
              item?.downloaded ? submitDelete(chooseItem) : showModal();
            }}
            action={() => (item?.downloaded ? showModal() : submit(chooseItem))}
            icon
            iconName={
              item?.downloaded ? (
                <Mascot2 width={100} height={100} />
              ) : (
                <Mascot width={100} height={100} />
              )
            }
            title={item?.downloaded ? 'Hapus Unduan Video' : 'Unduh Video'}
            twoButton
            textButton={item?.downloaded ? 'Kembali' : 'Unduh'}
            textButton_2={item?.downloaded ? 'Hapus' : 'Kembali'}
            desc={
              item?.downloaded
                ? 'Apakah kamu yakin untuk menghapus unduhan? Video tidak dapat ditonton kembali tanpa koneksi internet.'
                : 'Apakah kamu yakin untuk mengunduh? Video dapat ditonton tanpa koneksi internet setelah selesai diunduh.'
            }
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {refresh ? (
        <LoadingIndicator />
      ) : (
        <View style={{marginBottom: 16}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                materi.length > 0
                  ? styles.filterHeaderActive
                  : styles.FilterHeader,
              ]}
              onPress={() => {
                showLoading();
                setSwipe({...swipe, recordType: true});
                setTimeout(() => {
                  dismissLoading();
                }, 200);
              }}>
              <Text
                style={[
                  materi?.length > 0
                    ? styles.textFilterActive
                    : styles.textFilter,
                ]}>
                {materi?.[0] || 'Materi Video'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                subject?.length > 0
                  ? styles.filterHeaderActive
                  : styles.FilterHeader,
              ]}
              onPress={() => {
                showLoading();
                setSwipe({...swipe, mapel: true});
                // setSwipe({...swipe, recordType: true});
                setTimeout(() => {
                  dismissLoading();
                }, 200);
              }}>
              <Text
                style={[
                  subject?.length > 0
                    ? styles.textFilterActive
                    : styles.textFilter,
                ]}>
                {subject?.length > 1
                  ? `${subject?.length} Mapel`
                  : subject?.length === 1
                  ? subjectName?.[0]
                  : 'Semua Mapel'}
              </Text>
              <Icon
                name="chevron-down"
                size={14}
                color={subject?.length > 0 ? Colors.white : Colors.primary.base}
              />
            </TouchableOpacity>
            <Pressable
              style={
                date?.labelHeaderFrom && date?.labelHeaderUntil
                  ? styles.filterHeaderActive
                  : styles.FilterHeader
              }
              onPress={() => setSwipe({...swipe, date: true})}>
              <Text
                style={
                  date?.labelHeaderFrom && date?.labelHeaderUntil
                    ? styles.textFilterActive
                    : styles.textFilter
                }>
                {date?.labelHeaderFrom && date?.labelHeaderUntil
                  ? `${date?.labelHeaderFrom} - ${date?.labelHeaderUntil}`
                  : 'Semua Tanggal'}
              </Text>
              <Icon name="chevron-down" size={14} color={Colors.primary.base} />
            </Pressable>
            <TouchableOpacity
              style={[
                isDownload ? styles.filterHeaderActive : styles.FilterHeader,
              ]}
              onPress={() => {
                showLoading();
                setIsDownload(!isDownload);
                setTimeout(() => {
                  dismissLoading();
                }, 2000);
              }}>
              <Text
                style={[
                  isDownload ? styles.textFilterActive : styles.textFilter,
                ]}>
                {'Diunduh'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {/* <FlatList horizontal data={filter} renderItem={FilterItem} /> */}
        </View>
      )}
      <View style={styles.content}>
        <FlatList
          data={newRecordings?.data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              <EmptyDisplay
                title={
                  keyword
                    ? 'Hasil Pencarian Tidak Ditemukan'
                    : 'Hasil Filter Tidak Ditemukan'
                }
                desc={
                  keyword
                    ? `Hasil pencarian '${keyword}' Nihil \n Coba masukkan kata kunci lainnya ! `
                    : null
                }
                btnLabel={keyword ? null : 'Tampilkan Semua Hasil'}
                imageSvg={
                  <MaskotEmpty
                    width={120}
                    height={120}
                    style={{marginVertical: 20}}
                  />
                }
                action={() => _handlerDiscardFilter()}
              />
            </>
          }
        />
      </View>
      <SwipeUp
        height={500}
        visible={swipe.recordType}
        onClose={() => setSwipe({...swipe, recordType: false})}
        children={<FilterRecordType />}
      />
      <SwipeUp
        height={500}
        visible={swipe.mapel}
        onClose={() => setSwipe({...swipe, mapel: false})}
        children={<FilterMapel />}
      />
      <SwipeUp
        height={500}
        visible={swipe.date}
        onClose={() => setSwipe({...swipe, date: false})}
        children={FilterDate()}
      />
    </View>
  );
};
export {RecordClassSessionScreen};
