import React, {FC, useCallback} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MainView, MainText} from '@components/atoms';
import {listClassByGrade} from '@constants/listclass';
import Colors from '@constants/colors';
import {mappingClass} from './utils';

type Props = {
  listClass?: IClass[];
  selectedClass: number;
  onClassSelected: (id: number) => void;
  // listGradeToShow?: IClassName[];
  // start from 1 to 12
  hideClass?: number[];
};

const ClassDetailSwipeUp: FC<Props> = ({
  onClassSelected,
  selectedClass,
  hideClass,
  // listGradeToShow = ['SD', 'SMP', 'SMA'],
  listClass,
}) => {
  const renderButtonClass = (data: any) => {
    return (
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          gap: 24,
          marginBottom: 16,
        }}
        data={data}
        renderItem={(items: any) => {
          items = items?.item;
          return (
            <MainView
              key={items?.id}
              flex={1}
              height={40}
              justifyContent="center"
              backgroundColor={
                selectedClass === items?.id
                  ? Colors.primary.light2
                  : Colors.white
              }
              borderWidth={selectedClass === items?.id ? 3 : 0.5}
              borderColor={
                selectedClass === items?.id
                  ? Colors.primary.base
                  : Colors.dark.neutral40
              }
              borderRadius={20}>
              <TouchableOpacity
                onPress={() => {
                  return onClassSelected?.(items.id);
                  // setSelectedClass(items?.id);
                  // setShowSelectClass(false);
                }}>
                <MainText
                  fontWeight="600"
                  textAlign="center"
                  fontSize={16}
                  color={Colors.dark.neutral80}
                  lineHeight={24}>
                  {items?.id}
                </MainText>
              </TouchableOpacity>
            </MainView>
          );
        }}
      />
    );
  };

  const mapToHideClass = useCallback((data: typeof listClassByGrade.SD) => {
    if (!hideClass) {
      return data;
    }
    return data.filter(item => !hideClass.includes(item.id));
  }, []);

  const currentClass = mappingClass(listClass || []);

  return (
    <View style={styles.container}>
      <MainView paddingVertical={24} paddingHorizontal={16}>
        {/* SD */}
        {currentClass.SD && (
          <MainView>
            <MainText
              marginBottom={8}
              fontSize={14}
              color={Colors.dark.neutral100}>
              SD
            </MainText>
            {renderButtonClass(mapToHideClass(currentClass.SD))}
          </MainView>
        )}

        {/* SMP */}
        {currentClass.SMP && (
          <MainView>
            <MainText
              marginBottom={8}
              fontSize={14}
              color={Colors.dark.neutral100}>
              SMP
            </MainText>
            {renderButtonClass(mapToHideClass(currentClass.SMP))}
          </MainView>
        )}

        {/* SMA */}
        {currentClass.SMA && (
          <MainView>
            <MainText
              marginBottom={8}
              fontSize={14}
              color={Colors.dark.neutral100}>
              SMA
            </MainText>
            {renderButtonClass(mapToHideClass(currentClass.SMA))}
          </MainView>
        )}
      </MainView>
    </View>
  );
};

export default ClassDetailSwipeUp;
