import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {FlatList} from 'react-native-gesture-handler';

type Props = {
  data: ICurriculum[];
  activeData: ICurriculum;
  onPressActiveCuriculum: CallBackWithParams<void, ICurriculum>;
};

const SwipeupIkmActiveCuriculum: FC<Props> = ({
  data,
  activeData,
  onPressActiveCuriculum,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '600',
            color: Colors.dark.neutral100,
          }}>
          Pilih Kurikulum
        </Text>
      </View>
      <View style={{padding: 16}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => onPressActiveCuriculum(item)}
              key={index}
              style={{
                marginVertical: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.dark.neutral100}}>{item?.name}</Text>
              <View
                style={{
                  borderRadius: 100,
                  width: 24,
                  height: 24,
                  borderColor:
                    item.id === activeData.id
                      ? Colors.primary.base
                      : Colors.dark.neutral60,
                  borderWidth: item.id === activeData.id ? 8 : 1,
                }}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default SwipeupIkmActiveCuriculum;
