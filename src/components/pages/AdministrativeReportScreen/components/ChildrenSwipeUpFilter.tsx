import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import {styles} from '../style';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
import dayjs from 'dayjs';
export const ChildrenSwipeUpFilter = (props: any) => {
  const {
    data,
    setIsShow,
    title,
    subTitle,
    type,
    classes,
    setClasses,
    month,
    setMonth,
    setSelected,
    selected,
    year,
    setYear,
    setPage,
  } = props;

  const [seeAll, setSeeAll] = useState<boolean>(false);

  const dataFilter = !seeAll && type === 'month' ? data?.slice(0, 5) : data;
  const [selectedTemporary, setSelectedTemporary] = useState(
    type === 'class'
      ? classes
      : type === 'month'
      ? month
      : type === 'year'
      ? year
      : null,
  );

  const handleButtonClick = (item: string) => {
    if (type === 'month') {
      const sortByMonthYear = (a: any, b: any) => {
        const dateA: any = dayjs(a.month_year_number);
        const dateB: any = dayjs(b.month_year_number);
        return dateA - dateB;
      };
      if (selectedTemporary?.includes(item)) {
        setSelectedTemporary(
          selectedTemporary.filter((obj: any) => obj !== item),
        );
      } else {
        if (selectedTemporary) {
          setSelectedTemporary(
            [...selectedTemporary, item].sort(sortByMonthYear),
          );
        } else {
          setSelectedTemporary([item]);
        }
      }
    } else if (type === 'class') {
      if (selectedTemporary?.includes(item)) {
        setSelectedTemporary(
          selectedTemporary.filter((obj: any) => obj !== item),
        );
      } else {
        if (selectedTemporary) {
          setSelectedTemporary([...selectedTemporary, item]);
        } else {
          setSelectedTemporary([item]);
        }
      }
    } else {
      if (selectedTemporary === item) {
        setSelectedTemporary(null);
      } else {
        setSelectedTemporary(item);
      }
    }
  };
  const getColorButton = () => {
    var colors = Colors.dark.neutral50;
    if (selectedTemporary !== null && selectedTemporary?.length !== 0) {
      colors = Colors.primary.base;
    }

    return colors;
  };
  return (
    <View style={styles.swipeUpContainerSoal}>
      <View style={styles.swpTopContent}>
        <View style={styles.swpTopTitle2Container}>
          <Text style={[styles.swpTopTitle]}>{title}</Text>
        </View>
        <View style={styles.swipeUpTopContainer}>
          {subTitle && <Text style={[styles.swpSubTitle]}>{subTitle}</Text>}
          {type !== 'year' && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTemporary(dataFilter.map(x => x));
              }}>
              <Text style={[styles.selectAll]}>Pilih Semua</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.svStyle}
            contentContainerStyle={styles.contentContainerStyle}>
            {dataFilter?.map((item: any, index: number) => {
              var buttonColor = Colors.primary.light3;
              var textColor = Colors.primary.base;
              if (item !== undefined) {
                if (
                  type !== 'year'
                    ? selectedTemporary?.includes(item)
                    : selectedTemporary === item
                ) {
                  buttonColor = Colors.primary.base;
                  textColor = Colors.white;
                }
              }
              return (
                <TouchableOpacity
                  style={[styles.chips, {backgroundColor: buttonColor}]}
                  key={index}
                  onPress={() => handleButtonClick(item)}>
                  <Text style={[styles.chipsText, {color: textColor}]}>
                    {item?.name || item?.years}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {type === 'month' ? (
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
      </View>

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
            if (type === 'class') {
              setClasses([]);
            } else if (type === 'month') {
              setMonth([]);
            } else {
              setYear('');
            }
            setSelectedTemporary([]);
          }}
        />
        <Button
          label={'Terapkan'}
          style={styles.SoalButton}
          action={() => {
            if (type === 'class') {
              setClasses(selectedTemporary);
            } else if (type === 'month') {
              setMonth(selectedTemporary);
            } else if (type === 'year') {
              setYear(selectedTemporary);
            }
            var newArray = [];
            if (!selected?.includes(type)) {
              setSelected((oldArray: any) => [...oldArray, type]);
            } else {
              newArray.push(type);
              setSelected(newArray);
            }
            setPage(1);
            setIsShow && setIsShow(false);
          }}
        />
      </View>
    </View>
  );
};
