import {Text, View, Image, FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import useAdministrativeScreen from './useAdministrativeScreen';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '@constants/colors';
import {Button, SwipeUp} from '@components/atoms';
import {ButtonFilter} from './components/ButtonFIlter';
import AdministrativeCard from './components/AdministrativeCard';
import {fetchGetAllAdministrativeDetailHistory} from '@redux';
import ImageNotFound from '@assets/images/robot_empty_search.png';
import {ChildrenSwipeUpFilter} from './components/ChildrenSwipeUpFilter';
import {styles} from './styles';
import {convertDateTime} from '@constants/functional';
import {SvgUri} from 'react-native-svg';
const AdministrativeScreen = () => {
  const {
    isShowPaymentFilter,
    setIsShowPaymentFilter,
    isShowStatusFilter,
    setIsShowStatusFilter,
    isShowDateFilter,
    setIsShowDateFilter,
    isShowPaymentProof,
    setIsShowPaymentProof,
    navigation,
    getAllAdministrativeHistory,
    detail,
    dispatch,
    category,
    setPage,
    buttonCategory,
    status,
    paymentFor,
    paymentForName,
    setPaymentFor,
    setPaymentForName,
    setStatus,
    date,
    setDate,
    selected,
    setSelected,
    resetFilter,
    setTime,
    valueDatePicker,
    setValueDatePicker,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    calendar,
    setCalendar,
    _handlerSetDate,
    getMoreData,
    setState,
  } = useAdministrativeScreen();

  const dataDetail = [
    {id: 1, label: 'No Transaksi', desc: detail?.payment_code},
    {id: 2, label: 'NIS', desc: detail?.registration_number},
    {id: 3, label: 'Nama', desc: detail?.full_name},
    {
      id: 4,
      label: 'Tanggal Pembayaran',
      desc: convertDateTime(detail?.payment_date),
    },
    {
      id: 5,
      label: 'Kelas',
      desc: detail?.rombel_class_school_name,
    },
    {
      id: 6,
      label: 'Metode Pembayaran',
      desc: detail?.payment_category?.name,
    },
    {
      id: 7,
      label: 'Rekening Sekolah',
      desc: detail?.payment_method?.name,
    },
    {
      id: 8,
      label: 'Status Pembayaran',
      desc: detail?.status,
    },
    {
      id: 9,
      label: 'Catatan',
      desc: detail?.payment_notes?.notes_status,
    },
  ];
  const renderChildrenSwipeUpPaymentProof = () => {
    return (
      <View style={[styles.swipeUpContainerSoal]}>
        <View style={styles.swpTopContent}>
          <View style={styles.swpTopTitle2Container}>
            <Text style={[styles.swpTopTitle]}>Bukti Pembayaran</Text>
          </View>
          <View style={styles.swipeUpMiddleContainer}>
            {dataDetail?.map((obj: any) => (
              <View style={styles.transactionRow}>
                <Text style={styles.transactionText}>{obj?.label}</Text>
                {obj?.id === 8 ? ( //status pembayaran
                  <View style={styles.transactionRow}>
                    <Text style={styles.transactionDescription}>: {'  '}</Text>
                    <View
                      style={[
                        styles.chipsBold,
                        {
                          backgroundColor:
                            obj?.desc !== 'diterima'
                              ? Colors.danger.light2
                              : Colors.success.light2,
                        },
                      ]}>
                      {obj?.desc === 'diterima' ? (
                        <Text
                          style={[
                            styles.chipsText,
                            styles.chipsTextBold,
                            {color: Colors.success.base},
                          ]}>
                          Diterima
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.chipsText,
                            styles.chipsTextBold,
                            {color: Colors.danger.base},
                          ]}>
                          Ditolak
                        </Text>
                      )}
                    </View>
                  </View>
                ) : (
                  <Text style={styles.transactionDescription}>
                    : {'  '}
                    {obj?.desc !== '' ? obj?.desc : '-'}
                  </Text>
                )}
              </View>
            ))}
            {detail?.payment_proof_path_url?.endsWith('svg') ? (
              <SvgUri
                uri={detail?.payment_proof_path_url}
                style={styles.imageProof}
                width={'100%'}
                height={237}
              />
            ) : (
              <Image
                source={{uri: detail?.payment_proof_path_url}}
                style={styles.imageProof}
              />
            )}
          </View>
          <Button
            label="Tutup"
            action={() => {
              setIsShowPaymentProof(false);
            }}
          />
        </View>
      </View>
    );
  };

  const renderChildrenSwipeUpPaymentFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'paymentFor'}
        paymentFor={paymentFor}
        setPaymentFor={setPaymentFor}
        paymentForName={paymentForName}
        setPaymentForName={setPaymentForName}
        dualButton
        subTitle={'Kategori Pembayaran'}
        data={category}
        setIsShow={setIsShowPaymentFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setPage}
      />
    );
  };

  const renderChildrenSwipeUpStatusFilter = () => {
    const data = [
      {
        id: 1,
        name: 'Semua',
      },
      {
        id: 2,
        name: 'Diterima',
      },
      {
        id: 3,
        name: 'Ditolak',
      },
    ];
    return (
      <ChildrenSwipeUpFilter
        type={'status'}
        status={status}
        setStatus={setStatus}
        dualButton
        subTitle={'Status'}
        data={data}
        setIsShow={setIsShowStatusFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setPage}
      />
    );
  };

  const renderChildrenSwipeUpDateFilter = () => {
    const data = [
      {
        id: 1,
        name: 'Semua Tanggal',
      },
      {
        id: 2,
        name: 'Pilih Tanggal',
      },
    ];

    return (
      <ChildrenSwipeUpFilter
        type={'date'}
        date={date}
        setDate={setDate}
        dualButton
        data={data}
        isShow={isShowDateFilter}
        setIsShow={setIsShowDateFilter}
        setSelected={setSelected}
        selected={selected}
        valueDatePicker={valueDatePicker}
        setValueDatePicker={setValueDatePicker}
        datePickerConvertFrom={datePickerConvertFrom}
        datePickerConvertUntil={datePickerConvertUntil}
        datePickerFrom={datePickerFrom}
        datePickerUntil={datePickerUntil}
        calendar={calendar}
        setCalendar={setCalendar}
        _handlerSetDate={_handlerSetDate}
        setTime={setTime}
        setState={setState}
        setPage={setPage}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <Header
        label={'Riwayat Administrasi'}
        onPressIconLeft={() => navigation.goBack()}
        backgroundColor={Colors.white}
      />
      <View style={styles.container}>
        <View style={styles.BtnContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {buttonCategory.map((item: any, index: number) => {
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
        {getAllAdministrativeHistory?.data?.data !== null &&
        getAllAdministrativeHistory?.data?.data?.length !== 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.middleContainer]}
              data={getAllAdministrativeHistory?.data?.data}
              onEndReachedThreshold={0.25}
              onEndReached={() => {
                if (getAllAdministrativeHistory?.data?.data?.length > 9) {
                  getMoreData();
                }
              }}
              keyExtractor={(id: any) => {
                id.toString();
              }}
              renderItem={({item}) => (
                <AdministrativeCard
                  data={item}
                  onPress={() => {
                    dispatch(
                      fetchGetAllAdministrativeDetailHistory(item.id),
                    ).then(() => {
                      setIsShowPaymentProof(true);
                    });
                  }}
                />
              )}
            />
          </View>
        ) : getAllAdministrativeHistory?.data?.data == null &&
          selected.length > 0 ? (
          <View style={styles.searchNotFoundContainer}>
            <View style={styles.searchTipsOrNotFound}>
              <Image source={ImageNotFound} style={{width: 100, height: 100}} />
              <Text style={styles.searchTipsOrNotFoundTitle}>
                Hasil Filter Tidak Ditemukan
              </Text>
              <View
                style={{
                  width: '100%',
                  marginTop: 12,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  label="Tampilkan Semua Hasil"
                  action={() => {
                    resetFilter();
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.searchNotFoundContainer}>
            <View style={styles.searchTipsOrNotFound}>
              <Image source={ImageNotFound} style={{width: 100, height: 100}} />
              <Text style={styles.searchTipsOrNotFoundTitle}>
                Belum Ada Riwayat Administrasi
              </Text>
              <Text style={styles.searchTipsOrNotFoundDescription}>
                Daftar administrasi yang pernah dilakukan akan tampil di sini.
              </Text>
            </View>
          </View>
        )}

        <SwipeUp
          isSwipeLine={true}
          visible={isShowPaymentProof}
          onClose={() => {
            setIsShowPaymentProof(false);
          }}
          height={600}
          children={renderChildrenSwipeUpPaymentProof()}
        />
        <SwipeUp
          isSwipeLine={true}
          visible={isShowPaymentFilter}
          onClose={() => {
            setIsShowPaymentFilter(false);
          }}
          height={200}
          children={renderChildrenSwipeUpPaymentFilter()}
        />
        <SwipeUp
          isSwipeLine={true}
          visible={isShowStatusFilter}
          onClose={() => {
            setIsShowStatusFilter(false);
          }}
          height={200}
          children={renderChildrenSwipeUpStatusFilter()}
        />
        <SwipeUp
          isSwipeLine={true}
          visible={isShowDateFilter}
          onClose={() => {
            setIsShowDateFilter(false);
          }}
          height={500}
          children={renderChildrenSwipeUpDateFilter()}
        />
      </View>
    </SafeAreaView>
  );
};

export {AdministrativeScreen};
