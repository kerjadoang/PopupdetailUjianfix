import React, {FC, useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {Button} from '@components/atoms/Button';
import {FlatList} from 'react-native-gesture-handler';

type Props = {
  type: 'Fase' | 'Status';
  plainData: any[];
  activeData: any[];
  onTerapkan: ([]) => void;
  onAturUlang: () => void;
};

const DaftarProyekSwipeUp: FC<Props> = ({
  type,
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
          <ScrollView horizontal>
            <FlatList
              data={plainData}
              columnWrapperStyle={{justifyContent: 'flex-start'}}
              numColumns={plainData.length >= 4 ? 4 : 2}
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
                      if (type === 'Status') {
                        return setFilter(
                          filter.filter(value => value !== item),
                        );
                      }

                      //reset filter
                      return setFilter(
                        filter.filter(value => value.id !== item.id),
                      );
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
          </ScrollView>
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

export default DaftarProyekSwipeUp;
