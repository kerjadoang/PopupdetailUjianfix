import {View, Text, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Down from '@assets/svg/ic24_chevron_down_blue.svg';
import useFormTryOut from '../useFormTryOut';
import {Button} from '@components/atoms';
import Check from '@assets/svg/Checkbox_blue.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DownWhite from '@assets/svg/ic16_chevron_down_white.svg';
import Colors from '@constants/colors';
import {HistoryCard} from './HistoryCard';
import {ParamList} from 'type/screen';

const HistorySectionTab = () => {
  const {dataHistory, dataType, handleMultiple, setMultipleType, multipleType} =
    useFormTryOut();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedMultiple, setSelectedMultiple] = useState<any>([]);
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TryOutScreen'>>();

  const handleItemPress = (item: any) => {
    const itemId = item?.id;
    const itemDescription = item?.description;

    const selectedItem: any = {id: itemId, description: itemDescription};

    if (selectedMultiple.some((selected: any) => selected.id === itemId)) {
      setSelectedMultiple(
        selectedMultiple.filter((selected: any) => selected.id !== itemId),
      );
    } else {
      setSelectedMultiple([...selectedMultiple, selectedItem]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMultiple?.length === dataType?.length) {
      setSelectedMultiple([]);
    } else {
      const allIds = dataType.map((item: any) => item);
      setSelectedMultiple(allIds);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <HistoryCard
        key={index}
        item={item}
        onPressDetailHistory={() => {
          navigation.navigate('TryOutDetailHistoryScreen', {
            id: item?.tryout_id ?? item?.id,
            dataHistory: item,
          });
          return;
        }}
      />
    );
  };

  const renderDropDown = ({item, index}: any) => {
    return (
      <View key={index} style={[styles.row, {marginVertical: 5}]}>
        <Pressable
          style={[styles.row, {alignItems: 'center'}]}
          onPress={() => {
            handleItemPress(item);
          }}>
          {selectedMultiple?.some(
            (selectedItem: any) => selectedItem?.id === item?.id,
          ) ? (
            <Check width={24} height={24} />
          ) : (
            <View style={styles.checkbox} />
          )}
          <Text style={styles.textTitleNormal}>{item?.description}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.containerSection}>
      <Pressable
        style={[
          styles.rowBetween,
          styles.drop,
          {
            backgroundColor:
              multipleType?.length === 0 ||
              multipleType?.length === dataType?.length
                ? 'white'
                : Colors.primary.base,
          },
        ]}
        onPress={() => setShowFilter(!showFilter)}>
        {multipleType?.length === 0 ||
        multipleType?.length === dataType?.length ? (
          <Text
            style={
              multipleType?.length === 0 ||
              multipleType?.length === dataType?.length
                ? styles.textBlue
                : styles.textWhite
            }>
            Semua Tipe
          </Text>
        ) : (
          <Text style={styles.textWhite}>{multipleType?.length} Tipe</Text>
        )}
        {multipleType?.length === 0 ||
        multipleType?.length === dataType?.length ? (
          <Down width={16} style={{margin: 10}} />
        ) : (
          <DownWhite width={16} style={{margin: 10}} />
        )}
      </Pressable>

      <FlatList
        data={dataHistory}
        initialNumToRender={7}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) => index.toString()}
      />

      {showFilter ? (
        <View
          style={[
            styles.card,
            styles.shadowProp,
            {position: 'absolute', top: 50},
          ]}>
          <Text style={[styles.textSubTitleGrey, {fontFamily: 'Poppins-Bold'}]}>
            Filter Tipe Try Out
          </Text>
          <View style={[styles.row, {marginVertical: 5}]}>
            <Pressable
              style={[styles.row, {alignItems: 'center'}]}
              onPress={handleSelectAll}>
              {selectedMultiple?.length === dataType?.length ? (
                <Check width={24} height={24} />
              ) : (
                <View style={styles.checkbox} />
              )}
              <Text style={styles.textTitleNormal}>Pilih Semua</Text>
            </Pressable>
          </View>
          <FlatList
            renderItem={renderDropDown}
            data={dataType}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.rowBetween}>
            <Button
              label="Atur Ulang"
              style={{width: '48%'}}
              action={() => {
                setMultipleType([]);
                setSelectedMultiple([]);
              }}
            />
            <Button
              label="Terapkan"
              style={{width: '48%'}}
              action={() => {
                handleMultiple(selectedMultiple);
                setShowFilter(false);
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default HistorySectionTab;
