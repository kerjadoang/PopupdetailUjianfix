import React, {FC, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {Button} from '@components/atoms/Button';
import {FlatList} from 'react-native-gesture-handler';

type Props = {
  plainData: any[];
  activeData: any[];
  onTerapkan: (data: any[]) => void;
  onAturUlang: () => void;
};

const FilterStatus: FC<Props> = ({
  plainData,
  activeData,
  onTerapkan,
  onAturUlang,
}) => {
  const [filter, setFilter] = useState<any[]>(activeData);
  const isFilterActive = (value: any) => {
    const index = filter.indexOf(value);
    const status = index !== -1;
    return {
      index,
      status,
    };
  };
  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.headerSwipe}>
          <Text style={styles.text}>Kategori</Text>
          <Pressable onPress={() => setFilter(plainData)}>
            <Text style={styles.selectAll}>Pilih Semua</Text>
          </Pressable>
        </View>
        <View style={[styles.contentSwipe]}>
          <FlatList
            data={plainData}
            numColumns={2}
            renderItem={({item, index}) => {
              const isActive = isFilterActive(item);
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    //set filter
                    if (!isActive.status) {
                      return setFilter([...filter, item]);
                    }

                    //reset filter
                    return setFilter(filter.filter(value => value !== item));
                  }}
                  style={[
                    styles.chipContainer,
                    {
                      backgroundColor: isActive.status
                        ? Colors.primary.base
                        : Colors.primary.light3,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: isActive.status
                          ? Colors.white
                          : Colors.primary.base,
                      },
                    ]}>
                    {item.name || item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
        <View
          style={[
            styles.contentSwipe,
            {justifyContent: 'space-around', marginTop: 4},
          ]}>
          <Button
            label="Atur Ulang"
            action={() => {
              onAturUlang();
              setFilter([]);
            }}
            style={{width: '45%'}}
            outline
          />
          <Button
            label="Terapkan"
            action={() => onTerapkan(filter)}
            style={{width: '45%'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: Fonts.BoldPoppins,
    textAlign: 'center',
    fontSize: 20,
    color: Colors.black,
  },
  headerSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  selectAll: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.primary.base,
  },
  contentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 6,
  },
  chipText: {
    fontFamily: Fonts.RegularPoppins,
  },
});

export default FilterStatus;
