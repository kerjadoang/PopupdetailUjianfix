import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import SearchInput from './components/SearchInput';
import Colors from '@constants/colors';
import useDiagnoticSearch from './useDiagnoticSearch';
import RobotIcon from '@assets/svg/robot_empty_search_base.svg';
import RobotIconSearch from '@assets/svg/robot_empty_search.svg';
import {UniversityItem} from './components/UniversityItem';
import {gaussianRandom} from '@constants/functional';

const DiagnoticSearchScreen = () => {
  const {
    navigation,
    query,
    setQuery,
    dataResult,
    _handleNavigateMajor,
    _handleNavigateUniversity,
    _onEndReached,
    isSearchJurusan,
  } = useDiagnoticSearch();

  const _renderEmpty = () => {
    if (isSearchJurusan) {
      return (
        <View style={styles.emptyUniversityContainer}>
          <RobotIconSearch width={100} height={100} />
          <Text style={styles.emptyTitle}>Tips Pencarian</Text>
          <Text style={styles.emptyLabel}>
            Tulis kata kunci untuk mencari materi atau soal di pelajaran.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.emptyUniversityContainer}>
          <RobotIcon width={100} height={100} />
          <Text style={styles.emptyText}>
            Tulis kata kunci untuk mencari Universitas
          </Text>
        </View>
      );
    }
  };

  const parts = (text: string) => {
    return text?.split('');
  };

  const renderUnivMajor = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index + gaussianRandom()}
        onPress={() => {
          _handleNavigateMajor(item);
        }}>
        <Text style={[styles.resultText]}>
          {parts(item?.name)?.map((part: string, index: number) =>
            query?.toLowerCase()?.split('')?.includes(part?.toLowerCase()) ? (
              <Text
                key={index + gaussianRandom()}
                style={[styles.resultText, styles.resultTextSelected]}>
                {part}
              </Text>
            ) : (
              <Text key={index + gaussianRandom()} style={[styles.resultText]}>
                {part}
              </Text>
            ),
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderUniv = (item: any, index: number) => {
    return (
      <UniversityItem
        key={index + gaussianRandom()}
        data={item}
        action={() => {
          _handleNavigateUniversity(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput
        query={query}
        onChangeText={val => {
          setQuery(val);
        }}
        placeholder={isSearchJurusan ? 'Cari Jurusan' : 'Cari Universitas'}
        cancelable
        onPressCancel={() => {
          navigation.goBack();
        }}
        onClear={() => {
          setQuery('');
        }}
        inputTextStyle={styles.inputTextStyle}
        placeholderTextColor={Colors.dark.neutral50}
      />
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Pilihan {isSearchJurusan ? 'Jurusan' : 'Universitas'}
        </Text>
        <FlatList
          data={dataResult}
          onEndReached={_onEndReached}
          ListEmptyComponent={_renderEmpty}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            if (isSearchJurusan) {
              return renderUnivMajor(item, index);
            }
            return renderUniv(item, index);
          }}
        />
      </View>
    </View>
  );
};

export {DiagnoticSearchScreen};
