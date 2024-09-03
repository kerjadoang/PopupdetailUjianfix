/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useCallback} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import styles from '../style';
import RadioButtonOn from '@assets/svg/Radio_Button_On.svg';
import RadioButtonOff from '@assets/svg/Radio_Button_Off.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button, DateTimePickerForm} from '@components/atoms';
import dayjs from 'dayjs';

type Props = {
  title: string;
  options?: string[];
  type: 'CURRICULUM' | 'CLASS' | 'SUBJECTS' | 'CHAPTER' | 'DATE';
  selectedItem: any;
  onPress?: () => void;
  setSelectedItem: (value: any) => void;
};

const SwipeUpContent: FC<Props> = ({
  title,
  options,
  type,
  selectedItem,
  onPress,
  setSelectedItem,
}) => {
  const __objectMapping = useCallback(
    (obj: any) => {
      switch (type) {
        case 'CURRICULUM':
          return [obj?.id, obj?.name];
        case 'CLASS':
          return [obj?.rombel_class_school?.id, obj?.rombel_class_school?.name];
        case 'SUBJECTS':
        case 'CHAPTER':
          return [obj?.id, obj?.name];
        default:
          break;
      }
    },
    [type],
  );

  return (
    <View style={styles.swipeUpContainer}>
      <Text style={styles.swipeUpTitle}>{title}</Text>

      {type === 'DATE' ? (
        <>
          <View style={{paddingHorizontal: 16, marginBottom: 24}}>
            <DateTimePickerForm
              selected={selectedItem}
              onChange={(data: any) => {
                // console.log('+======================+');
                const resDate = dayjs(data.fullDate)
                  .set('hour', data.hour)
                  .set('minute', data.minute);
                const mappedDate = {
                  ...data,
                  fullDate: resDate.format(),
                };
                setSelectedItem(mappedDate);
                // console.log('+======================+');
              }}
            />
          </View>

          <Button label={'Simpan'} action={onPress} />
        </>
      ) : (
        <ScrollView>
          {options?.length === 0 ? (
            <Text style={styles.valueSwipeUp}>Tidak ada data</Text>
          ) : (
            options?.map((value: any, index: number) => {
              const [key, name]: any = __objectMapping(value);
              const isSelectedItem = selectedItem?.key === key;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.swipeUpDataContainer}
                  onPress={() => setSelectedItem({key, name})}>
                  <Text
                    style={[
                      styles.valueSwipeUp,
                      isSelectedItem && {
                        fontFamily: Fonts.SemiBoldPoppins,
                        fontWeight: '600',
                        color: Colors.primary.base,
                      },
                    ]}>
                    {name}
                  </Text>

                  {isSelectedItem ? (
                    <RadioButtonOn width={24} height={24} />
                  ) : (
                    <RadioButtonOff width={24} height={24} />
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default memo(SwipeUpContent);
