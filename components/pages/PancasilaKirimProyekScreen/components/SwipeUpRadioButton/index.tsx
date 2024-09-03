import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RadioButtonOn from '@assets/svg/Radio_Button_On.svg';
import RadioButtonOff from '@assets/svg/Radio_Button_Off.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
interface IProps {
  title?: string;
  data?: any;
  setSelected?: any;
  selected: any;
  isArray?: boolean;
  index?: number;
  appendCurrentDataWhenSelected?: boolean;
}

interface Data {
  id?: number;
  rombel_class_school_name?: string;
  rombel_class_school_id?: string;
  count?: number;
  name?: 'string';
  type?: 'string';
  major?: any;
}

const SwipeUpRadioButton = ({
  appendCurrentDataWhenSelected = false,
  ...props
}: IProps) => {
  return (
    <View style={styles.swipeUpContainer}>
      <Text style={[styles.swipeUpTitle]}>{props.title}</Text>
      <FlatList<Data>
        data={props?.data}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 0}} />}
        renderItem={({item: i, index: indexy}) => {
          var textColor = Colors.dark.neutral100;
          const id = i?.id || i?.rombel_class_school_id;
          if (props?.selected?.id === id) {
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
                          ...(appendCurrentDataWhenSelected && i),
                          value: i?.name || i?.rombel_class_school_name,
                          id: id,
                        };
                      }
                      return j;
                    });
                  });
                } else {
                  props.setSelected({
                    ...props?.selected,
                    ...(appendCurrentDataWhenSelected && i),
                    value: i?.name || i?.rombel_class_school_name,
                    id: id,
                  });
                }
              }}>
              <View style={{flex: 12, marginRight: 6}}>
                <Text
                  style={[
                    styles.valueSwipeUp,
                    {
                      color: textColor,
                      fontWeight: props?.selected?.id === id ? '600' : '400',
                      fontFamily:
                        props?.selected?.id === id
                          ? Fonts.SemiBoldPoppins
                          : Fonts.RegularPoppins,
                    },
                  ]}>
                  {i?.name || i?.rombel_class_school_name || '-'}
                </Text>
                {i?.type ? (
                  <Text style={styles.textType}>{i?.type}</Text>
                ) : null}
              </View>
              <View style={{flex: 1}}>
                {props?.selected?.id === id ? (
                  <RadioButtonOn width={24} height={24} />
                ) : (
                  <RadioButtonOff width={24} height={24} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* {props?.data?.map((i: Data, indexy: number) => {
        var textColor = Colors.dark.neutral100;
        const id = i?.id || i?.rombel_class_school_id;
        if (props?.selected?.id === id) {
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
                        ...(appendCurrentDataWhenSelected && i),
                        value: i?.name || i?.rombel_class_school_name,
                        id: id,
                      };
                    }
                    return j;
                  });
                });
              } else {
                props.setSelected({
                  ...props?.selected,
                  ...(appendCurrentDataWhenSelected && i),
                  value: i?.name || i?.rombel_class_school_name,
                  id: id,
                });
              }
            }}>
            <View style={{flex: 25}}>
              <Text
                style={[
                  styles.valueSwipeUp,
                  {
                    color: textColor,
                    fontWeight: props?.selected?.id === id ? '600' : '400',
                    fontFamily:
                      props?.selected?.id === id
                        ? Fonts.SemiBoldPoppins
                        : Fonts.RegularPoppins,
                  },
                ]}>
                {i?.name || i?.rombel_class_school_name || '-'}
              </Text>
              {i?.type ? <Text style={styles.textType}>{i?.type}</Text> : null}
            </View>
            <View style={{flex:1}}>
              {props?.selected?.id === id ? (
                <RadioButtonOn width={24} height={24} />
              ) : (
                <RadioButtonOff width={24} height={24} />
              )}
            </View>
          </TouchableOpacity>
        );
      })} */}
    </View>
  );
};

export default SwipeUpRadioButton;
