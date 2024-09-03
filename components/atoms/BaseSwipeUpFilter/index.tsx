import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
export * from './utils';

type Props<T = any> = {
  defaultData: BaseFilter<T>[];
  currentData: BaseFilter<T>[];
  onApplyFilter: CallBackWithParams<void, BaseFilter<T>[]>;
  onResetFilter: VoidCallBack;
  filterCondition?: CallBackWithParams<boolean, BaseFilter<T>>;
  onlyOneItem?: boolean;
};

const BaseSwipeUpFilter = <T,>({
  defaultData,
  currentData,
  onApplyFilter,
  onResetFilter,
  filterCondition,
  onlyOneItem,
}: Props<T>) => {
  const [tempData, setTempData] = useState<BaseFilter<T>[]>(currentData);

  const isActive = (item: BaseFilter<T>) => {
    return tempData?.some(currItem => {
      if (!filterCondition) {
        return currItem.id === item.id;
      }
      return filterCondition?.(item);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.filterTitle}>Filter</Text>
      </View>
      <View style={styles.mv15}>
        <FlatList
          columnWrapperStyle={styles.filterRow}
          style={{maxHeight: WINDOW_HEIGHT * 0.2}}
          numColumns={10}
          data={defaultData}
          renderItem={({item, index}) => {
            if (!item.name) {
              return <View key={index} />;
            }
            return (
              <Button
                key={index}
                action={() => {
                  // pr(tempData, item);
                  if (onlyOneItem) {
                    setTempData([item]);
                    return;
                  }
                  setTempData(prevState =>
                    prevState.pushOrRemove(item, {
                      customCondition: data => data.id === item.id,
                    }),
                  );
                }}
                label={item.name}
                textStyle={
                  isActive(item)
                    ? styles.filterTextActive
                    : styles.filterTextDeactive
                }
                style={
                  isActive(item) ? styles.filterActive : styles.filterDeactive
                }
              />
            );
          }}
        />
      </View>
      <View style={styles.rowButton}>
        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              setTempData([]);
              onResetFilter();
            }}
            label="Atur Ulang"
            background={Colors.white}
            color={Colors.primary.base}
            borderWidth={1}
            borderColor={Colors.primary.base}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              onApplyFilter(tempData);
            }}
            label="Terapkan"
          />
        </View>
      </View>
    </View>
  );
};

export default BaseSwipeUpFilter;
