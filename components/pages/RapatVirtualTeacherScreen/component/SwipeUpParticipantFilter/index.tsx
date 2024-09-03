import React, {FC, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';

type Props = {
  defaultParticipantData: RapatVirtualParticipant[];
  currentParticipantData: RapatVirtualParticipant[];
  onApplyFilter: CallBackWithParams<void, RapatVirtualParticipant[]>;
  onResetFilter: VoidCallBack;
};

const SwipeUpParticipantFilter: FC<Props> = ({
  defaultParticipantData,
  currentParticipantData,
  onApplyFilter,
}) => {
  const [tempParticipantData, setTempParticipantData] = useState<
    RapatVirtualParticipant[]
  >(currentParticipantData);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.filterTitle}>Filter</Text>
      </View>
      <View style={styles.mv15}>
        <View style={styles.filterRow}>
          <FlatList
            data={defaultParticipantData}
            // horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <Button
                  key={index}
                  action={() => {
                    setTempParticipantData(prevState =>
                      prevState.pushOrRemove(item),
                    );
                  }}
                  label={item.name}
                  textStyle={
                    tempParticipantData.some(currItem => currItem === item)
                      ? styles.filterTextActive
                      : styles.filterTextDeactive
                  }
                  style={
                    tempParticipantData.some(currItem => currItem === item)
                      ? styles.filterActive
                      : styles.filterDeactive
                  }
                />
              );
            }}
          />
        </View>
      </View>
      <View style={styles.rowButton}>
        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              setTempParticipantData([]);
              // onResetFilter();
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
              onApplyFilter(tempParticipantData);
            }}
            label="Terapkan"
          />
        </View>
      </View>
    </View>
  );
};

export default SwipeUpParticipantFilter;
