import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from '../style';
import RadioButtonOn from '@assets/svg/Radio_Button_On.svg';
import RadioButtonOff from '@assets/svg/Radio_Button_Off.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
interface IProps {
  title?: string;
  data?: any;
  setSelected?: any;
  selected: any;
  isArray?: boolean;
  index?: number;
  setShow?: any;
  withOptionAllSelect?: boolean;
}

interface Data {
  id?: number;
  name?: 'string';
  type?: 'string';
  major?: any;
}

const SwipeUpSchoolMaterials = (props: IProps) => {
  if (
    props?.withOptionAllSelect &&
    !props?.data?.some((obj: any) => obj?.name === 'Semua Bab')
  ) {
    props?.data?.unshift({id: null, name: 'Semua Bab'}); //add new obj array to first index
  }
  return (
    <View style={styles.swipeUpContainer}>
      <Text
        style={[
          styles.swipeUpTitle,
          {textAlign: props?.title === 'Pilih Tipe Materi' ? 'left' : 'center'},
        ]}>
        {props.title}
      </Text>
      {props?.data?.map((i: Data, indexy: number) => {
        var textColor = Colors.dark.neutral100;
        if (props?.selected?.id === i?.id) {
          textColor = Colors.primary.base;
        }
        return (
          <TouchableOpacity
            key={indexy}
            style={[styles.swipeUpDataContainer]}
            onPress={() => {
              if (props?.isArray) {
                props?.setSelected((prevSelected: any) => {
                  return prevSelected.map((j: any, index: number) => {
                    if (props?.index === index) {
                      return {
                        ...j,
                        ...i,
                        value: i?.name,
                        id: i?.id,
                      };
                    }
                    return j;
                  });
                });
              } else {
                props.setSelected({
                  ...props?.selected,
                  ...i,
                  value: i?.name,
                  id: i?.id,
                });
              }
              if (props?.setShow) {
                props?.setShow(false);
              }
            }}>
            <View>
              <Text
                style={[
                  styles.valueSwipeUp,
                  {
                    color: textColor,
                    fontWeight: props?.selected?.id === i?.id ? '600' : '400',
                    fontFamily:
                      props?.selected?.id === i?.id
                        ? Fonts.SemiBoldPoppins
                        : Fonts.RegularPoppins,
                  },
                ]}>
                {i?.name ?? '-'}
              </Text>
              {i?.type ? <Text style={styles.textType}>{i?.type}</Text> : null}
            </View>

            {props?.selected?.id === i?.id ? (
              <RadioButtonOn width={24} height={24} />
            ) : (
              <RadioButtonOff width={24} height={24} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SwipeUpSchoolMaterials;
