/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Colors from '@constants/colors';
import {
  CCheckBox,
  CardCoinHistory,
  CoachmarkLib,
  DatePicker,
  EmptyDisplay,
  SwipeUp,
} from '@components/atoms';
import {CardBuyCoin} from '@components/atoms/CardBuyCoin';
import {bgBlueOrnament, BannerKoin, KoinIcon, RightArrow} from '@assets/images';
import {Button, PopUp} from '@components/atoms';
import Info from './Component/info';
import useHomeCoin from './useHomeCoin';
import Fonts from '@constants/fonts';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {MaskotBeliKoin} from '@assets/images';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import IconCalendar from '@assets/svg/ic_calendar.svg';
import IconInfo from '@assets/svg/ic_info.svg';
import IconHistory from '@assets/svg/ic24_history.svg';
import Config from 'react-native-config';
import {dismissLoading, showLoading} from '@constants/functional';
import {useCoachmark} from '@hooks/useCoachmark';
import {Keys} from '@constants/keys';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import CloseIcon from '@assets/svg/close_x.svg';
import IconFilter from '@assets/svg/ic24_filter.svg';
import IconFilterActive from '@assets/svg/ic24_filter_check.svg';
import api from '@api/index';

const HomeCoinScreen = (data?: any) => {
  const {
    coin,
    historyCoin,
    showPopUp,
    setShowPopUp,
    snakbar,
    setSnakbar,
    snakbar2,
    setSnakbar2,
    info,
    setInfo,
    getUser,
    datePickerFrom,
    datePickerConvertFrom,
    datePickerUntil,
    datePickerConvertUntil,
    calendar,
    freeCoin,
    setCalendar,
    _handlerSetDate,
    valueDatePicker,
    setValueDatePicker,
    isUseFilter,
    setIsUseFilter,
    setState,
    fetchData,
    getFreecoin,
    resetFilter,
    parseLabelHistoryCoin,
    type,
    setType,
    getHistoryCoin,
    paramsData,
  } = useHomeCoin();

  const navigation: any = useNavigation();
  // JENIS-JENIS FILTER COIN, label untuk ditampilkan, value untuk filter API
  const [typeList, setTypeList] = useState([
    {id: 1, label: 'Koin GRATIS', value: 'free', select: false},
    {id: 2, label: 'Tanya', value: 'tanya', select: false},
    {id: 3, label: 'Beli KOIN', value: 'topup', select: false},
  ]);
  // const [type, setType] = useState([]);
  const [reward, setReward] = useState(); //Reward free coin
  const getLastAccessed = async () => {
    try {
      const response = await api.get('/tanya/v1/home');
      if (response?.status === 200) {
        setReward(response?.data?.data?.free_coin);
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    getLastAccessed();
  }, []);

  useEffect(() => {
    const value = typeList?.map((item: any, _: number) => {
      if (item?.select) {
        return item?.value;
      }
    });
    const selected = value?.filter((item: any) => {
      return item !== undefined;
    });
    setType(() => selected);
  }, [typeList]);

  const _CheckisUsingFilter = () => {
    if (
      type?.length !== 0 ||
      datePickerFrom !== false ||
      datePickerUntil !== false
    ) {
      setIsUseFilter(true);
    } else {
      setIsUseFilter(false);
    }
  };

  useEffect(() => {
    _CheckisUsingFilter();
  }, [type, datePickerFrom, datePickerUntil]);

  const {Coachmarks, doneCoachMark, _handlerCoachmark} = useCoachmark(
    Keys.coachmark_mobile_coin,
  );

  const koin = coin?.data?.balance;
  const [filter, setFilter] = useState(false);

  const datePickerChildren = () => {
    return (
      <>
        <View style={styles.containerSwipeUp}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setCalendar({...calendar, status: false, type: ''});
              }}>
              <CloseIcon width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.titleSwipe}>Pilih Tanggal</Text>
          </View>

          <View style={styles.containerDatePicker}>
            <DatePicker
              selected={
                datePickerFrom
                  ? datePickerFrom
                  : datePickerUntil
                  ? datePickerUntil
                  : valueDatePicker
              }
              onChange={setValueDatePicker}
            />
          </View>
          <Button
            label="Pilih"
            action={() => {
              _handlerSetDate();
              setCalendar({...calendar, status: false, type: ''});
              getHistoryCoin(true);
            }}
            style={styles.btnDatePicker}
          />
        </View>
      </>
    );
  };
  const Filter2 = () => {
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        padding: 16,
        height: 600,
      },
      title: {
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        color: Colors.dark.neutral80,
      },
      dateContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      dateItem: {
        width: '49%',
      },
      dateText: {
        fontFamily: Fonts.SemiBoldPoppins,
        color: Colors.dark.neutral100,
        width: '90%',
      },
      dateContainerText: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 15,
        backgroundColor: Colors.primary.light4,
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      titleDate: {
        fontFamily: 'Poppins-Bold',
        color: Colors.dark.neutral60,
        fontSize: 14,
      },
      titleBlue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: Colors.primary.base,
      },
      itemTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        width: '100%',
        color: Colors.dark.neutral100,
        marginVertical: 16,
      },
      btn: {
        padding: 15,
        width: '100%',
      },
      calendar: {
        height: 200,
        marginBottom: 50,
      },
      bottomContainer: {
        borderTopColor: Colors.dark.neutral20,
        borderTopWidth: 2,
        marginTop: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      },
    });

    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Filter</Text>
            <Text style={styles.titleDate}>Tanggal</Text>
            <View style={styles.dateContainer}>
              <View style={styles.dateItem}>
                <Text style={styles.itemTitle}>{'Dari'}</Text>
                <TouchableOpacity
                  style={styles.dateContainerText}
                  onPress={() =>
                    setCalendar({...calendar, status: true, type: 'from'})
                  }>
                  <Text style={styles.dateText}>
                    {datePickerFrom ? datePickerConvertFrom : '-'}
                  </Text>
                  <View>
                    <IconCalendar />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.itemTitle}>Sampai</Text>
                <TouchableOpacity
                  style={styles.dateContainerText}
                  onPress={() =>
                    setCalendar({...calendar, status: true, type: 'until'})
                  }>
                  <Text style={styles.dateText}>
                    {datePickerUntil ? datePickerConvertUntil : '-'}
                  </Text>
                  <View>
                    <IconCalendar />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <Text style={styles.titleDate}> Jenis Penggunaan </Text>
              <TouchableOpacity onPress={() => onAllSelected()}>
                <Text style={styles.titleBlue}>Pilih Semua </Text>
              </TouchableOpacity>
            </View>
            {typeList.map((item: any, index: number) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.bottomContainer,
                    {marginTop: 0, borderTopWidth: 0, paddingTop: 0},
                  ]}>
                  <Text style={styles.titleBlue}>{item.label}</Text>

                  <CCheckBox
                    isChecked={item.select}
                    onPressCheck={() => onUserSelected(item.id)}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Button
                label={'Atur Ulang'}
                outline
                background={Colors.white}
                color={Colors.dark.neutral40}
                style={styles.btn}
                action={() => {
                  resetFilter();
                  onAllUnSelected();
                  setIsUseFilter(false);
                  fetchData();
                  setFilter(false);
                }}
              />
            </View>
            <View style={styles.dateItem}>
              <Button
                label={'Terapkan'}
                style={styles.btn}
                action={() => {
                  setFilter(false);
                  getHistoryCoin(true);
                }}
              />
            </View>
          </View>
        </View>
        <SwipeUp
          height={550}
          children={datePickerChildren()}
          onClose={() => {
            setCalendar({...calendar, status: false, type: ''});
          }}
          visible={calendar?.status}
        />
      </>
    );
  };

  const onUserSelected = (id: number) => {
    const updatedTypeList = typeList.map(item => {
      if (item.id === id) {
        return {...item, select: !item.select};
      }
      return item;
    });

    setTypeList(updatedTypeList);
  };

  const onAllSelected = () => {
    const updatedTypeList = typeList?.map(item => {
      if (item?.id) {
        return {...item, select: true};
      }
      return item;
    });

    setTypeList(updatedTypeList);
  };

  const onAllUnSelected = () => {
    const updatedTypeList = typeList?.map(item => {
      if (item?.id) {
        return {...item, select: false};
      }
      return item;
    });
    setTypeList(updatedTypeList);
  };

  const _handlerDiscardFilter = () => {
    setIsUseFilter(false);
    onAllUnSelected();
    setType(() => []);
    setState({
      datePickerFrom: false,
      datePickerUntil: false,
    });
  };

  const link_langgqanan =
    Config.ENV_MODE === 'development'
      ? 'kelaspintar.dev/berlangganan/'
      : 'kelaspintar.id/berlangganan/';

  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: Colors.primary.light3}}>
        <ScrollView style={{flex: 1}}>
          <ImageBackground source={bgBlueOrnament} style={styles.topContainer}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Image source={RightArrow} style={styles.iconHeaderArrow} />
              </Pressable>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}>
                <Pressable onPress={() => setInfo(true)}>
                  <IconInfo width={25} height={25} />
                </Pressable>
                <CoachmarkLib
                  ref={ref => (Coachmarks[0] = ref)}
                  onNext={() => _handlerCoachmark(1)}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={1}
                  maxWidth={32}
                  childrenStyle={styles.historyIcon}
                  buttonFinishText="OK"
                  totalCoachmark={1}
                  title={'Riwayat Pembelian'}
                  message={'Cek status pembelian paket kamu di sini'}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CartHistoryScreen', {
                        access_token: paramsData?.access_token,
                      })
                    }
                    style={styles.historyIcon}>
                    <IconHistory width={25} height={25} />
                  </Pressable>
                </CoachmarkLib>
              </View>
            </View>
            <Image source={BannerKoin} style={styles.topBanner} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[styles.title, {color: Colors.white}]}>
                {data?.route?.params?.data?.full_name}
              </Text>
            </View>
            <View style={styles.card}>
              <CardBuyCoin
                coin={koin}
                action={() => navigation.navigate('PackageCoinScreen')}
              />
            </View>
          </ImageBackground>
          <View style={[styles.bottomContainer]}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={[styles.title]}>Riwayat Penggunaan Koin</Text>
              <TouchableOpacity
                onPress={() => setFilter(true)}
                style={{flex: 1}}>
                {isUseFilter ? (
                  <IconFilterActive
                    width={30}
                    height={30}
                    style={styles.iconfilter}
                  />
                ) : (
                  <IconFilter
                    width={30}
                    height={30}
                    style={styles.iconfilter}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              {historyCoin?.data?.length > 0 ? (
                historyCoin?.data?.map((item: any, index: number) => {
                  return (
                    <CardCoinHistory
                      key={index}
                      type={item?.type}
                      label={parseLabelHistoryCoin(item?.type)}
                      date={item?.created_at}
                      nominal={item?.total_coin}
                      colors={
                        item?.type === 'tanya' || item?.type === 'expired'
                          ? Colors.danger.base
                          : Colors.success.base
                      }
                    />
                  );
                })
              ) : (
                <EmptyDisplay
                  title={
                    isUseFilter
                      ? 'Hasil Filter Tidak Ditemukan'
                      : 'Belum Ada Koin Digunakan'
                  }
                  btnLabel={isUseFilter ? 'Tampilkan Semua Hasil' : undefined}
                  containerStyle={styles.emptyContainer}
                  imageSvg={
                    <MaskotEmpty
                      width={120}
                      height={120}
                      style={styles.iconEmptyDisplay}
                    />
                  }
                  action={() => {
                    _handlerDiscardFilter();
                    setIsUseFilter(false);
                    // getHistoryWithoutFilter();
                    getHistoryCoin();
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {getUser?.data?.user_type_id === 2 ||
        getUser?.data?.daily_check_in ? null : (
          <View style={styles.btn}>
            <Button
              label={`Ambil ${reward || 10} Koin GRATIS Untuk Kamu`}
              icon={KoinIcon}
              action={() => {
                showLoading();
                getFreecoin();
                dismissLoading();
                setSnakbar2(true);
                setTimeout(() => {
                  setSnakbar2(false);
                }, 1500);
              }}
            />
          </View>
        )}
        <SwipeUp
          height={950}
          onClose={() => setInfo(false)}
          children={<Info />}
          visible={info}
        />
        <SwipeUp
          height={550}
          onClose={() => {
            setFilter(false);
            setCalendar({...calendar, status: false, type: ''});
          }}
          children={Filter2()}
          visible={filter}
        />

        <PopUp
          show={showPopUp}
          close={() => setShowPopUp(false)}
          png={MaskotBeliKoin}
          title={'Beli Koin'}
          desc={`Saat ini pembelian koin hanya dapat dilakukan di website Kelas Pintar.  (${link_langgqanan})`}
          titleConfirm={'Salin Tautan Pembelian'}
          actionConfirm={() => {
            Clipboard.setString(`${link_langgqanan}`);
            setShowPopUp(false);
            setSnakbar(true);
            setTimeout(() => {
              setSnakbar(false);
            }, 1500);
          }}
          iconConfirm={require('@assets/images/copyWhite.png')}
        />
        <SnackbarResult
          label={'Tautan Berhasil Disalin'}
          visible={snakbar}
          color={Colors.success.base}
          onPressClose={() => setSnakbar(false)}
        />
        <SnackbarResult
          label={
            freeCoin?.error
              ? freeCoin?.error?.message
              : 'Koin gratis berhasil diklaim'
          }
          type={freeCoin?.error ? 'FAILED' : 'SUCCESS'}
          visible={snakbar2}
          onPressClose={() => {
            setSnakbar2(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconHeader: {
    width: 20,
    height: 20,
  },
  iconHeaderArrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
  body: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    width: '100%',
    height: 340,
    resizeMode: 'contain',
    paddingTop: '4%',
  },
  topBanner: {
    alignSelf: 'center',
    width: '70%',
    height: '30%',
    resizeMode: 'contain',
    marginTop: '5%',
  },
  card: {
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  bottomContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    width: '100%',
    marginTop: -30,
    padding: 15,
    backgroundColor: Colors.primary.light3,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  btn: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  historyIcon: {
    borderRadius: 50,
  },
  emptyContainer: {
    backgroundColor: Colors.primary.light3,
  },
  iconEmptyDisplay: {marginVertical: 20},
  titleSwipe: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.dark.neutral80,
  },
  containerSwipeUp: {
    padding: 16,
  },
  containerDatePicker: {height: 200, marginVertical: 10},
  row: {flexDirection: 'row'},
  btnDatePicker: {marginTop: 20},
  btnFilter: {
    width: '20%',
    alignSelf: 'flex-end',
    // justifyContent: 'center',
  },
  iconfilter: {
    alignSelf: 'flex-end',
  },
});

export {HomeCoinScreen};
