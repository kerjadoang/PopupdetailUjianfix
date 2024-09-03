/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

const FilterSort = ({
  filterData,
  handleSubmit,
}: {
  filterData: string;
  handleSubmit: any;
}) => {
  const [filterChoosed, setFilterChoosed] = useState<string>(filterData);
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
          Urutkan
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
          Berdasarkan
        </Text>
        <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Pressable
            onPress={() => {
              setFilterChoosed('name');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 7,
              borderRadius: 20,
              backgroundColor:
                filterChoosed === 'name'
                  ? Colors.primary.base
                  : Colors.primary.light2,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                color:
                  filterChoosed === 'name' ? Colors.white : Colors.primary.base,
              }}>
              Nama
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setFilterChoosed('most_attend');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 7,
              borderRadius: 20,
              backgroundColor:
                filterChoosed === 'most_attend'
                  ? Colors.primary.base
                  : Colors.primary.light2,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                color:
                  filterChoosed === 'most_attend'
                    ? Colors.white
                    : Colors.primary.base,
              }}>
              Kehadiran Terbanyak
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setFilterChoosed('most_absent');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 7,
              borderRadius: 20,
              backgroundColor:
                filterChoosed === 'most_absent'
                  ? Colors.primary.base
                  : Colors.primary.light2,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 22,
                color:
                  filterChoosed === 'most_absent'
                    ? Colors.white
                    : Colors.primary.base,
              }}>
              Kehadiran Terendah
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button
            action={() => {
              handleSubmit(filterChoosed);
            }}
            label="Terapkan"
          />
        </View>
      </View>
    </View>
  );
};

export default FilterSort;
