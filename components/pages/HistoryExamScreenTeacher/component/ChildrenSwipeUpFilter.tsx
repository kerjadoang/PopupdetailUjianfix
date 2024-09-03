import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import {Button, DatePicker} from '@components/atoms';
import {styles} from '../styles';
import IconCalendar from '@assets/svg/ic_calendar.svg';
import IconClose from '@assets/svg/ic40_x_close_round_white.svg';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
export const ChildrenSwipeUpFilter = (props: any) => {
  const {
    data,
    setIsShow,
    subTitle,
    type,
    tipe,
    setTipe,
    mapel,
    setMapel,
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
  } = props;

  const [seeAll, setSeeAll] = useState<boolean>(false);

  const dataFilter = !seeAll && type === 'mapel' ? data?.slice(0, 5) : data;
  const [selectedTemporary, setSelectedTemporary] = useState(
    type == 'mapel'
      ? mapel
      : type == 'tipe'
      ? tipe
      : type == 'date'
      ? date
      : [],
  );

  const handleButtonClick = (item: any) => {
    if (type === 'tipe' || type === 'mapel') {
      if (selectedTemporary.includes(item)) {
        setSelectedTemporary(selectedTemporary.filter(data => data !== item));
      } else {
        setSelectedTemporary([...selectedTemporary, item]);
      }
    }
    if (type === 'date') {
      setSelectedTemporary(item?.name);
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {subTitle && <Text style={[styles.swpSubTitle]}>{subTitle}</Text>}
          {type !== 'date' && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTemporary(data);
              }}>
              <Text style={[styles.selectAll]}>Pilih Semua</Text>
            </TouchableOpacity>
          )}
        </View>

        {calendar?.status ? (
          <View style={calendar?.status ? styles.calendar : {display: 'none'}}>
            <DatePicker
              selected={valueDatePicker}
              onChange={setValueDatePicker}
            />
          </View>
        ) : (
          <View style={{height: seeAll ? window.height * 0.65 : null}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingTop: 8,
              }}>
              {dataFilter?.map((item: any, index: number) => {
                var buttonColor = Colors.primary.light3;
                var textColor = Colors.primary.base;
                if (item !== undefined && selectedTemporary !== undefined) {
                  if (
                    selectedTemporary === item?.name ||
                    selectedTemporary?.includes(item ?? [])
                  ) {
                    buttonColor = Colors.primary.base;
                    textColor = Colors.white;
                  }
                }
                return (
                  <TouchableOpacity
                    style={[styles.chips, {backgroundColor: buttonColor}]}
                    key={index}
                    onPress={() => {
                      handleButtonClick(item);
                    }}>
                    <Text style={[styles.chipsText, {color: textColor}]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        {type === 'mapel' ? (
          seeAll ? (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setSeeAll(false);
              }}>
              <Text style={styles.showLess}>Tampilkan Sedikit</Text>
              <IconUp width={16} height={16} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setSeeAll(true);
              }}>
              <Text style={styles.showLess}>Tampilkan Semua</Text>
              <IconDown width={16} height={16} />
            </TouchableOpacity>
          )
        ) : null}

        <View>
          {type === 'date' &&
            selectedTemporary === 'Pilih Tanggal' &&
            calendar?.status !== true && (
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
              if (type === 'tipe') {
                setTipe([]);
              } else if (type === 'mapel') {
                setMapel([]);
              } else {
                setDate('');
                setTime({from: '', until: ''});
                setState({datePickerFrom: '', datePickerUntil: ''});
              }
              setSelectedTemporary([]);
              setSelected((oldArray: any) =>
                oldArray.filter((data: any) => data !== type),
              );
            }}
          />
          <Button
            label={'Terapkan'}
            style={styles.SoalButton}
            action={() => {
              if (type === 'mapel') {
                setMapel(selectedTemporary);
              } else if (type === 'tipe') {
                setTipe(selectedTemporary);
              } else if (type === 'date') {
                if (selectedTemporary.length !== '') {
                  setDate(selectedTemporary);
                } else {
                  setDate([]);
                }
              }
              var newArray = [];
              if (!selected?.includes(type)) {
                setSelected((oldArray: any) => [...oldArray, type]);
              } else {
                newArray.push(type);
                setSelected(newArray);
              }
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

const window = Dimensions.get('window');
