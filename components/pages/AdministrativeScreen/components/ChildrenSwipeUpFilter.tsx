import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import {Button, DatePicker} from '@components/atoms';
import {styles} from '../styles';
import IconCalendar from '@assets/svg/ic_calendar.svg';
import IconClose from '@assets/svg/ic40_x_close_round_white.svg';

export const ChildrenSwipeUpFilter = (props: any) => {
  const {
    data,
    setIsShow,
    subTitle,
    type,
    status,
    paymentFor,
    setStatus,
    setPaymentFor,
    setSelected,
    selected,
    date,
    setDate,
    valueDatePicker,
    setValueDatePicker,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    calendar,
    setCalendar,
    _handlerSetDate,
    setTime,
    setState,
    setPaymentForName,
    setPage,
  } = props;

  const [selectedTemporary, setSelectedTemporary] = useState(
    type == 'paymentFor'
      ? paymentFor
      : type == 'status'
      ? status
      : type == 'date'
      ? date
      : [],
  );

  const handleButtonClick = (item: string) => {
    if (type === 'status' || type === 'paymentFor') {
      if (selectedTemporary.includes(item)) {
        setSelectedTemporary(selectedTemporary.filter(data => data !== item));
      } else {
        setSelectedTemporary([...selectedTemporary, item]);
      }
    }
    if (type === 'date') {
      setSelectedTemporary(item);
    }
  };
  const getColorButton = () => {
    var colors = Colors.dark.neutral50;
    if (selectedTemporary?.length !== 0) {
      colors = Colors.primary.base;
    }

    if (date === 'Semua Tanggal') {
      colors = Colors.primary.base;
    } else if (datePickerFrom || datePickerUntil) {
      colors = Colors.primary.base;
    }

    return colors;
  };
  return (
    <View style={styles.swipeUpContainerSoal}>
      <View style={styles.swpTopContent}>
        {calendar?.status ? (
          <View style={[styles.swpTopTitle2Container]}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0, top: -6}}
              onPress={() => {
                setCalendar({...calendar, status: false, type: ''});
              }}>
              <IconClose width={40} height={40} />
            </TouchableOpacity>
            <Text style={[styles.swpTopTitle, {alignSelf: 'center'}]}>
              Pilih Tanggal
            </Text>
          </View>
        ) : (
          <View style={styles.swpTopTitle2Container}>
            <Text style={[styles.swpTopTitle]}>Filter</Text>
          </View>
        )}
        {subTitle && <Text style={[styles.swpSubTitle]}>{subTitle}</Text>}
        {calendar?.status ? (
          <View style={calendar?.status ? styles.calendar : {display: 'none'}}>
            <DatePicker
              selected={valueDatePicker}
              onChange={setValueDatePicker}
            />
          </View>
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingTop: 8,
            }}>
            {data?.map((item: any, index: number) => {
              var buttonColor = Colors.primary.light3;
              var textColor = Colors.primary.base;
              if (
                selectedTemporary?.includes(item?.id) ||
                selectedTemporary?.includes(item?.name?.toLowerCase()) ||
                selectedTemporary === item?.name
              ) {
                buttonColor = Colors.primary.base;
                textColor = Colors.white;
              }
              return (
                <TouchableOpacity
                  style={[styles.chips, {backgroundColor: buttonColor}]}
                  key={index}
                  onPress={() => {
                    if (type === 'paymentFor') {
                      handleButtonClick(item?.id);
                    } else if (type === 'status') {
                      handleButtonClick(item?.name?.toLowerCase());
                    } else {
                      handleButtonClick(item?.name);
                    }
                  }}>
                  <Text style={[styles.chipsText, {color: textColor}]}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <View>
          {type === 'date' &&
            selectedTemporary === 'Pilih Tanggal' &&
            calendar?.status != true && (
              <View style={[styles.dateContainer]}>
                <View style={styles.dateItem}>
                  <Text style={styles.itemTitle}>{'Dari'}</Text>
                  <Pressable
                    onPress={() => {
                      setCalendar({...calendar, status: true, type: 'from'});
                    }}>
                    <View style={styles.dateContainerText}>
                      <Text style={styles.dateText}>
                        {datePickerFrom ? datePickerConvertFrom : '-'}
                      </Text>
                      <IconCalendar />
                    </View>
                  </Pressable>
                </View>
                <View style={styles.dateItem}>
                  <Text style={styles.itemTitle}>Sampai</Text>
                  <Pressable
                    onPress={() => {
                      setCalendar({...calendar, status: true, type: 'until'});
                    }}>
                    <View style={styles.dateContainerText}>
                      <Text style={styles.dateText}>
                        {datePickerUntil ? datePickerConvertUntil : '-'}
                      </Text>
                      <IconCalendar />
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
        </View>
      </View>
      {!calendar?.status ? (
        <View style={[styles.swpBottomContentSoal]}>
          <Button
            label={'Atur Ulang'}
            style={[styles.SoalButton]}
            background={Colors.white}
            color={getColorButton()}
            borderColor={getColorButton()}
            borderWidth={1}
            customDisabled={
              getColorButton() === Colors.primary.base ? false : true
            }
            action={() => {
              if (type === 'status') {
                setStatus([]);
              } else if (type === 'paymentFor') {
                setPaymentFor([]);
                setPaymentForName([]);
              } else {
                setDate('');
                setTime({from: '', until: ''});
                setState({datePickerFrom: '', datePickerUntil: ''});
              }
              setSelectedTemporary([]);
              setSelected(oldArray => oldArray.filter(data => data !== type));
            }}
          />
          <Button
            label={'Terapkan'}
            style={styles.SoalButton}
            action={() => {
              if (type === 'paymentFor') {
                setPaymentFor(selectedTemporary);
                const paymentName = data
                  .filter(e => selectedTemporary.includes(e.id))
                  .map(e => e.name);
                setPaymentForName(paymentName);
              } else if (type === 'status') {
                setStatus(selectedTemporary);
              } else if (type === 'date') {
                if (selectedTemporary.length != '') {
                  setDate(selectedTemporary);
                } else {
                  setDate('');
                }
              }
              var newArray = [];
              if (!selected?.includes(type)) {
                setSelected(oldArray => [...oldArray, type]);
              } else {
                newArray.push(type);
                setSelected(newArray);
              }
              setPage(0);
              setIsShow && setIsShow(false);
            }}
          />
        </View>
      ) : (
        <View style={[styles.swpBottomContentSoal]}>
          <Button
            label="Pilih"
            action={() => {
              _handlerSetDate();
              setCalendar({...calendar, status: false, type: ''});
            }}
            style={[styles.SoalButton, {width: '100%'}]}
          />
        </View>
      )}
    </View>
  );
};
