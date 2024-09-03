import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import Fonts from '@constants/fonts';
export const SwipeUpFilter = (props: any) => {
  const {
    data,
    setIsShow,
    title,
    subTitle,
    type,
    setSelected,
    selected,
    setPagination,
    filter,
    setFilter,
  } = props;

  const [selectedTemporary, setSelectedTemporary] = useState(filter);

  const handleButtonClick = (item: any) => {
    if (
      selectedTemporary[0]?.id === item?.id ||
      selectedTemporary[1]?.id === item?.id
    ) {
      setSelectedTemporary(
        selectedTemporary.filter((obj: any) => obj?.id !== item?.id),
      );
    } else {
      if (selectedTemporary) {
        setSelectedTemporary([...selectedTemporary, item]);
      } else {
        setSelectedTemporary([item]);
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
          {subTitle ? (
            <Text style={[styles.swpSubTitle]}>{subTitle}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setSelectedTemporary(data.map(x => x));
            }}>
            <Text style={[styles.selectAll]}>Pilih Semua</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.svStyle}
            contentContainerStyle={styles.contentContainerStyle}>
            {data?.map((item: any, index: number) => {
              var buttonColor = Colors.primary.light3;
              var textColor = Colors.primary.base;
              if (item !== undefined) {
                if (
                  selectedTemporary[0]?.id === item?.id ||
                  selectedTemporary[1]?.id === item?.id
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
            setFilter([]);
            setSelectedTemporary([]);
          }}
        />
        <Button
          label={'Terapkan'}
          style={styles.SoalButton}
          action={() => {
            if (selectedTemporary !== undefined) {
              setFilter(selectedTemporary);
            }
            var newArray = [];
            if (!selected?.includes(type)) {
              setSelected((oldArray: any) => [...oldArray, type]);
            } else {
              newArray.push(type);
              setSelected(newArray);
            }
            setPagination({
              limit: 10,
              page: 0,
            });
            setIsShow && setIsShow(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeUpContainerSoal: {
    backgroundColor: Colors.white,
  },
  swpTopContent: {
    padding: 16,
    paddingTop: 0,
  },
  swpTopTitle2Container: {alignItems: 'center'},
  swpTopTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    paddingBottom: 8,
    alignSelf: 'center',
  },
  swpSubTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  chips: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 4,
    alignSelf: 'flex-end',
    marginRight: 8,
    marginVertical: 16,
  },
  chipsText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontWeight: '400',
    textAlign: 'center',
  },
  selectAll: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    paddingRight: 8,
  },
  showLess: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  swpBottomContentSoal: {
    marginHorizontal: 32,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SoalButton: {
    width: '55%',
    marginHorizontal: '2%',
  },
  swipeUpTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  svStyle: {
    maxHeight: 400,
  },
  contentContainerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
});
