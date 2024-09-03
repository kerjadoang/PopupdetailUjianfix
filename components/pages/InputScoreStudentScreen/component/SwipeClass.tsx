import {View, Text, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';

type Props = {
  allClass?: any;
  handleFilterClass?: any;
  choosen?: any;
  showChoose?: any;
  setShowChoose?: any;
  firstClass?: any;
};

const SwipeClass = ({
  allClass,
  handleFilterClass,
  choosen,
  setShowChoose,
  showChoose,
  firstClass,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null | any>(null);
  const handleItemSelection = (item: any) => {
    if (item?.id === selectedItem?.id) {
      return;
    }
    setSelectedItem(item);
  };
  return (
    <View style={{padding: 16}}>
      <Text style={styles.textTitleModal}>Filter</Text>
      <FlatList
        data={allClass}
        style={{height: 130}}
        initialNumToRender={5}
        keyExtractor={(item, index) => index.toString()}
        maxToRenderPerBatch={5}
        renderItem={({item, index: key}: any) => {
          return (
            <View key={key}>
              <Text
                style={[
                  styles.textSub,
                  {fontFamily: 'Poppins-Bold', marginVertical: 5},
                ]}>
                {item?.name}
              </Text>
              <View style={[styles.row, {marginVertical: 5}]}>
                <FlatList
                  horizontal
                  initialNumToRender={5}
                  keyExtractor={(item, index) => index.toString()}
                  maxToRenderPerBatch={5}
                  data={item?.rombel_class_school}
                  renderItem={({item: _item, index: key}: any) => {
                    return (
                      <Pressable
                        style={
                          selectedItem
                            ? selectedItem?.id === _item?.id
                              ? styles.buttonChoosenItem
                              : styles.buttonUnChoosenItem
                            : choosen && choosen?.id === _item?.id
                            ? styles.buttonChoosenItem
                            : firstClass &&
                              !choosen &&
                              firstClass?.id === _item?.id
                            ? styles.buttonChoosenItem
                            : styles.buttonUnChoosenItem
                        }
                        onPress={() => handleItemSelection(_item)}
                        key={key}>
                        <Text
                          style={
                            selectedItem
                              ? selectedItem?.id === _item?.id
                                ? styles.textChoosenItem
                                : styles.textUnChoosenItem
                              : choosen && choosen?.id === _item?.id
                              ? styles.textChoosenItem
                              : firstClass &&
                                !choosen &&
                                firstClass?.id === _item?.id
                              ? styles.textChoosenItem
                              : styles.textUnChoosenItem
                          }>
                          {_item?.name &&
                            _item?.name
                              .replace('Kelas ', '')
                              .replace('(', '')
                              .replace(')', '')}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
              </View>
            </View>
          );
        }}
      />
      <View style={[styles.row, {alignSelf: 'center', marginTop: 10}]}>
        <Button
          label="Atur Ulang"
          background="white"
          color={Colors.primary.base}
          borderWidth={1}
          action={() => setSelectedItem(firstClass)}
          style={{width: '40%', height: 40, marginRight: 10}}
        />
        <Button
          label="Terapkan"
          style={{width: '40%', height: 40}}
          action={() => {
            setShowChoose(!showChoose);
            if (!selectedItem) {
              return;
            }
            handleFilterClass(selectedItem);
          }}
        />
      </View>
    </View>
  );
};

export {SwipeClass};
