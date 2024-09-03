import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import RightBlue from '@assets/svg/ic_arrow_right_blue.svg';
import FastImage from 'react-native-fast-image';
import Robot from '@assets/svg/robot_sedih.svg';
type Props = {
  data?: any;
  navigation?: any;
  avatar?: any;
  searchQuery?: any;
  setSearchQuery?: any;
  filteredData?: any;
  setFilteredData?: any;
  mergedData?: any;
  handleSearch?: any;
};

const ListStudent = ({
  navigation,
  searchQuery,
  filteredData,
  mergedData,
}: Props) => {
  return (
    <View style={styles.containerContent}>
      <Text style={styles.textTitle}>Daftar Murid</Text>
      {searchQuery && filteredData?.length === 0 ? (
        <View style={styles.empty}>
          <Robot width={100} height={100} />
          <Text style={styles.textTitleEmpty}>Pencarian Tidak Ditemukan</Text>
          <Text style={styles.textSubEmpty}>
            Hasil pencarian “{searchQuery}” nihil. Coba masukkan kata kunci
            lainnya!
          </Text>
        </View>
      ) : (
        (searchQuery ? filteredData : mergedData)
          ?.sort((a, b) => a?.full_name.localeCompare(b?.full_name))
          .map((item, key) => (
            <Pressable
              style={[styles.listButton, styles.shadowProp]}
              key={key}
              onPress={() => navigation(item)}>
              <View style={styles.row}>
                <FastImage
                  source={
                    item?.avatar === null
                      ? require('@assets/images/empty.png')
                      : {
                          uri: item?.avatar,
                        }
                  }
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{width: '80%'}}>
                  <Text style={styles.textTitle}>{item?.full_name}</Text>
                  <Text style={styles.textSub}>-</Text>
                </View>
              </View>
              <RightBlue width={24} height={24} />
            </Pressable>
          ))
      )}
    </View>
  );
};

export {ListStudent};
