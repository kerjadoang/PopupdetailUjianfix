/* eslint-disable react-hooks/exhaustive-deps */
import {SwipeUp, SwipeUpProps, CheckboxInput, Button} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';
import {IListChapterBySubjectResponse} from '@services/global/type';

type InputChapterProps = {
  inputs?: IListChapterBySubjectResponse;
  selectedVal?: any;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: IBaseChapter[];
} & SwipeUpProps;

const InputChapter: React.FC<InputChapterProps> = props => {
  const [selectedChapter, setSelectedChapter] = useState<IBaseChapter[]>();

  useEffect(() => {
    if (props.visible) {
      setSelectedChapter(props.selectedOption);
    }
  }, [props.visible]);

  const onSelect = (val: IBaseRombelUser) => {
    const isExist = selectedChapter?.some(user => user.id === val.id);
    if (isExist) {
      const filterUser = selectedChapter?.filter(user => user.id !== val.id);
      setSelectedChapter(filterUser);
    } else {
      setSelectedChapter([...(selectedChapter ?? []), val]);
    }
  };

  const renderItem = ({item}: {item: IBaseChapter}) => {
    return (
      <View style={{height: 32, width: '100%', gap: 12}} key={`${item.id}`}>
        <CheckboxInput
          label={item.name}
          labelStyle={{flex: 1}}
          containerStyle={{gap: 10}}
          onPress={() => onSelect(item)}
          selected={selectedChapter?.some(selected => selected.id === item.id)}
        />
      </View>
    );
  };

  return (
    <SwipeUp {...props}>
      <View
        style={{
          paddingHorizontal: 16,
          padding: 16,
          // paddingBottom: 8,
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Bab
        </Text>
        <FlatList
          data={props.inputs?.data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16, paddingTop: 12}}
          style={{maxHeight: 400}}
        />
        <View
          style={{
            paddingTop: 16,
            backgroundColor: Colors.white,
          }}>
          <Button
            label="Simpan"
            action={() => props.onSelect?.('chapters', selectedChapter)}
            isDisabled={
              (selectedChapter && selectedChapter.length < 1) ||
              !props.inputs?.data
            }
          />
        </View>
      </View>
    </SwipeUp>
  );
};

export default InputChapter;
