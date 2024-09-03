/* eslint-disable react-hooks/exhaustive-deps */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../../style';

type _IFilterClass = {
  data: any[];
  handleSubmit: any;
  handleReset: any;
  dataChoosed: _IClass;
};

type _IClass = {id: number; name: string; number_of_students: number};

const FilterClass = ({
  data,
  handleSubmit,
  handleReset,
  dataChoosed,
}: _IFilterClass) => {
  const [classRes, setClassRes] = useState<_IClass>();

  useEffect(() => {
    setClassRes(dataChoosed);
  }, []);

  return (
    <View style={styles.FilterClassContainer}>
      <View style={styles.FilterClassTitleContainer}>
        <Text allowFontScaling={false} style={styles.FilterClassTitle}>
          Filter
        </Text>
      </View>
      <View style={styles.mt15}>
        <Text allowFontScaling={false} style={styles.FilterClassClassTitle}>
          Kelas
        </Text>
        <View style={styles.FilterClassNameContainer}>
          {data?.map((ie: _IClass) => {
            return (
              <Pressable
                key={ie?.id}
                onPress={() => {
                  setClassRes({
                    id: ie?.id,
                    name: ie?.name,
                    number_of_students: ie.number_of_students,
                  });
                }}
                style={
                  ie?.id === classRes?.id
                    ? styles.FilterClassNameButtonChoosed
                    : styles.FilterClassNameButton
                }>
                <Text
                  allowFontScaling={false}
                  style={
                    ie?.id === classRes?.id
                      ? styles.FilterClassTitleChoosed
                      : styles.FilterClassTitleNotChoosed
                  }>
                  {ie.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.FilterClassBottomContainer}>
        <View style={styles.FilterClassBottomInnerContainer}>
          <Button
            label="Atur Ulang"
            background={Colors.white}
            color={Colors.dark.neutral50}
            borderWidth={1}
            action={handleReset}
            borderColor={Colors.dark.neutral50}
          />
        </View>
        <View style={styles.FilterClassBottomInnerContainer}>
          <Button
            action={() => {
              handleSubmit(classRes);
            }}
            label="Terapkan"
          />
        </View>
      </View>
    </View>
  );
};

export default FilterClass;
