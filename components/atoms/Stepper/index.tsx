import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Colors from '@constants/colors';
import {PoppinsText} from '../Poppins';

type Props = {
  labels: string[];
  active: number;
  bgColor?: string;
};

const Stepper = ({labels, active}: Props) => {
  return (
    <FlatList
      initialScrollIndex={active - 1}
      style={{maxHeight: 80}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center', paddingVertical: 16}}
      horizontal
      data={labels}
      renderItem={({item: val, index: key}) => {
        return (
          <View key={key} style={styles.stepperItemContainer}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              {++key !== active && active > key ? (
                <IconButton
                  icon="check"
                  iconColor={Colors.white}
                  size={16}
                  style={styles.stepperCircleDone}
                />
              ) : (
                <View
                  style={[
                    styles.stepperCircleNotDone,
                    active < key && {backgroundColor: Colors.dark.neutral50},
                  ]}>
                  <PoppinsText style={{color: Colors.white}}>{key}</PoppinsText>
                </View>
              )}

              <PoppinsText
                style={[
                  styles.stepper_text,
                  active >= key && {
                    color: Colors.primary.base,
                    fontWeight: 'bold',
                  },
                ]}>
                {val}
              </PoppinsText>

              {key !== labels.length ? (
                <View
                  style={[
                    styles.stepper_line,
                    {
                      width: 40,
                    },
                    active <= key && {backgroundColor: Colors.dark.neutral50},
                    active >= key && {backgroundColor: Colors.primary.base},
                  ]}
                />
              ) : null}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  stepperItemContainer: {
    gap: 10,
    marginRight: 16,
  },

  stepper_text: {
    color: Colors.dark.neutral50,
    fontSize: 16,
  },
  stepper_line: {
    height: 4,
    alignSelf: 'center',
    backgroundColor: Colors.primary.base,
  },
  stepperCircleDone: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primary.base,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 0,
  },
  stepperCircleNotDone: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primary.base,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {Stepper};
