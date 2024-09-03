/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Maskot10} from '@assets/images';
import useMyActivity from './useMyActivity';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {Button, DatePicker, SwipeUp} from '@components/atoms';
import IconClose from '@assets/svg/x.svg';
import IconArrowBottomWhite from '@assets/svg/ic_arrow_bottom_white.svg';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import IconHistory from '@assets/svg/ic_history.svg';
import IconCalendar from '@assets/svg/ic_calendar.svg';
import {_handlerConvertDatePicker} from '@constants/functional';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const MyActivityScreen = ({route}: any) => {
  const {
    isLoading,
    dataFilter,
    listActivity,
    valueDatePicker,
    isShowSwipeUp,
    isShowSwipeUpDate,
    selectedFilter,
    selectedTemporaryFilter,
    datePickerFrom,
    datePickerUntil,
    setValueDatePicker,
    _handlerOnScroll,
    _handlerOnPressSwipeUpTemporaryButton,
    _handlerOnPressSwipeUpFromButton,
    _handlerOnPressSwipeUpUntilButton,
    _handlerOnPressSwipeUpResetButton,
    _handlerOnPressSwipeUpApplyButton,
    _handlerOnPressSwipeUpDateSelectButton,
    _handlerOnPressTab,
    _handlerOnCloseSwipeUp,
    _handlerOnCloseSwipeUpDate,
    _handlerShowSwipeUp,
  } = useMyActivity();
  const navigation = useNavigation();
  const isTemporaryChooseDate = selectedTemporaryFilter == 'Pilih Tanggal';
  const datePickerConvertFrom = _handlerConvertDatePicker(datePickerFrom);
  const datePickerConvertUntil = _handlerConvertDatePicker(datePickerUntil);
  const datePickerFromUntil = `${_handlerConvertDatePicker(
    datePickerFrom,
  )} - ${_handlerConvertDatePicker(datePickerUntil)}`;
  const isDateFromAndUntilAvailable = datePickerFrom && datePickerUntil;

  useLayoutEffect(() => {
    const childrenActivity = route?.params?.userData?.access_token;

    navigation.setOptions({
      headerShown: true,
      header: () =>
        childrenActivity ? (
          <Header
            label={childrenActivity ? 'Aktivitas Anak' : 'Aktivitas Saya'}
            subLabel={`${route?.params?.userData?.full_name || '-'} • ${
              route?.params?.userData?.rombel_name || '-'
            }`}
          />
        ) : (
          <Header
            label={childrenActivity ? 'Aktivitas Anak' : 'Aktivitas Saya'}
          />
        ),
    });
  }, []);

  const _renderSwipeUpContent = () => {
    return (
      <>
        <View style={styles.swipeUpContainer}>
          <Text style={styles.swipeUpHeaderTitle}>
            {isTemporaryChooseDate ? 'Filter Tanggal' : 'Filter'}
          </Text>
          <Text style={styles.swipeUpTitle}>{'Tanggal'}</Text>
          <View style={styles.swipeUpContent}>
            {dataFilter?.map((value: any, index: any) => {
              const isSelected = selectedTemporaryFilter === value?.label;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => _handlerOnPressSwipeUpTemporaryButton(value)}
                  style={
                    isSelected
                      ? styles.swipeUpLabelActiveContainer
                      : styles.swipeUpLabelPassiveContainer
                  }>
                  <Text
                    style={
                      isSelected
                        ? styles.swipeUpLabelActive
                        : styles.swipeUpLabelPassive
                    }>
                    {value?.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.swipeUpDateWrapperField}>
            {isTemporaryChooseDate ? (
              <View style={styles.swipeUpDateContainer}>
                <View style={styles.swipeUpdateLeftField}>
                  <Text style={styles.swipeUpDateTitle}>{'Dari'}</Text>
                  <TouchableOpacity
                    onPress={_handlerOnPressSwipeUpFromButton}
                    style={styles.swipeUpDateButton}>
                    <Text style={styles.swipeUpDateLabelButton}>
                      {datePickerFrom ? datePickerConvertFrom : '-'}
                    </Text>

                    <IconCalendar width={24} height={24} />
                  </TouchableOpacity>
                </View>

                <View style={styles.swipeUpdateLeftField}>
                  <Text style={styles.swipeUpDateTitle}>{'Sampai'}</Text>
                  <TouchableOpacity
                    onPress={_handlerOnPressSwipeUpUntilButton}
                    style={styles.swipeUpDateButton}>
                    <Text style={styles.swipeUpDateLabelButton}>
                      {datePickerUntil ? datePickerConvertUntil : '-'}
                    </Text>

                    <IconCalendar width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.swipeUpButtonWrapper}>
            <Button
              outline
              style={styles.swipeUpButtonCancel}
              label={'Atur Ulang'}
              isDisabled={!selectedTemporaryFilter}
              action={_handlerOnPressSwipeUpResetButton}
            />
            <Button
              style={styles.swipeUpButtonConfirm}
              label={'Terapkan'}
              isDisabled={
                (isTemporaryChooseDate && !isDateFromAndUntilAvailable) ||
                !selectedTemporaryFilter
              }
              action={_handlerOnPressSwipeUpApplyButton}
            />
          </View>
        </View>

        {isShowSwipeUpDate ? (
          <SwipeUp
            height={100}
            visible={isShowSwipeUpDate}
            onClose={_handlerOnCloseSwipeUpDate}
            children={_renderSwipeUpDateContent()}
          />
        ) : null}
      </>
    );
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
            isDisabled={!selectedTemporaryFilter}
            action={_handlerOnPressSwipeUpDateSelectButton}
          />
        </View>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={listActivity?.data}
        onEndReached={() => _handlerOnScroll()}
        renderItem={(items: any) => {
          return _renderCard(items);
        }}
      />
    );
  };

  const _renderEmptyContent = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Maskot10} style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>{'Hasil filter tidak ditemukan'}</Text>
        <Button
          style={styles.noDataButton}
          label={'Atur Ulang'}
          action={() => {}}
        />
      </View>
    );
  };

  const _renderTab = () => {
    return (
      <View style={styles.tabContainer}>
        {selectedFilter ? (
          <TouchableOpacity
            onPress={_handlerOnPressTab}
            style={styles.tabCloseButton}>
            <IconClose width={24} height={24} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={selectedFilter ? styles.tabCardActive : styles.tabCardPassive}
          onPress={_handlerShowSwipeUp}>
          <Text
            style={
              selectedFilter ? styles.tabTitleActive : styles.tabTitlePassive
            }>
            {isTemporaryChooseDate && isDateFromAndUntilAvailable
              ? datePickerFromUntil
              : selectedFilter
              ? selectedFilter
              : dataFilter?.[2].label}
          </Text>
          {selectedFilter ? (
            <IconArrowBottomWhite width={20} height={20} />
          ) : (
            <IconArrowBottomBlue width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const _renderCard = (items: any) => {
    items = items.item;

    return (
      <View style={styles.dataContainer}>
        <View>
          <View style={styles.dataCard}>
            <Text style={styles.dataCategory}>{items?.title}</Text>
            <Text style={styles.dataTitle}>{items?.description}</Text>
            <View style={styles.dataTimeContainer}>
              <IconHistory width={16} height={16} style={styles.dataTimeIcon} />

              <Text style={styles.dataTimeTitle}>{items?.timestamp}</Text>
            </View>
          </View>

          <View style={styles.grayLine} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      {_renderTab()}

      {listActivity?.data && listActivity?.data?.length != 0
        ? _renderContent()
        : _renderEmptyContent()}

      <SwipeUp
        height={100}
        visible={isShowSwipeUp}
        onClose={_handlerOnCloseSwipeUp}
        children={_renderSwipeUpContent()}
      />

      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export default MyActivityScreen;
