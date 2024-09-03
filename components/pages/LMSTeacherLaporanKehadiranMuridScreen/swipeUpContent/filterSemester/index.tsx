/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

const FilterSemester = ({
  filterData,
  handleReset,
  handleSubmit,
}: {
  filterData: string;
  handleReset: any;
  handleSubmit: any;
}) => {
  const [dataChoosed, setDataChoosed] = useState<string>(filterData);
  return (
    <View style={{marginTop: '5%', paddingHorizontal: '5%'}}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            lineHeight: 28,
            color: Colors.dark.neutral100,
          }}>
          Filter
        </Text>
      </View>
      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            lineHeight: 22,
            color: Colors.dark.neutral60,
          }}>
          Semester
        </Text>
        <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Pressable
            onPress={() => {
              setDataChoosed('Genap');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 7,
              borderRadius: 20,
              backgroundColor:
                dataChoosed === 'Genap'
                  ? Colors.primary?.base
                  : Colors.primary.light2,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                color:
                  dataChoosed === 'Genap' ? Colors.white : Colors.primary.base,
              }}>
              Genap
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDataChoosed('Ganjil');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 7,
              borderRadius: 20,
              backgroundColor:
                dataChoosed === 'Ganjil'
                  ? Colors.primary?.base
                  : Colors.primary.light2,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                color:
                  dataChoosed === 'Ganjil' ? Colors.white : Colors.primary.base,
              }}>
              Ganjil
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button
            action={() => handleReset()}
            label="Atur Ulang"
            background={Colors.white}
            color={Colors.dark.neutral50}
            borderWidth={1}
            borderColor={Colors.dark.neutral50}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button action={() => handleSubmit(dataChoosed)} label="Terapkan" />
        </View>
      </View>
    </View>
  );
};

export default FilterSemester;
